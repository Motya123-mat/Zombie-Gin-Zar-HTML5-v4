(function() {
    'use strict';
    
    if (typeof Game === 'undefined') {
        alert('Ошибка загрузки модуля безопасности. Перезагрузите страницу.');
        return;
    }

    const WEAPONS = Object.freeze([
        { name: 'Нож кухонный', priceZombie: 0, priceRainbow: 0, damage: 10, maxDurability: -1, limited: false, cooldown: 1000 },
        { name: 'Мачете', priceZombie: 300, priceRainbow: 0, damage: 50, maxDurability: 100, limited: false, cooldown: 3000 },
        { name: 'Топор', priceZombie: 1000, priceRainbow: 0, damage: 100, maxDurability: 150, limited: false, cooldown: 2000 },
        { name: 'Пистолет глок', priceZombie: 5000, priceRainbow: 0, damage: 500, maxDurability: 200, limited: false, cooldown: 2000 },
        { name: 'Пистолет дигл', priceZombie: 8000, priceRainbow: 0, damage: 600, maxDurability: 250, limited: false, cooldown: 3000 },
        { name: 'Автомат Калашникова', priceZombie: 16000, priceRainbow: 0, damage: 900, maxDurability: 300, limited: false, cooldown: 2000 },
        { name: 'Сюрикены', priceZombie: 30000, priceRainbow: 0, damage: 1300, maxDurability: 350, limited: false, cooldown: 1000 },
        { name: 'Дробовик', priceZombie: 50000, priceRainbow: 0, damage: 3000, maxDurability: 200, limited: false, cooldown: 2000 },
        { name: 'Пулемёт', priceZombie: 80000, priceRainbow: 0, damage: 5000, maxDurability: 400, limited: false, cooldown: 2000 },
        { name: 'РПГ', priceZombie: 1200000, priceRainbow: 0, damage: 20000, maxDurability: 500, limited: false, cooldown: 3000 },
        { name: 'Миниган', priceZombie: 1650000, priceRainbow: 0, damage: 25000, maxDurability: 12000, limited: false, cooldown: 2000 },
        { name: 'Невидимые сюрикены', priceZombie: 1850000, priceRainbow: 0, damage: 28000, maxDurability: 15500, limited: false, cooldown: 2000 },
        { name: 'Дубина', priceZombie: 1200, priceRainbow: 0, damage: 450, maxDurability: 180, limited: false, cooldown: 2000 },
        { name: 'Копьё', priceZombie: 2500, priceRainbow: 0, damage: 650, maxDurability: 200, limited: false, cooldown: 3000 },
        { name: 'Бумеранг', priceZombie: 1000, priceRainbow: 0, damage: 350, maxDurability: 100, limited: false, cooldown: 5000 },
        { name: 'Лук', priceZombie: 500, priceRainbow: 0, damage: 150, maxDurability: 95, limited: false, cooldown: 1000 },
        { name: 'Меч', priceZombie: 850, priceRainbow: 0, damage: 200, maxDurability: 125, limited: false, cooldown: 2000 },
        { name: 'Кинжал', priceZombie: 2000, priceRainbow: 0, damage: 1200, maxDurability: 300, limited: false, cooldown: 3000 },
        { name: 'Булава', priceZombie: 950, priceRainbow: 0, damage: 450, maxDurability: 150, limited: false, cooldown: 2000 },
        { name: 'Серп', priceZombie: 1850, priceRainbow: 0, damage: 750, maxDurability: 165, limited: false, cooldown: 3000 },
        { name: 'Радужный дробовик', priceZombie: 0, priceRainbow: 100, damage: 35000, maxDurability: 25000, limited: true, cooldown: 2000 },
        { name: 'Драконий меч', priceZombie: 0, priceRainbow: 150, damage: 25000, maxDurability: 30000, limited: true, cooldown: 3000 },
        { name: 'Меч молнии', priceZombie: 0, priceRainbow: 185, damage: 100000, maxDurability: 65000, limited: true, cooldown: 3000 },
        { name: 'Смертельный цветок', priceZombie: 0, priceRainbow: 0, damage: 2500, maxDurability: 8888, limited: false, cooldown: 2000 },
        { name: 'Конфетный меч', priceZombie: 0, priceRainbow: 0, damage: 161616, maxDurability: -1, limited: false, cooldown: 2000 }
    ]);

    const ZOMBIES = Object.freeze([
        { name: 'Зомби-страх', hp: 100, damage: 30, reward: 10 },
        { name: 'Зомби-силач', hp: 500, damage: 100, reward: 30 },
        { name: 'Зомби-хакер', hp: 1000, damage: 300, reward: 65 },
        { name: 'Зомби-невидимка', hp: 5000, damage: 1000, reward: 100 },
        { name: 'Зомби-прыгун', hp: 8000, damage: 1200, reward: 500 },
        { name: 'Зомби-скелет', hp: 10000, damage: 1800, reward: 850 },
        { name: 'Big Zombie', hp: 100000, damage: 5000, reward: 1000 }
    ]);

    const UNITS = Object.freeze([
        { name: 'Инженер', priceZombie: 100000, priceRainbow: 0, description: 'Чинит оружие раз в минуту' },
        { name: 'Саня механик', priceZombie: 0, priceRainbow: 100, description: 'Чинит оружие раз в 30 сек и наносит 1000 урона' }
    ]);
    const PROMO_CODES = Object.freeze({
        'KWLX927': { type: 'money', value: 5000 },
        'LSKBAOW': { type: 'money', value: 11111 },
        'MAGXWZ': { type: 'money', value: 30000 },
        'XGWWDK': { type: 'money', value: 88888 },
        'KQVDEW': { type: 'weapon', value: 'Пулемёт' },
        'KWHDBN': { type: 'weapon', value: 'Дробовик' },
        'KEBWL826': { type: 'weapon', value: 'Радужный дробовик' },
        'KEYCB836': { type: 'rainbow', value: 100 },
        'JDG82HSJ': { type: 'rainbow', value: 500 },
        'KWUXHEV': { type: 'special', password: 'KSN826' }
    });

    var battleState = {
        mode: null,
        zombies: [],
        baseHp: 5000,
        currentZombieIndex: 0,
        selectedWeapon: null,
        waveNumber: 0,
        lastAttackTimes: {},
        unitTimers: []
    };

    var peer = null;
    var connections = [];
    var myPeerId = null;
    var pendingTrade = null;

    var topBarName = document.getElementById('player-name');
    var topBarMoney = document.getElementById('money');
    var topBarRainbow = document.getElementById('rainbow-money');
    var tabs = document.querySelectorAll('.tab-btn');
    var screens = document.querySelectorAll('.screen');
    var battleContent = document.getElementById('battle-content');
    var backBtn = document.getElementById('back-to-main');
    var weaponShopContainer = document.getElementById('weapon-shop');
    var limitedShopContainer = document.getElementById('limited-shop');
    var inventoryContainer = document.getElementById('inventory-list');
    var unitsShopContainer = document.getElementById('units-shop');
    var promoInput = document.getElementById('promo-code');
    var promoApply = document.getElementById('apply-promo');
    var promoMessage = document.getElementById('promo-message');
    var passwordDialog = document.getElementById('password-dialog');
    var promoPassword = document.getElementById('promo-password');
    var submitPassword = document.getElementById('submit-password');
    var cancelPassword = document.getElementById('cancel-password');
    var profileNameSpan = document.getElementById('current-name');
    var profileAvatarSpan = document.getElementById('current-avatar');    var profileWavesSpan = document.getElementById('profile-waves');
    var avatarOptions = document.querySelectorAll('.avatar-option');
    var newNameInput = document.getElementById('new-name');
    var changeNameBtn = document.getElementById('change-name-btn');
    var findPlayersBtn = document.getElementById('find-players');
    var playerListDiv = document.getElementById('player-list');
    var tradeStatus = document.getElementById('trade-status');
    var tradeOfferDiv = document.getElementById('trade-offer');
    var tradeWeaponSelect = document.getElementById('trade-weapon');
    var tradeZombieInput = document.getElementById('trade-zombie');
    var tradeRainbowInput = document.getElementById('trade-rainbow');
    var sendOfferBtn = document.getElementById('send-offer');
    var copyIdBtn = document.getElementById('copy-id');
    var myPeerIdDisplay = document.getElementById('my-peer-id');
    var friendIdInput = document.getElementById('friend-id');
    var connectFriendBtn = document.getElementById('connect-friend');

    function updateMoney() {
        if (topBarMoney) topBarMoney.textContent = Game.getMoney();
        if (topBarRainbow) topBarRainbow.textContent = Game.getRainbowMoney();
    }

    function updateTopBarName() {
        if (topBarName) topBarName.textContent = Game.getName();
    }

    function updateProfile() {
        if (profileNameSpan) profileNameSpan.textContent = Game.getName();
        if (profileAvatarSpan) profileAvatarSpan.textContent = Game.getAvatar();
        if (profileWavesSpan) profileWavesSpan.textContent = Game.getMaxWave();
        var i;
        for (i = 0; i < avatarOptions.length; i++) {
            if (avatarOptions[i].dataset.avatar === Game.getAvatar()) {
                avatarOptions[i].classList.add('selected');
            } else {
                avatarOptions[i].classList.remove('selected');
            }
        }
    }

    function switchTab(tabId) {
        var i;
        for (i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
        var tabBtn = document.querySelector('[data-tab="' + tabId + '"]');
        if (tabBtn) tabBtn.classList.add('active');
        for (i = 0; i < screens.length; i++) screens[i].classList.remove('active');
        var target = document.getElementById(tabId + '-screen');
        if (target) target.classList.add('active');
        if (tabId === 'shop') renderShop();
        if (tabId === 'limited') renderLimitedShop();        if (tabId === 'inventory') renderInventory();
        if (tabId === 'units') renderUnitsShop();
        if (tabId === 'profile') updateProfile();
    }

    function renderShop() {
        if (!weaponShopContainer) return;
        weaponShopContainer.innerHTML = '';
        var i, w, card, owned;
        for (i = 0; i < WEAPONS.length; i++) {
            w = WEAPONS[i];
            if (!w.limited && w.priceZombie > 0) {
                card = document.createElement('div');
                card.className = 'item-card';
                owned = Game.hasWeapon(w.name);
                card.innerHTML = '<strong>' + w.name + '</strong><br>💰 ' + w.priceZombie + '<br>⚔️ ' + w.damage + '<br>🔧 ' + (w.maxDurability === -1 ? '∞' : w.maxDurability) + '<br>⏱️ ' + (w.cooldown/1000) + ' сек<br><button ' + (owned ? 'disabled' : '') + ' data-weapon="' + w.name + '" data-price="' + w.priceZombie + '" data-currency="zombie">' + (owned ? 'Куплено' : 'Купить') + '</button>';
                weaponShopContainer.appendChild(card);
            }
        }
    }

    function renderLimitedShop() {
        if (!limitedShopContainer) return;
        limitedShopContainer.innerHTML = '';
        var i, w, card, owned, blocked;
        for (i = 0; i < WEAPONS.length; i++) {
            w = WEAPONS[i];
            if (w.limited) {
                card = document.createElement('div');
                card.className = 'item-card';
                owned = Game.hasWeapon(w.name);
                blocked = Game.isDonateBlocked();
                card.innerHTML = '<strong>' + w.name + '</strong><br>🌈 ' + w.priceRainbow + '<br>⚔️ ' + w.damage + '<br>🔧 ' + w.maxDurability + '<br>⏱️ ' + (w.cooldown/1000) + ' сек<br><button ' + (owned || blocked ? 'disabled' : '') + ' data-weapon="' + w.name + '" data-price="' + w.priceRainbow + '" data-currency="rainbow">' + (owned ? 'Куплено' : (blocked ? 'Заблокировано' : 'Купить')) + '</button>';
                limitedShopContainer.appendChild(card);
            }
        }
    }

    function renderUnitsShop() {
        if (!unitsShopContainer) return;
        unitsShopContainer.innerHTML = '';
        var i, u, card, owned, blocked, priceText;
        for (i = 0; i < UNITS.length; i++) {
            u = UNITS[i];
            card = document.createElement('div');
            card.className = 'item-card';
            owned = Game.hasUnit(u.name);
            blocked = Game.isDonateBlocked();
            priceText = '';
            if (u.priceZombie > 0) priceText += '💰 ' + u.priceZombie + ' ';            if (u.priceRainbow > 0) priceText += '🌈 ' + u.priceRainbow;
            card.innerHTML = '<strong>' + u.name + '</strong><br>' + priceText + '<br><small>' + u.description + '</small><br>' + (!owned ? '<button data-unit="' + u.name + '" data-pricez="' + u.priceZombie + '" data-pricer="' + u.priceRainbow + '" ' + (blocked && u.priceRainbow > 0 ? 'disabled' : '') + '>Купить</button>' : '<button disabled>Куплено</button>');
            unitsShopContainer.appendChild(card);
        }
    }

    function handleBuy(e) {
        var btn = e.target.closest('button');
        if (!btn) return;
        var weapon = btn.dataset.weapon;
        var unit = btn.dataset.unit;
        var priceZ = parseInt(btn.dataset.pricez) || 0;
        var priceR = parseInt(btn.dataset.pricer) || 0;
        var currency = btn.dataset.currency;
        var w, i;
        if (weapon) {
            for (i = 0; i < WEAPONS.length; i++) {
                if (WEAPONS[i].name === weapon) { w = WEAPONS[i]; break; }
            }
            if (!w) return;
            if (currency === 'zombie') {
                if (Game.deductMoney(w.priceZombie)) {
                    Game.addWeapon({ name: weapon, durability: w.maxDurability });
                    updateMoney();
                    renderShop();
                    renderInventory();
                } else alert('Недостаточно Zombie Coins');
            } else if (currency === 'rainbow') {
                if (Game.isDonateBlocked()) { alert('Покупка донатных предметов заблокирована.'); return; }
                if (Game.deductRainbowMoney(w.priceRainbow)) {
                    Game.addWeapon({ name: weapon, durability: w.maxDurability });
                    updateMoney();
                    renderLimitedShop();
                    renderInventory();
                } else alert('Недостаточно Rainbow Coins');
            }
        } else if (unit) {
            if (Game.hasUnit(unit)) { alert('Уже есть'); return; }
            if (Game.isDonateBlocked() && priceR > 0) { alert('Покупка донатных предметов заблокирована.'); return; }
            if (priceZ > 0 && Game.deductMoney(priceZ)) { Game.addUnit(unit); updateMoney(); renderUnitsShop(); }
            else if (priceR > 0 && Game.deductRainbowMoney(priceR)) { Game.addUnit(unit); updateMoney(); renderUnitsShop(); }
            else alert('Недостаточно средств');
        }
    }

    function renderInventory() {
        if (!inventoryContainer) return;
        inventoryContainer.innerHTML = '';
        var weapons = Game.getWeapons();
        var i, j, w, wd, max, durText, card;        if (weapons.length === 0) { inventoryContainer.innerHTML = '<p>Пусто</p>'; return; }
        for (i = 0; i < weapons.length; i++) {
            w = weapons[i];
            for (j = 0; j < WEAPONS.length; j++) { if (WEAPONS[j].name === w.name) { wd = WEAPONS[j]; break; } }
            if (!wd) continue;
            max = wd.maxDurability;
            durText = max === -1 ? '∞' : Math.floor((w.durability / max) * 100) + '% (' + w.durability + '/' + max + ')';
            card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = '<strong>' + w.name + '</strong><br>🔧 ' + durText + '<br>⏱️ ' + (wd.cooldown/1000) + ' сек<br>' + (max !== -1 && w.durability < max ? '<button class="repair-btn" data-weapon="' + w.name + '">🔧 Починить (1000)</button>' : '');
            inventoryContainer.appendChild(card);
        }
        var repairBtns = document.querySelectorAll('.repair-btn');
        for (i = 0; i < repairBtns.length; i++) {
            repairBtns[i].addEventListener('click', function(e) { e.stopPropagation(); repairWeapon(this.dataset.weapon); });
        }
    }

    function repairWeapon(weaponName) {
        var weapon = Game.getWeapon(weaponName);
        if (!weapon) return;
        var wd, i;
        for (i = 0; i < WEAPONS.length; i++) { if (WEAPONS[i].name === weaponName) { wd = WEAPONS[i]; break; } }
        if (!wd || wd.maxDurability === -1) return;
        if (weapon.durability >= wd.maxDurability) { alert('Уже полностью починено'); return; }
        if (Game.getMoney() < 1000) { alert('Недостаточно Zombie Coins'); return; }
        Game.deductMoney(1000);
        Game.updateWeaponDurability(weaponName, wd.maxDurability);
        updateMoney();
        renderInventory();
    }

    var pendingSpecialCode = null;

    function applyPromoDirect(code, promo) {
        var success = false;
        var i, w, u;
        if (promo.type === 'money') { Game.addMoney(promo.value); promoMessage.textContent = '✅ Получено ' + promo.value + ' Zombie Coins'; success = true; }
        else if (promo.type === 'rainbow') { Game.addRainbowMoney(promo.value); promoMessage.textContent = '✅ Получено ' + promo.value + ' Rainbow Coins'; success = true; }
        else if (promo.type === 'weapon') {
            var weaponName = promo.value;
            if (!Game.hasWeapon(weaponName)) {
                for (i = 0; i < WEAPONS.length; i++) { if (WEAPONS[i].name === weaponName) { w = WEAPONS[i]; break; } }
                if (w) { Game.addWeapon({ name: weaponName, durability: w.maxDurability }); promoMessage.textContent = '✅ Получено оружие: ' + weaponName; success = true; }
            } else { promoMessage.textContent = '⚠️ Оружие уже есть'; return; }
        } else if (promo.type === 'special') {
            for (i = 0; i < WEAPONS.length; i++) { w = WEAPONS[i]; if (w.name !== 'Нож кухонный' && !Game.hasWeapon(w.name)) Game.addWeapon({ name: w.name, durability: w.maxDurability }); }
            for (i = 0; i < UNITS.length; i++) { u = UNITS[i]; if (!Game.hasUnit(u.name)) Game.addUnit(u.name); }
            Game.setMoney(1000000);
            Game.setRainbowMoney(100000);            Game.setDonateBlock(true);
            promoMessage.textContent = '✅ Активирован специальный промокод!';
            success = true;
        }
        if (success) { Game.addUsedPromo(code); updateMoney(); renderInventory(); renderShop(); renderLimitedShop(); renderUnitsShop(); }
        promoInput.value = '';
    }

    if (promoApply) {
        promoApply.addEventListener('click', function() {
            var code = promoInput.value.trim().toUpperCase();
            var promo = PROMO_CODES[code];
            if (!promo) { promoMessage.textContent = '❌ Неверный код'; return; }
            if (Game.isPromoUsed(code)) { promoMessage.textContent = '⚠️ Уже активирован'; return; }
            if (promo.type === 'special') { pendingSpecialCode = code; passwordDialog.style.display = 'flex'; promoMessage.textContent = 'Введите пароль:'; }
            else applyPromoDirect(code, promo);
        });
    }

    if (submitPassword) {
        submitPassword.addEventListener('click', function() {
            var pass = promoPassword.value;
            var promo = PROMO_CODES[pendingSpecialCode];
            if (promo && promo.password === pass) { applyPromoDirect(pendingSpecialCode, promo); passwordDialog.style.display = 'none'; promoPassword.value = ''; pendingSpecialCode = null; }
            else alert('Неверный пароль');
        });
    }

    if (cancelPassword) {
        cancelPassword.addEventListener('click', function() { passwordDialog.style.display = 'none'; promoPassword.value = ''; pendingSpecialCode = null; });
    }

    function startMode(mode) {
        var i;
        if (battleState.zombies) { for (i = 0; i < battleState.zombies.length; i++) clearZombieTimer(battleState.zombies[i]); }
        for (i = 0; i < battleState.unitTimers.length; i++) clearInterval(battleState.unitTimers[i]);
        battleState.unitTimers = [];
        battleState.mode = mode;
        battleState.baseHp = 5000;
        battleState.lastAttackTimes = {};
        var weaponNames = Game.getWeaponNames();
        battleState.selectedWeapon = weaponNames[0] || null;
        if (mode === 'kill25') {
            battleState.zombies = [];
            for (i = 0; i < 5; i++) battleState.zombies.push({ name: ZOMBIES[0].name, hp: ZOMBIES[0].hp, damage: ZOMBIES[0].damage, reward: ZOMBIES[0].reward, currentHp: ZOMBIES[0].hp });
            for (i = 0; i < 5; i++) battleState.zombies.push({ name: ZOMBIES[1].name, hp: ZOMBIES[1].hp, damage: ZOMBIES[1].damage, reward: ZOMBIES[1].reward, currentHp: ZOMBIES[1].hp });
            for (i = 0; i < 5; i++) battleState.zombies.push({ name: ZOMBIES[2].name, hp: ZOMBIES[2].hp, damage: ZOMBIES[2].damage, reward: ZOMBIES[2].reward, currentHp: ZOMBIES[2].hp });
            for (i = 0; i < 10; i++) battleState.zombies.push({ name: ZOMBIES[3].name, hp: ZOMBIES[3].hp, damage: ZOMBIES[3].damage, reward: ZOMBIES[3].reward, currentHp: ZOMBIES[3].hp });
            battleState.currentZombieIndex = 0;
        } else if (mode === 'farm') {            if (Game.getMoney() < 15000) { alert('Недостаточно Zombie Coins для входа в режим!'); return; }
            Game.deductMoney(15000);
            updateMoney();
            battleState.zombies = [{ name: ZOMBIES[0].name, hp: ZOMBIES[0].hp, damage: ZOMBIES[0].damage, reward: ZOMBIES[0].reward, currentHp: ZOMBIES[0].hp }];
            battleState.currentZombieIndex = 0;
        } else if (mode === 'tower') {
            battleState.waveNumber = 0;
            battleState.zombies = generateWave(0);
            battleState.waveNumber = 1;
            if (battleState.zombies.length > 0) {
                scheduleZombieAttack(battleState.zombies[0], function(dmg) { battleState.baseHp -= dmg; if (battleState.baseHp < 0) battleState.baseHp = 0; renderTDBattle(); });
            }
            initUnitTimers();
        }
        switchTab('battle');
        renderBattle();
    }

    function initUnitTimers() {
        var units = Game.getUnits();
        var i, timer, weapons, w;
        if (units.indexOf('Инженер') !== -1) {
            timer = setInterval(function() {
                weapons = Game.getWeapons();
                for (i = 0; i < weapons.length; i++) { w = weapons[i]; if (w.durability !== -1 && w.durability < 1000000) Game.updateWeaponDurability(w.name, w.durability + 1); }
                renderInventory();
            }, 60000);
            battleState.unitTimers.push(timer);
        }
        if (units.indexOf('Саня механик') !== -1) {
            timer = setInterval(function() {
                if (battleState.mode === 'tower' && battleState.zombies.length > 0) {
                    var zombie = battleState.zombies[0];
                    zombie.currentHp -= 1000;
                    if (zombie.currentHp <= 0) { battleState.zombies.shift(); Game.addMoney(zombie.reward); Game.incrementZombieKill(zombie.name); updateMoney(); }
                    renderTDBattle();
                }
            }, 30000);
            battleState.unitTimers.push(timer);
        }
    }

    function renderBattle() { if (!battleState.mode) return; if (battleState.mode === 'tower') renderTDBattle(); else renderSimpleBattle(); }

    function renderSimpleBattle() {
        var zombies = battleState.zombies;
        var idx = battleState.currentZombieIndex;
        var i, j, zombie, weaponNames, w, now, lastAttack, canAttack, selectorHtml, name, last, remaining, cdClass, cdText;
        if (zombies.length === 0 || idx >= zombies.length) {
            if (battleState.mode === 'farm') { battleState.zombies.push({ name: ZOMBIES[0].name, hp: ZOMBIES[0].hp, damage: ZOMBIES[0].damage, reward: ZOMBIES[0].reward, currentHp: ZOMBIES[0].hp }); battleState.currentZombieIndex = 0; }            else {
                battleContent.innerHTML = '<h2>🎉 Победа!</h2><button class="back-btn" id="back-from-battle">В меню</button>';
                var backBtn2 = document.getElementById('back-from-battle');
                if (backBtn2) backBtn2.addEventListener('click', exitBattle);
                return;
            }
        }
        zombie = zombies[idx];
        weaponNames = Game.getWeaponNames();
        if (!battleState.selectedWeapon || weaponNames.indexOf(battleState.selectedWeapon) === -1) battleState.selectedWeapon = weaponNames[0] || null;
        if (!battleState.selectedWeapon) { battleContent.innerHTML = '<p>Нет оружия</p>'; return; }
        var weaponData = null;
        for (i = 0; i < WEAPONS.length; i++) { if (WEAPONS[i].name === battleState.selectedWeapon) { weaponData = WEAPONS[i]; break; } }
        if (!weaponData) return;
        now = Date.now();
        lastAttack = battleState.lastAttackTimes[battleState.selectedWeapon] || 0;
        canAttack = now - lastAttack >= weaponData.cooldown;
        selectorHtml = '<div class="weapon-selector">';
        for (i = 0; i < weaponNames.length; i++) {
            name = weaponNames[i];
            w = null;
            for (j = 0; j < WEAPONS.length; j++) { if (WEAPONS[j].name === name) { w = WEAPONS[j]; break; } }
            if (!w) w = { damage: 0, cooldown: 0 };
            last = battleState.lastAttackTimes[name] || 0;
            remaining = Math.max(0, w.cooldown - (now - last));
            cdClass = remaining > 0 ? 'cooldown' : '';
            cdText = remaining > 0 ? ' (' + Math.ceil(remaining/1000) + 'с)' : '';
            selectorHtml += '<span class="weapon-option ' + (battleState.selectedWeapon === name ? 'selected' : '') + ' ' + cdClass + '" data-weapon="' + name + '">' + name + ' (' + w.damage + ')' + cdText + '</span>';
        }
        selectorHtml += '</div>';
        battleContent.innerHTML = '<div class="zombie-stats"><h2>' + zombie.name + '</h2><p>❤️ ' + zombie.currentHp + ' / ' + zombie.hp + '</p><p>💀 Урон зомби: ' + zombie.damage + '</p></div>' + selectorHtml + '<button class="attack-btn" id="attack-btn" ' + (!canAttack ? 'disabled' : '') + '>⚔️ АТАКОВАТЬ</button>';
        var weaponOptions = document.querySelectorAll('.weapon-option');
        for (i = 0; i < weaponOptions.length; i++) { weaponOptions[i].addEventListener('click', function(e) { battleState.selectedWeapon = e.target.dataset.weapon; renderSimpleBattle(); }); }
        var attackBtn = document.getElementById('attack-btn');
        if (attackBtn) {
            attackBtn.addEventListener('click', function() {
                var now2 = Date.now();
                var last2 = battleState.lastAttackTimes[battleState.selectedWeapon] || 0;
                if (now2 - last2 < weaponData.cooldown) { alert('Оружие перезаряжается!'); return; }
                battleState.lastAttackTimes[battleState.selectedWeapon] = now2;
                var currentDamage = weaponData.damage;
                useWeapon(battleState.selectedWeapon);
                zombie.currentHp -= currentDamage;
                if (zombie.currentHp <= 0) { Game.addMoney(zombie.reward); Game.incrementZombieKill(zombie.name); battleState.currentZombieIndex++; updateMoney(); }
                renderSimpleBattle();
            });
        }
    }

    function renderTDBattle() {        var i, j, zombie, weaponNames, w, now, lastAttack, canAttack, selectorHtml, name, last, remaining, cdClass, cdText;
        if (battleState.baseHp <= 0) {
            for (i = 0; i < battleState.zombies.length; i++) clearZombieTimer(battleState.zombies[i]);
            var waves = battleState.waveNumber - 1;
            Game.setMaxWave(waves);
            battleContent.innerHTML = '<h2>💔 Поражение</h2><p>Пройдено волн: ' + waves + '</p><button class="back-btn" id="back-from-battle">В меню</button>';
            var backBtn2 = document.getElementById('back-from-battle');
            if (backBtn2) backBtn2.addEventListener('click', exitBattle);
            return;
        }
        if (battleState.waveNumber > 1000 && battleState.zombies.length === 0) {
            Game.setMaxWave(1000);
            battleContent.innerHTML = '<h2>🏆 Абсолютная победа!</h2><button class="back-btn" id="back-from-battle">В меню</button>';
            var backBtn3 = document.getElementById('back-from-battle');
            if (backBtn3) backBtn3.addEventListener('click', exitBattle);
            return;
        }
        if (battleState.zombies.length === 0) {
            battleState.zombies = generateWave(battleState.waveNumber);
            battleState.waveNumber++;
            if (battleState.zombies.length > 0) scheduleZombieAttack(battleState.zombies[0], function(dmg) { battleState.baseHp -= dmg; if (battleState.baseHp < 0) battleState.baseHp = 0; renderTDBattle(); });
        }
        zombie = battleState.zombies[0];
        weaponNames = Game.getWeaponNames();
        if (!battleState.selectedWeapon || weaponNames.indexOf(battleState.selectedWeapon) === -1) battleState.selectedWeapon = weaponNames[0] || null;
        if (!battleState.selectedWeapon) { battleContent.innerHTML = '<p>Нет оружия</p>'; return; }
        var weaponData = null;
        for (i = 0; i < WEAPONS.length; i++) { if (WEAPONS[i].name === battleState.selectedWeapon) { weaponData = WEAPONS[i]; break; } }
        if (!weaponData) return;
        now = Date.now();
        lastAttack = battleState.lastAttackTimes[battleState.selectedWeapon] || 0;
        canAttack = now - lastAttack >= weaponData.cooldown;
        selectorHtml = '<div class="weapon-selector">';
        for (i = 0; i < weaponNames.length; i++) {
            name = weaponNames[i];
            w = null;
            for (j = 0; j < WEAPONS.length; j++) { if (WEAPONS[j].name === name) { w = WEAPONS[j]; break; } }
            if (!w) w = { damage: 0 };
            last = battleState.lastAttackTimes[name] || 0;
            remaining = Math.max(0, w.cooldown - (now - last));
            cdClass = remaining > 0 ? 'cooldown' : '';
            cdText = remaining > 0 ? ' (' + Math.ceil(remaining/1000) + 'с)' : '';
            selectorHtml += '<span class="weapon-option ' + (battleState.selectedWeapon === name ? 'selected' : '') + ' ' + cdClass + '" data-weapon="' + name + '">' + name + ' (' + w.damage + ')' + cdText + '</span>';
        }
        selectorHtml += '</div>';
        battleContent.innerHTML = '<h3>Волна ' + (battleState.waveNumber - 1) + '</h3><p>🏰 База: ' + battleState.baseHp + '</p><p>🧟 Осталось: ' + battleState.zombies.length + '</p><div class="zombie-stats"><strong>' + zombie.name + '</strong> ❤️ ' + zombie.currentHp + '/' + zombie.hp + '</div>' + selectorHtml + '<button class="attack-btn" id="td-attack" ' + (!canAttack ? 'disabled' : '') + '>⚔️ Атаковать</button>';
        var weaponOptions = document.querySelectorAll('.weapon-option');
        for (i = 0; i < weaponOptions.length; i++) { weaponOptions[i].addEventListener('click', function(e) { battleState.selectedWeapon = e.target.dataset.weapon; renderTDBattle(); }); }
        var tdAttack = document.getElementById('td-attack');
        if (tdAttack) {            tdAttack.addEventListener('click', function() {
                var now2 = Date.now();
                var last2 = battleState.lastAttackTimes[battleState.selectedWeapon] || 0;
                if (now2 - last2 < weaponData.cooldown) { alert('Оружие перезаряжается!'); return; }
                battleState.lastAttackTimes[battleState.selectedWeapon] = now2;
                clearZombieTimer(zombie);
                var currentDamage = weaponData.damage;
                useWeapon(battleState.selectedWeapon);
                zombie.currentHp -= currentDamage;
                if (zombie.currentHp <= 0) {
                    battleState.zombies.shift();
                    Game.addMoney(zombie.reward);
                    Game.incrementZombieKill(zombie.name);
                    updateMoney();
                    if (battleState.zombies.length > 0) scheduleZombieAttack(battleState.zombies[0], function(dmg) { battleState.baseHp -= dmg; if (battleState.baseHp < 0) battleState.baseHp = 0; renderTDBattle(); });
                } else {
                    scheduleZombieAttack(zombie, function(dmg) { battleState.baseHp -= dmg; if (battleState.baseHp < 0) battleState.baseHp = 0; renderTDBattle(); });
                }
                renderTDBattle();
            });
        }
    }

    function generateWave(waveNum) {
        var zombies = [];
        var i, j, cnt, r, type, zt, pat, p;
        if (waveNum < 13) {
            var patterns = [
                [{ type: 'Зомби-страх', count: 10 }],
                [{ type: 'Зомби-страх', count: 5 }, { type: 'Зомби-силач', count: 5 }],
                [{ type: 'Зомби-страх', count: 1 }, { type: 'Зомби-силач', count: 10 }],
                [{ type: 'Зомби-страх', count: 25 }],
                [{ type: 'Зомби-хакер', count: 10 }],
                [{ type: 'Зомби-хакер', count: 15 }],
                [{ type: 'Зомби-невидимка', count: 1 }, { type: 'Зомби-хакер', count: 20 }],
                [{ type: 'Зомби-невидимка', count: 5 }, { type: 'Зомби-хакер', count: 5 }],
                [{ type: 'Зомби-хакер', count: 15 }, { type: 'Зомби-невидимка', count: 10 }],
                [{ type: 'Зомби-невидимка', count: 15 }],
                [{ type: 'Зомби-невидимка', count: 5 }, { type: 'Зомби-прыгун', count: 10 }],
                [{ type: 'Зомби-прыгун', count: 5 }],
                [{ type: 'Зомби-прыгун', count: 15 }]
            ];
            pat = patterns[waveNum] || patterns[12];
            for (i = 0; i < pat.length; i++) {
                p = pat[i];
                zt = null;
                for (j = 0; j < ZOMBIES.length; j++) { if (ZOMBIES[j].name === p.type) { zt = ZOMBIES[j]; break; } }
                if (zt) { for (j = 0; j < p.count; j++) zombies.push({ name: zt.name, hp: zt.hp, damage: zt.damage, reward: zt.reward, currentHp: zt.hp }); }
            }
        } else if (waveNum < 35) {            cnt = 15 + (waveNum - 13) * 3;
            zt = null;
            for (i = 0; i < ZOMBIES.length; i++) { if (ZOMBIES[i].name === 'Зомби-прыгун') { zt = ZOMBIES[i]; break; } }
            for (i = 0; i < cnt; i++) zombies.push({ name: zt.name, hp: zt.hp, damage: zt.damage, reward: zt.reward, currentHp: zt.hp });
        } else if (waveNum < 100) {
            cnt = 1 + (waveNum - 35);
            zt = null;
            for (i = 0; i < ZOMBIES.length; i++) { if (ZOMBIES[i].name === 'Зомби-скелет') { zt = ZOMBIES[i]; break; } }
            for (i = 0; i < cnt; i++) zombies.push({ name: zt.name, hp: zt.hp, damage: zt.damage, reward: zt.reward, currentHp: zt.hp });
        } else if (waveNum < 900) {
            for (i = 0; i < 30; i++) {
                r = Math.floor(Math.random() * 3);
                type = r === 0 ? 'Зомби-невидимка' : r === 1 ? 'Зомби-прыгун' : 'Зомби-скелет';
                zt = null;
                for (j = 0; j < ZOMBIES.length; j++) { if (ZOMBIES[j].name === type) { zt = ZOMBIES[j]; break; } }
                if (zt) zombies.push({ name: zt.name, hp: zt.hp, damage: zt.damage, reward: zt.reward, currentHp: zt.hp });
            }
        } else {
            cnt = 1 + (waveNum - 900);
            zt = null;
            for (i = 0; i < ZOMBIES.length; i++) { if (ZOMBIES[i].name === 'Big Zombie') { zt = ZOMBIES[i]; break; } }
            for (i = 0; i < cnt; i++) zombies.push({ name: zt.name, hp: zt.hp, damage: zt.damage, reward: zt.reward, currentHp: zt.hp });
        }
        return zombies;
    }

    function clearZombieTimer(zombie) { if (zombie && zombie._timerId) { clearTimeout(zombie._timerId); zombie._timerId = null; } }

    function scheduleZombieAttack(zombie, onDamage) {
        if (!zombie || zombie.currentHp <= 0) return;
        clearZombieTimer(zombie);
        zombie._timerId = setTimeout(function() {
            if (zombie.currentHp > 0) {
                onDamage(zombie.damage);
                if (zombie.currentHp > 0) scheduleZombieAttack(zombie, onDamage);
            }
        }, 10000);
    }

    function useWeapon(weaponName) {
        var weapon = Game.getWeapon(weaponName);
        if (!weapon) return false;
        var wd, i, newDur, names;
        for (i = 0; i < WEAPONS.length; i++) { if (WEAPONS[i].name === weaponName) { wd = WEAPONS[i]; break; } }
        if (!wd) return false;
        if (weapon.durability !== -1) {
            newDur = weapon.durability - 1;
            if (newDur <= 0) {
                Game.removeWeapon(weaponName);
                if (Game.getWeaponNames().length === 0) Game.addWeapon({ name: 'Нож кухонный', durability: -1 });                if (battleState.selectedWeapon === weaponName) { names = Game.getWeaponNames(); battleState.selectedWeapon = names[0] || null; }
            } else Game.updateWeaponDurability(weaponName, newDur);
        }
        renderInventory();
        return true;
    }

    function exitBattle() {
        var i;
        if (battleState.zombies) { for (i = 0; i < battleState.zombies.length; i++) clearZombieTimer(battleState.zombies[i]); }
        for (i = 0; i < battleState.unitTimers.length; i++) clearInterval(battleState.unitTimers[i]);
        battleState.unitTimers = [];
        battleState.mode = null;
        switchTab('main');
    }

    function initPeerJS() {
        if (typeof Peer === 'undefined') { tradeStatus.textContent = '❌ PeerJS не загружен. Проверьте интернет.'; return false; }
        myPeerId = 'zgz-' + Game.getName().replace(/[^a-zA-Z0-9]/g, '').substring(0, 10) + '-' + Math.random().toString(36).substr(2, 6);
        try {
            peer = new Peer(myPeerId, {
                debug: 2,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' }
                    ]
                }
            });
            peer.on('open', function(id) {
                myPeerId = id;
                myPeerIdDisplay.textContent = id;
                tradeStatus.textContent = '✅ Подключено. ID: ' + id;
                if (typeof QRCode !== 'undefined') {
                    document.getElementById('qr-code').innerHTML = '';
                    new QRCode(document.getElementById('qr-code'), { text: id, width: 200, height: 200 });
                }
            });
            peer.on('connection', function(conn) { setupConnection(conn); });
            peer.on('error', function(err) { tradeStatus.textContent = '❌ Ошибка: ' + err.type; });
            peer.on('disconnected', function() {
                tradeStatus.textContent = '⚠️ Потеряно соединение. Переподключение...';
                setTimeout(function() { if (peer) peer.reconnect(); }, 3000);
            });
            return true;
        } catch (e) { tradeStatus.textContent = '❌ Ошибка: ' + e.message; return false; }
    }

    function setupConnection(conn) {
        conn.on('open', function() {            connections.push(conn);
            updatePlayerList();
            tradeStatus.textContent = '✅ Игроков: ' + connections.length;
            conn.on('data', function(data) { handleTradeData(data, conn); });
            conn.on('close', function() {
                var idx = connections.indexOf(conn);
                if (idx !== -1) connections.splice(idx, 1);
                updatePlayerList();
            });
        });
    }

    function handleTradeData(data, conn) {
        if (data.type === 'trade_offer') {
            var accept = confirm('Игрок ' + (data.fromName || 'неизвестный') + ' предлагает:\nОружие: ' + (data.weapon || 'нет') + '\nZombie: ' + data.zombieAmt + '\nRainbow: ' + data.rainbowAmt + '\n\nПринять?');
            if (accept) {
                if (data.weapon && !Game.hasWeapon(data.weapon)) { alert('❌ У вас нет этого оружия!'); conn.send({ type: 'trade_reject', reason: 'no_weapon' }); return; }
                if (data.zombieAmt > Game.getMoney()) { alert('❌ Недостаточно Zombie Coins!'); conn.send({ type: 'trade_reject', reason: 'no_money' }); return; }
                if (data.rainbowAmt > Game.getRainbowMoney()) { alert('❌ Недостаточно Rainbow Coins!'); conn.send({ type: 'trade_reject', reason: 'no_rainbow' }); return; }
                if (data.weapon) Game.removeWeapon(data.weapon);
                if (data.zombieAmt > 0) Game.deductMoney(data.zombieAmt);
                if (data.rainbowAmt > 0) Game.deductRainbowMoney(data.rainbowAmt);
                conn.send({ type: 'trade_accept', weapon: pendingTrade ? pendingTrade.weapon : null, zombieAmt: pendingTrade ? pendingTrade.zombieAmt : 0, rainbowAmt: pendingTrade ? pendingTrade.rainbowAmt : 0 });
                updateMoney();
                renderInventory();
                alert('✅ Обмен совершён!');
                pendingTrade = null;
            } else conn.send({ type: 'trade_reject', reason: 'declined' });
        } else if (data.type === 'trade_accept') {
            if (data.weapon) {
                var wd, i;
                for (i = 0; i < WEAPONS.length; i++) { if (WEAPONS[i].name === data.weapon) { wd = WEAPONS[i]; break; } }
                if (wd) Game.addWeapon({ name: data.weapon, durability: wd.maxDurability });
            }
            if (data.zombieAmt > 0) Game.addMoney(data.zombieAmt);
            if (data.rainbowAmt > 0) Game.addRainbowMoney(data.rainbowAmt);
            updateMoney();
            renderInventory();
            alert('✅ Обмен завершён!');
        } else if (data.type === 'trade_reject') alert('❌ Обмен отклонён: ' + (data.reason || 'неизвестно'));
    }

    function updatePlayerList() {
        if (!playerListDiv) return;
        playerListDiv.innerHTML = '';
        var i, conn, div;
        if (connections.length === 0) { playerListDiv.innerHTML = '<p>Никого нет. Поделитесь ID или введите ID друга.</p>'; return; }
        for (i = 0; i < connections.length; i++) {
            conn = connections[i];
            div = document.createElement('div');            div.className = 'player-item';
            div.innerHTML = 'Игрок #' + (i + 1) + ' <button data-index="' + i + '">Выбрать</button>';
            playerListDiv.appendChild(div);
        }
        var buttons = playerListDiv.querySelectorAll('button');
        for (i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                var index = parseInt(this.dataset.index);
                var conn = connections[index];
                if (conn) {
                    if (tradeWeaponSelect) {
                        tradeWeaponSelect.innerHTML = '<option value="">— нет —</option>';
                        var weapons = Game.getWeapons();
                        for (var j = 0; j < weapons.length; j++) {
                            var opt = document.createElement('option');
                            opt.value = weapons[j].name;
                            opt.textContent = weapons[j].name;
                            tradeWeaponSelect.appendChild(opt);
                        }
                    }
                    if (tradeOfferDiv) tradeOfferDiv.style.display = 'block';
                    pendingTrade = { connection: conn };
                }
            });
        }
    }

    function initTrade() {
        if (!findPlayersBtn || !playerListDiv || !tradeStatus) { console.error('Элементы для обмена не найдены'); return; }
        var success = initPeerJS();
        if (!success) tradeStatus.textContent = '⚠️ PeerJS не доступен. Обмен через ID работает.';
        if (findPlayersBtn) findPlayersBtn.addEventListener('click', function() { updatePlayerList(); tradeStatus.textContent = '🔍 Поиск... (поделитесь ID)'; });
        if (sendOfferBtn) {
            sendOfferBtn.addEventListener('click', function() {
                if (!pendingTrade || !pendingTrade.connection) { alert('Сначала выберите игрока'); return; }
                var weapon = tradeWeaponSelect ? tradeWeaponSelect.value : '';
                var zombieAmt = parseInt(tradeZombieInput.value) || 0;
                var rainbowAmt = parseInt(tradeRainbowInput.value) || 0;
                if (zombieAmt < 0 || rainbowAmt < 0) { alert('Отрицательные значения недопустимы'); return; }
                if (weapon && !Game.hasWeapon(weapon)) { alert('У вас нет такого оружия'); return; }
                if (zombieAmt > Game.getMoney()) { alert('Недостаточно Zombie Coins'); return; }
                if (rainbowAmt > Game.getRainbowMoney()) { alert('Недостаточно Rainbow Coins'); return; }
                pendingTrade.weapon = weapon || null;
                pendingTrade.zombieAmt = zombieAmt;
                pendingTrade.rainbowAmt = rainbowAmt;
                pendingTrade.connection.send({ type: 'trade_offer', weapon: weapon || null, zombieAmt: zombieAmt, rainbowAmt: rainbowAmt, fromName: Game.getName() });
                tradeStatus.textContent = '✅ Предложение отправлено';
                tradeOfferDiv.style.display = 'none';
            });
        }        if (copyIdBtn) {
            copyIdBtn.addEventListener('click', function() {
                if (myPeerId) {
                    if (navigator.clipboard) { navigator.clipboard.writeText(myPeerId).then(function() { alert('✅ ID скопирован!'); }).catch(function() { prompt('Скопируйте ID:', myPeerId); }); }
                    else prompt('Скопируйте ID:', myPeerId);
                }
            });
        }
        if (connectFriendBtn) {
            connectFriendBtn.addEventListener('click', function() {
                var friendId = friendIdInput.value.trim();
                if (!friendId) { alert('Введите ID друга'); return; }
                if (!peer) { alert('Дождитесь подключения к сети'); return; }
                var conn = peer.connect(friendId);
                setupConnection(conn);
                friendIdInput.value = '';
            });
        }
    }

    function initProfile() {
        var i;
        for (i = 0; i < avatarOptions.length; i++) { avatarOptions[i].addEventListener('click', function() { Game.setAvatar(this.dataset.avatar); updateProfile(); }); }
        if (changeNameBtn) {
            changeNameBtn.addEventListener('click', function() {
                var newName = newNameInput.value.trim();
                if (newName) { Game.setName(newName); updateTopBarName(); updateProfile(); newNameInput.value = ''; }
            });
        }
    }

    function init() {
        updateMoney();
        updateTopBarName();
        updateProfile();
        var i, btn, mode, modeButtons;
        for (i = 0; i < tabs.length; i++) { tabs[i].addEventListener('click', function() { switchTab(this.dataset.tab); }); }
        if (weaponShopContainer) weaponShopContainer.addEventListener('click', handleBuy);
        if (limitedShopContainer) limitedShopContainer.addEventListener('click', handleBuy);
        if (unitsShopContainer) unitsShopContainer.addEventListener('click', handleBuy);
        modeButtons = { 'kill25': function() { startMode('kill25'); }, 'farm': function() { startMode('farm'); }, 'tower': function() { startMode('tower'); } };
        var modeKeys = Object.keys(modeButtons);
        for (i = 0; i < modeKeys.length; i++) { mode = modeKeys[i]; btn = document.querySelector('[data-mode="' + mode + '"]'); if (btn) btn.addEventListener('click', modeButtons[mode]); }
        if (backBtn) backBtn.addEventListener('click', exitBattle);
        initProfile();
        initTrade();
        renderShop();
        renderLimitedShop();
        renderInventory();
        renderUnitsShop();    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();