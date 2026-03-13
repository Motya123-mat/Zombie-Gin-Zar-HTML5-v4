(function() {
    'use strict';
    
    const SALT = 'GinZarSalt2024Secure';
    const SAVE_INTERVAL = 2000;
    const STORAGE_KEY = 'zgz_save_v2';
    const GIFT_DURATION = 86400000;
    const MAX_MONEY = 999999999;
    
    const DEFAULT_PLAYER = {
        name: 'Gin Zar',
        avatar: '🧟',
        money: 1000,
        rainbowMoney: 0,
        weapons: [{ name: 'Нож кухонный', durability: -1 }],
        units: [],
        zombieKills: {
            'Зомби-страх': 0,
            'Зомби-силач': 0,
            'Зомби-хакер': 0,
            'Зомби-невидимка': 0,
            'Зомби-прыгун': 0,
            'Зомби-скелет': 0,
            'Big Zombie': 0
        },
        maxWave: 0,
        usedPromos: [],
        promoBlockDonate: false,
        giftReceived: false,
        giftExpire: 0,
        lastSave: Date.now()
    };
    
    let storage = (function() {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('test_key', 'test');
                localStorage.removeItem('test_key');
                return localStorage;
            }
        } catch (e) {}
        
        const memory = {};
        return {
            getItem: function(key) { return memory[key] || null; },
            setItem: function(key, val) { memory[key] = String(val); },
            removeItem: function(key) { delete memory[key]; }
        };
    })();
        let _player = JSON.parse(JSON.stringify(DEFAULT_PLAYER));
    
    function _hash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash + char) | 0;
        }
        return Math.abs(hash).toString(16);
    }
    
    function _generateChecksum(data) {
        const str = JSON.stringify(data);
        return _hash(str + SALT + Date.now());
    }
    
    function _save() {
        try {
            _player.lastSave = Date.now();
            
            const dataObj = {
                player: _player,
                version: 2,
                checksum: _generateChecksum(_player)
            };
            
            const dataStr = JSON.stringify(dataObj);
            const encoded = btoa(unescape(encodeURIComponent(dataStr)));
            storage.setItem(STORAGE_KEY, encoded);
            return true;
        } catch (e) {
            console.error('Save error:', e);
            return false;
        }
    }
    
    function _load() {
        try {
            const encoded = storage.getItem(STORAGE_KEY);
            if (!encoded) return false;
            
            const decoded = decodeURIComponent(escape(atob(encoded)));
            const container = JSON.parse(decoded);
            
            if (!container.version || container.version < 1) return false;
            if (!container.player) return false;
            
            const loadedPlayer = container.player;
            
            _player = { ...DEFAULT_PLAYER };            
            if (typeof loadedPlayer.name === 'string') {
                _player.name = loadedPlayer.name.trim().substring(0, 20);
            }
            
            if (typeof loadedPlayer.avatar === 'string') {
                _player.avatar = loadedPlayer.avatar;
            }
            
            if (typeof loadedPlayer.money === 'number' && loadedPlayer.money >= 0) {
                _player.money = Math.min(loadedPlayer.money, MAX_MONEY);
            }
            
            if (typeof loadedPlayer.rainbowMoney === 'number' && loadedPlayer.rainbowMoney >= 0) {
                _player.rainbowMoney = Math.min(loadedPlayer.rainbowMoney, MAX_MONEY);
            }
            
            if (Array.isArray(loadedPlayer.weapons)) {
                _player.weapons = loadedPlayer.weapons
                    .filter(function(w) { return w && w.name; })
                    .map(function(w) {
                        return {
                            name: String(w.name),
                            durability: typeof w.durability === 'number' ? w.durability : -1
                        };
                    });
                
                if (!_player.weapons.some(function(w) { return w.name === 'Нож кухонный'; })) {
                    _player.weapons.push({ name: 'Нож кухонный', durability: -1 });
                }
            }
            
            if (Array.isArray(loadedPlayer.units)) {
                _player.units = loadedPlayer.units.filter(function(u) { return typeof u === 'string'; });
            }
            
            if (loadedPlayer.zombieKills && typeof loadedPlayer.zombieKills === 'object') {
                Object.keys(DEFAULT_PLAYER.zombieKills).forEach(function(key) {
                    if (typeof loadedPlayer.zombieKills[key] === 'number') {
                        _player.zombieKills[key] = Math.max(0, loadedPlayer.zombieKills[key]);
                    }
                });
            }
            
            if (typeof loadedPlayer.maxWave === 'number' && loadedPlayer.maxWave >= 0) {
                _player.maxWave = loadedPlayer.maxWave;
            }
            
            if (Array.isArray(loadedPlayer.usedPromos)) {
                _player.usedPromos = loadedPlayer.usedPromos.filter(function(p) { return typeof p === 'string'; });            }
            
            _player.promoBlockDonate = !!loadedPlayer.promoBlockDonate;
            _player.giftReceived = !!loadedPlayer.giftReceived;
            _player.giftExpire = typeof loadedPlayer.giftExpire === 'number' ? loadedPlayer.giftExpire : 0;
            
            if (_player.giftReceived && _player.giftExpire < Date.now()) {
                _player.weapons = _player.weapons.filter(function(w) { return w.name !== 'Конфетный меч'; });
                _player.giftReceived = false;
                _player.giftExpire = 0;
            } else if (_player.giftReceived && _player.giftExpire >= Date.now()) {
                if (!_player.weapons.some(function(w) { return w.name === 'Конфетный меч'; })) {
                    _player.weapons.push({ name: 'Конфетный меч', durability: -1 });
                }
            }
            
            _save();
            return true;
        } catch (e) {
            console.error('Load error:', e);
            return false;
        }
    }
    
    if (!_load()) {
        _player = JSON.parse(JSON.stringify(DEFAULT_PLAYER));
        _save();
    }
    
    let saveTimer = setInterval(_save, SAVE_INTERVAL);
    
    window.addEventListener('beforeunload', function() {
        clearInterval(saveTimer);
        _save();
    });
    
    window.addEventListener('blur', function() {
        _save();
    });
    
    const Game = {
        getMoney: function() { return _player.money; },
        getRainbowMoney: function() { return _player.rainbowMoney; },
        getWeapons: function() { return _player.weapons.map(function(w) { return { ...w }; }); },
        getWeaponNames: function() { return _player.weapons.map(function(w) { return w.name; }); },
        hasWeapon: function(name) { return _player.weapons.some(function(w) { return w.name === name; }); },
        getWeapon: function(name) {
            const w = _player.weapons.find(function(weapon) { return weapon.name === name; });
            return w ? { ...w } : null;
        },        getUnits: function() { return _player.units.slice(); },
        hasUnit: function(name) { return _player.units.includes(name); },
        getName: function() { return _player.name; },
        getAvatar: function() { return _player.avatar; },
        getMaxWave: function() { return _player.maxWave; },
        getUsedPromos: function() { return [..._player.usedPromos]; },
        isPromoUsed: function(code) { return _player.usedPromos.includes(code); },
        isDonateBlocked: function() { return _player.promoBlockDonate; },
        isGiftActive: function() { return _player.giftReceived && _player.giftExpire > Date.now(); },
        getGiftTimeLeft: function() { return _player.giftExpire - Date.now(); },
        
        addMoney: function(amount) {
            if (typeof amount === 'number' && amount > 0) {
                _player.money = Math.min(_player.money + amount, MAX_MONEY);
                _save();
                return true;
            }
            return false;
        },
        
        deductMoney: function(amount) {
            if (typeof amount === 'number' && amount > 0 && _player.money >= amount) {
                _player.money -= amount;
                _save();
                return true;
            }
            return false;
        },
        
        addRainbowMoney: function(amount) {
            if (typeof amount === 'number' && amount > 0) {
                _player.rainbowMoney = Math.min(_player.rainbowMoney + amount, MAX_MONEY);
                _save();
                return true;
            }
            return false;
        },
        
        deductRainbowMoney: function(amount) {
            if (typeof amount === 'number' && amount > 0 && 
                _player.rainbowMoney >= amount && !_player.promoBlockDonate) {
                _player.rainbowMoney -= amount;
                _save();
                return true;
            }
            return false;
        },
        
        setMoney: function(amount) {
            if (typeof amount === 'number' && amount >= 0) {                _player.money = Math.min(amount, MAX_MONEY);
                _save();
                return true;
            }
            return false;
        },
        
        setRainbowMoney: function(amount) {
            if (typeof amount === 'number' && amount >= 0) {
                _player.rainbowMoney = Math.min(amount, MAX_MONEY);
                _save();
                return true;
            }
            return false;
        },
        
        addWeapon: function(weaponObj) {
            if (!weaponObj || !weaponObj.name) return false;
            if (_player.weapons.some(function(w) { return w.name === weaponObj.name; })) return false;
            _player.weapons.push({ 
                name: String(weaponObj.name), 
                durability: typeof weaponObj.durability === 'number' ? weaponObj.durability : -1 
            });
            _save();
            return true;
        },
        
        updateWeaponDurability: function(name, newDur) {
            const weapon = _player.weapons.find(function(w) { return w.name === name; });
            if (weapon) {
                weapon.durability = typeof newDur === 'number' ? newDur : -1;
                _save();
                return true;
            }
            return false;
        },
        
        removeWeapon: function(name) {
            const index = _player.weapons.findIndex(function(w) { return w.name === name; });
            if (index !== -1) {
                _player.weapons.splice(index, 1);
                _save();
                return true;
            }
            return false;
        },
        
        addUnit: function(unitName) {
            if (!_player.units.includes(unitName)) {
                _player.units.push(String(unitName));                _save();
                return true;
            }
            return false;
        },
        
        incrementZombieKill: function(zombieName) {
            if (_player.zombieKills.hasOwnProperty(zombieName)) {
                _player.zombieKills[zombieName] += 1;
                _save();
                return true;
            }
            return false;
        },
        
        setMaxWave: function(wave) {
            if (typeof wave === 'number' && wave > _player.maxWave) {
                _player.maxWave = wave;
                _save();
                return true;
            }
            return false;
        },
        
        addUsedPromo: function(code) {
            if (!_player.usedPromos.includes(code)) {
                _player.usedPromos.push(String(code));
                _save();
                return true;
            }
            return false;
        },
        
        setDonateBlock: function(block) {
            _player.promoBlockDonate = !!block;
            _save();
        },
        
        setName: function(newName) {
            if (typeof newName === 'string' && newName.trim().length > 0) {
                _player.name = newName.trim().substring(0, 20);
                _save();
                return true;
            }
            return false;
        },
        
        setAvatar: function(avatar) {
            if (typeof avatar === 'string') {
                _player.avatar = avatar;                _save();
                return true;
            }
            return false;
        },
        
        claimGift: function() {
            if (!_player.giftReceived) {
                _player.giftReceived = true;
                _player.giftExpire = Date.now() + GIFT_DURATION;
                if (!_player.weapons.some(function(w) { return w.name === 'Конфетный меч'; })) {
                    _player.weapons.push({ name: 'Конфетный меч', durability: -1 });
                }
                _save();
                return true;
            }
            return false;
        },
        
        reset: function() {
            _player = JSON.parse(JSON.stringify(DEFAULT_PLAYER));
            _save();
        },
        
        getSaveData: function() {
            return { ..._player };
        },
        
        forceSave: _save,
        forceLoad: _load
    };
    
    Object.freeze(Game);
    window.Game = Game;
    
    setInterval(function() {
        if (window.Game !== Game) {
            window.Game = Game;
        }
    }, 1000);
    
    if (!_player.giftReceived) {
        Game.claimGift();
    }
    
    console.log('✅ Security module loaded');
})();