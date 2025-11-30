let cart = JSON.parse(localStorage.getItem('neonCart')) || [];
document.querySelectorAll('.by-card').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.parentElement;

        const lines = card.innerText.split('\n').filter(line => line.trim() !== '');
        const productName = lines[0];
        const productPrice = lines[1];

        console.log('Название:', productName);
        console.log('Цена:', productPrice);


        cart.push({
            name: productName,
            price: productPrice
        });


        localStorage.setItem('neonCart', JSON.stringify(cart));
        document.getElementById('cart-count').textContent = cart.length;

        this.textContent = 'Добавлено!';
        setTimeout(() => this.textContent = 'В корзину', 1000);
    });
});



function toggleSearch() {
    const searchContainer = document.querySelector('.search-container');
    searchContainer.classList.toggle('active');

    if (searchContainer.classList.contains('active')) {
        document.getElementById('search-input').focus();
    }
}

document.getElementById('search-input').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const products = document.querySelectorAll('.products');

    products.forEach(section => {
        const cards = section.querySelectorAll('.card');
        let foundInSection = false;

        cards.forEach(card => {
            const productName = card.innerText.split('\n')[0].toLowerCase();
            const category = card.getAttribute('data-category') || '';

            if (productName.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
                foundInSection = true;
            } else {
                card.style.display = 'none';
            }
        });

        section.style.display = foundInSection ? 'grid' : 'none';
    });
});


document.addEventListener('click', function (e) {
    if (!e.target.closest('.search-container') && !e.target.matches('.nav-right a')) {
        document.querySelector('.search-container').classList.remove('active');
    }
});