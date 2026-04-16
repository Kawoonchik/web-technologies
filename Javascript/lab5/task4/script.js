const productsMap = new Map();
const ordersSet = new Set();
const productHistoryWeakMap = new WeakMap();
const orderedProductsWeakSet = new WeakSet();

let nextProductId = 1;
const outputDiv = document.getElementById('output');

function log(message) {
    outputDiv.textContent += `> ${message}\n`;
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function addProduct(name, price, quantity) {
    const id = nextProductId++;
    const product = { id, name, price, quantity };
    
    productsMap.set(id, product);
    productHistoryWeakMap.set(product, [`Створено з ціною ${price} та кількістю ${quantity}`]);
    
    log(`Додано: [ID: ${id}] ${name} (Ціна: ${price}, К-сть: ${quantity})`);
    return id;
}

function deleteProduct(id) {
    if (productsMap.has(id)) {
        const product = productsMap.get(id);
        const name = product.name;
        productsMap.delete(id);
        log(`Видалено продукт: ${name}`);
    } else {
        log(`Помилка: Продукт з ID ${id} не знайдено.`);
    }
}

function updateProduct(id, newPrice, newQuantity) {
    if (productsMap.has(id)) {
        const product = productsMap.get(id);
        const history = productHistoryWeakMap.get(product);
        
        product.price = newPrice;
        product.quantity = newQuantity;
        
        history.push(`Оновлено: нова ціна ${newPrice}, кількість ${newQuantity}`);
        
        log(`Оновлено: [ID: ${id}] ${product.name}`);
    }
}

function searchProductByName(name) {
    let found = false;
    for (const product of productsMap.values()) {
        if (product.name.toLowerCase() === name.toLowerCase()) {
            log(`Знайдено: [ID: ${product.id}] ${product.name} (Ціна: ${product.price}, Залишок: ${product.quantity})`);
            
            if (orderedProductsWeakSet.has(product)) {
                log(` - Цей товар вже замовляли раніше.`);
            }
            
            const history = productHistoryWeakMap.get(product);
            if (history) {
                log(` - Історія змін: ${history.join(' -> ')}`);
            }
            found = true;
        }
    }
    
    if (!found) {
        log(`Продукт з назвою "${name}" не знайдено.`);
    }
}

function placeOrder(productId, orderQuantity) {
    if (productsMap.has(productId)) {
        const product = productsMap.get(productId);
        
        if (product.quantity >= orderQuantity) {
            product.quantity -= orderQuantity;
            
            const order = {
                orderId: Date.now(),
                product: product.name,
                quantity: orderQuantity,
                date: new Date().toLocaleString()
            };
            
            ordersSet.add(order);
            orderedProductsWeakSet.add(product);
            
            const history = productHistoryWeakMap.get(product);
            history.push(`Замовлено ${orderQuantity} шт. Залишок: ${product.quantity}`);
            
            log(`Успішне замовлення. Куплено ${orderQuantity} шт "${product.name}".`);
        } else {
            log(`Помилка: Недостатньо товару "${product.name}" на складі. В наявності: ${product.quantity}`);
        }
    } else {
        log(`Помилка: Продукт з ID ${productId} не знайдено.`);
    }
}

addProduct("Спатіфілум", 350, 15);
addProduct("Фікус", 500, 5);
addProduct("Монстера", 850, 2);

document.getElementById('btn-add').addEventListener('click', () => {
    const name = document.getElementById('add-name').value;
    const price = Number(document.getElementById('add-price').value);
    const qty = Number(document.getElementById('add-qty').value);
    
    if (name && price > 0 && qty >= 0) {
        addProduct(name, price, qty);
    }
});

document.getElementById('btn-search').addEventListener('click', () => {
    const name = document.getElementById('search-name').value;
    if (name) {
        searchProductByName(name);
    }
});

document.getElementById('btn-order').addEventListener('click', () => {
    const id = Number(document.getElementById('order-id').value);
    const qty = Number(document.getElementById('order-qty').value);
    
    if (id > 0 && qty > 0) {
        placeOrder(id, qty);
    }
});