const API_URL = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
    ? "http://127.0.0.1:10000" 
    : "https://energomarket-e1k3.onrender.com";

const products = [
    { id: 1, name: "Шуруповерт Bosch PSR 1200", price: 4500, category: "Инструменты", img: "https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/shurupoverty/516977/2400x1600/51157269.jpg" },
    { id: 2, name: "Дрель ударная Makita", price: 5200, category: "Инструменты", img: "https://sun9-58.userapi.com/s/v1/ig2/tV5uYqf53Sh6CmOiAqcxA3Cn9lj_94SAjjVsFXxp7HpvNfXDWhoUMlkQ1JGPDSp8zcBPwJzUZtxKs_Kj3GlWMARN.jpg?quality=95&as=32x29,48x43,72x65,108x97,160x144,240x216,360x324,480x432,540x486,560x504&from=bu&u=t1eLuqKKcjaP3HxhwV7sCkOVK9kDB5GzXxlmgafbQhc&cs=560x0" },
    { id: 3, name: "Перфоратор Интерскол", price: 7800, category: "Инструменты", img: "https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/perforatory/751352/2400x1600/52220153.jpg" },
    { id: 4, name: "Мультиметр Ц4360 (Аналоговый)", price: 3200, category: "Тестеры", img: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-13/092/093/941/024/232/4/100051790355b0.jpg" },
    { id: 5, name: "Пластик PETG для 3D печати", price: 1500, category: "Расходники", img: "https://static.chipdip.ru/lib2/a/861/DOC066861456.jpg" },
    { id: 6, name: "Лобзик электрический Metabo", price: 6100, category: "Инструменты", img: "https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/lobziki-elektrolobziki/57940/2400x1600/51066487.jpg" },
    { id: 7, name: "Осциллограф цифровой портативный", price: 12500, category: "Тестеры", img: "https://img.joomcdn.net/c25bb6f282ef222a68e9299eb3b1e38fd71de117_1024_1024.jpeg" },
    { id: 8, name: "Паяльная станция Hakko", price: 8900, category: "Электроника", img: "https://cdn.laserzz.ru/uploads/2023/09/fx972_high_1.png" },
    { id: 9, name: "Пластик PLA (черный) 1кг", price: 1300, category: "Расходники", img: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-16/108/460/091/112/161/600022655797b0.webp" },
    { id: 10, name: "Угловая шлифмашина (Болгарка) DeWalt", price: 7400, category: "Инструменты", img: "https://avatars.mds.yandex.net/get-mpic/5326769/img_id3371684729133876011.jpeg/orig" },
    { id: 11, name: "Набор отверток диэлектрических", price: 1800, category: "Ручной инструмент", img: "https://cdn.vseinstrumenti.ru/images/goods/ruchnoj-instrument/otvertki/12527033/1200x800/197096991.jpg" },
    { id: 12, name: "Аккумулятор Li-ion 18V 4Ah", price: 4200, category: "Расходники", img: "https://basket-11.wbbasket.ru/vol1648/part164809/164809924/images/big/1.webp" },
    { id: 13, name: "Токовые клещи UNI-T", price: 3800, category: "Тестеры", img: "https://www.rusgeocom.ru/storage/images2/x/k/f/g/xkfgxcgfff7vnk8r9yy4lnd1xkpz58dl/detail/medium.webp" },
    { id: 14, name: "Промышленный фен Bosch", price: 5600, category: "Инструменты", img: "https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/stroitelnye-feny-termofeny/913437/2400x1600/51487137.jpg" },
    { id: 15, name: "Лазерный уровень 360 градусов", price: 9200, category: "Измерительные приборы", img: "https://avatars.mds.yandex.net/get-mpic/5259100/2a0000018dd141d639827c77acdc78164cc4/450x600" },
    { id: 16, name: "Набор сверл по металлу (1-10мм)", price: 1200, category: "Расходники", img: "https://avatars.mds.yandex.net/get-mpic/16317423/2a00000196a510a7a0cd933af9a79e2834c1/orig" },
    { id: 17, name: "Источник питания лабораторный 30V 5A", price: 6500, category: "Электроника", img: "https://avatars.mds.yandex.net/get-mpic/17879208/2a00000199865a39a12f3e1d2fda04704e17/orig" },
    { id: 18, name: "Клеевой пистолет Steinel", price: 2900, category: "Инструменты", img: "https://rostov-na-donu.1001prof.ru/upload/dev2fun.imagecompress/webp/iblock/d8b/yiol8jebft30r4r958aqxt6f30wtskhz/000f20835d8cab799e41003b5bbe1e19.webp" },
    { id: 19, name: "Детектор скрытой проводки", price: 2400, category: "Тестеры", img: "https://avatars.mds.yandex.net/i?id=befdfe0e2b384d176304f0e00f080c63_l-4149382-images-thumbs&n=13" },
    { id: 20, name: "Реноватор (МФИ) Makita", price: 11000, category: "Инструменты", img: "https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/renovator-mnogofunktsionalnyj-instrument/800918/2400x1600/51338195.jpg" },
    { id: 21, name: "Пластик ABS (белый) 1кг", price: 1400, category: "Расходники", img: "https://avatars.mds.yandex.net/get-mpic/11397991/2a0000018c6be57394948f4932206e104d79/orig" },
    { id: 22, name: "Стриппер для снятия изоляции", price: 1600, category: "Ручной инструмент", img: "https://www.enkor24.ru/u/images/products/c5/c539a4ddde8dae7fa9d6c5fde51e04b9945728b1.jpg" },
    { id: 23, name: "Тепловизор мобильный", price: 22000, category: "Тестеры", img: "https://avatars.mds.yandex.net/i?id=20e4eadb35188e4ab663da3ce8b7af0d_l-13315631-images-thumbs&n=13" },
    { id: 24, name: "Шлифмашина эксцентриковая", price: 5800, category: "Инструменты", img: "https://cdn.etm.ru/ipro/2096/bo6050j_c2l0.jpg" },
    { id: 25, name: "Набор бит (42 предмета)", price: 950, category: "Расходники", img: "https://static.chipdip.ru/lib/761/DOC060761039.jpg" },
    { id: 26, name: "Фрезер по дереву Bosch", price: 13500, category: "Инструменты", img: "https://avatars.mds.yandex.net/get-mpic/11167279/2a00000191d6dff5d0a3841d2bf632c2b06e/orig" },
    { id: 27, name: "Мультиметр цифровой Fluke", price: 18600, category: "Тестеры", img: "https://cdn.vseinstrumenti.ru/images/goods/stroitelnyj-instrument/izmeritelnye-pribory-i-instrument/673192/2400x1600/52220563.jpg" },
    { id: 28, name: "Газовый паяльник Dremel", price: 4700, category: "Электроника", img: "https://avatars.mds.yandex.net/get-mpic/18322766/2a0000019c281717bea80c369863fff91045/orig" },
    { id: 29, name: "Рулетка лазерная (дальномер)", price: 3100, category: "Измерительные приборы", img: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/1720395415/100016071583b2.jpg" },
    { id: 30, name: "Зарядное устройство для АКБ", price: 2800, category: "Расходники", img: "https://avatars.mds.yandex.net/get-mpic/14688430/2a00000197c1aea61121d4b10459ce4d64b7/orig" }
];




const grid = document.getElementById('product-grid');
const searchInput = document.getElementById('searchInput');

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

function showToast(message, isError = false) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.style.cssText = `
        background: ${isError ? '#dc3545' : '#28a745'};
        color: white; 
        padding: 15px 25px; 
        border-radius: 10px;
        margin-top: 10px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: bold; 
        animation: slideIn 0.4s ease-out;
        font-family: sans-serif;
        opacity: 1;
        transition: opacity 0.8s ease;
    `;
    
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { if (toast.parentNode) toast.remove(); }, 800);
    }, 4000);
}

function showConfirm(title, message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('custom-confirm');
        if (!modal) return resolve(false);
        document.getElementById('confirm-title').innerText = title;
        document.getElementById('confirm-message').innerText = message;
        modal.style.display = 'flex';
        
        document.getElementById('confirm-ok').onclick = (e) => {
            e.preventDefault();
            modal.style.display = 'none';
            resolve(true);
        };
        document.getElementById('confirm-cancel').onclick = (e) => {
            e.preventDefault();
            modal.style.display = 'none';
            resolve(false);
        };
    });
}

// 1. ОТОБРАЖЕНИЕ
function displayProducts(items) {
    if (!grid) return;
    const favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
    grid.innerHTML = items.map(item => {
        const isFav = favorites.includes(item.id);
        return `
        <div class="product-card">
            <div style="text-align: right; margin-bottom: -25px; position: relative; z-index: 2;">
                <span onclick="toggleFavorite(${item.id})" style="cursor: pointer; font-size: 1.6rem; color: ${isFav ? '#ffc107' : '#ccc'}; transition: 0.2s;">
                    ${isFav ? '★' : '☆'}
                </span>
            </div>
            <div class="product-image" style="height: 180px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 10px;">
                <img src="${item.img}" alt="${item.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            <h3 style="font-size: 1rem; height: 2.5rem; overflow: hidden;">${item.name}</h3>
            <p style="color: #666; font-size: 0.8rem;">${item.category}</p>
            <p style="color: #054181; font-weight: bold; font-size: 1.2rem;">${item.price.toLocaleString()} ₽</p>
            <button type="button" onclick="makePurchase(event, '${item.name}', ${item.price})" style="background: #28a745; color: white; border: none; padding: 10px; border-radius: 5px; width: 100%; cursor: pointer; font-weight: bold;">Купить</button>
        </div>
    `}).join('');
}

// 2. ПОКУПКА
async function makePurchase(event, itemName, price) {
    // БЛОКИРУЕМ ПЕРЕЗАГРУЗКУ
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const username = localStorage.getItem('currentUser');
    if (!username) {
        showToast("Войдите в аккаунт!", true);
        return;
    }

    const confirmed = await showConfirm("Подтверждение", `Купить "${itemName}"?`);

    if (confirmed) {
        try {
            // ИСПРАВЛЕННАЯ СТРОКА С ОБРАТНЫМИ КАВЫЧКАМИ:
            const response = await fetch(`${API_URL}/buy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, price, itemName })
            });
            const result = await response.json();
            if (response.ok) {
                showToast(`✅ Успешно! Остаток: ${result.new_balance} ₽`);
            } else {
                showToast(`❌ ${result.error}`, true);
            }
        } catch (error) {
            showToast("⚠️ Ошибка сервера", true);
        }
    }
}


// 3. ИЗБРАННОЕ
function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
    const index = favorites.indexOf(productId);
    
    // Элементы из твоего index.html
    const notification = document.getElementById('fav-notification');
    const text = document.getElementById('fav-notification-text');

    if (index > -1) {
        // Если товар уже в избранном — удаляем его
        favorites.splice(index, 1);
        if (text) text.innerText = "Товар удален из избранного";
    } else {
        // Если товара нет — добавляем
        favorites.push(productId);
        if (text) text.innerText = "Товар добавлен в избранное";
    }

    localStorage.setItem('userFavorites', JSON.stringify(favorites));

    // --- АНИМАЦИЯ ПЛАШКИ ---
    if (notification) {
        // Убираем класс скрытия
        notification.classList.remove('fav-notification-hidden');
        
        // Ровно через 3 секунды добавляем класс скрытия обратно
        setTimeout(() => {
            notification.classList.add('fav-notification-hidden');
        }, 3000);
    }

    // Обновляем иконки звезд на странице
    displayProducts(products);
}

// 4. ПОИСК И КАТЕГОРИИ
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
        displayProducts(filtered);
    });
}

document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const cat = item.getAttribute('data-category');
        displayProducts(cat === 'все' ? products : products.filter(p => p.category === cat));
    });
});

// Анимации
const style = document.createElement('style');
style.innerHTML = `@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
document.head.appendChild(style);

// ЗАПУСК
displayProducts(products);
