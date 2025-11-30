function loadCart() {
    const cart = JSON.parse(localStorage.getItem('neonCart')) || [];
    console.log('Загружена корзина:', cart);
    
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        totalPrice.textContent = '0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        html +=` 
            <div class="cart-item">
                <div class="item-content">
                    <strong>${item.name}</strong>
                    <div class="item-price">${item.price}</div>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">×</button>
            </div>`
        ;
        
        if (item.price && item.price.includes('₽')) {
            const priceNumber = parseInt(item.price.replace('₽', '').replace(/\s/g, ''));
            if (!isNaN(priceNumber)) {
                total += priceNumber;
            }
        }
    });
    
    cartItems.innerHTML = html;
    totalPrice.textContent = total;
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('neonCart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('neonCart', JSON.stringify(cart));
    loadCart(); 
}

function clearCart() {
    localStorage.removeItem('neonCart');
    loadCart();
}

window.addEventListener('DOMContentLoaded', loadCart);