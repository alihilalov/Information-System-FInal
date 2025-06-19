// script.js

// 1. Slider / Hero Section
let slideIndex = 1;

function showSlides(n) {
    const slides = document.querySelectorAll('.slider-container .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach((slide, i) =>
        slide.classList.toggle('active', i === slideIndex - 1)
    );
    dots.forEach((dot, i) =>
        dot.classList.toggle('active', i === slideIndex - 1)
    );
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// 2. Cart & Wishlist Data + UI Helpers
const cart = [];
const wishlist = [];

function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.length;
}

function updateWishlistCount() {
    document.querySelector('.wishlist-count').textContent = wishlist.length;
}

function updateCartUI() {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cart.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
        <span>${item.name} &times; ${item.qty}</span>
        <button onclick="removeFromCart(${idx})">Remove</button>
      `;
            container.appendChild(div);
        });
    }

    // update total
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function updateWishlistUI() {
    const container = document.getElementById('wishlistItems');
    container.innerHTML = '';

    if (wishlist.length === 0) {
        container.innerHTML = '<p class="empty-wishlist">Your wishlist is empty</p>';
    } else {
        wishlist.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'wishlist-item';
            div.innerHTML = `
        <span>${item.name}</span>
        <button onclick="toggleWishlistItem(${item.id})">Remove</button>
      `;
            container.appendChild(div);
        });
    }
}

function addToCart(id, name, price) {
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    updateCartCount();
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartUI();
}

function toggleWishlistItem(id) {
    const idx = wishlist.findIndex(i => i.id === id);
    if (idx > -1) {
        wishlist.splice(idx, 1);
    } else {
        // find name for display
        const card = document.querySelector(`.product-card:nth-child(${id}) .product-info h3`);
        const name = card ? card.textContent : `Item ${id}`;
        wishlist.push({ id, name });
    }
    updateWishlistCount();
    updateWishlistUI();
}

// 3. Sidebar Toggles
function toggleCartSidebar() {
    document.getElementById('cartSidebar').classList.toggle('active');
}
function toggleWishlistSidebar() {
    document.getElementById('wishlistSidebar').classList.toggle('active');
}

// Wire up cart/wishlist icons (since HTML onclick uses toggleCart/toggleWishlist)
function toggleCart() {
    toggleCartSidebar();
}
function toggleWishlist() {
    toggleWishlistSidebar();
}


// 4. Smooth‐scroll for nav anchors
function initSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}


// 5. DOMContentLoaded - initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Slider init
    showSlides(slideIndex);
    document.querySelector('.slider-nav .prev')
        .addEventListener('click', () => changeSlide(-1));
    document.querySelector('.slider-nav .next')
        .addEventListener('click', () => changeSlide(1));
    document.querySelectorAll('.slider-dots .dot')
        .forEach((dot, idx) => dot.addEventListener('click', () => currentSlide(idx + 1)));

    // Auto‐advance slides every 5s
    setInterval(() => changeSlide(1), 5000);

    // Smooth scroll nav
    initSmoothScroll();

    // Initial counts & UI
    updateCartCount();
    updateWishlistCount();
    updateCartUI();
    updateWishlistUI();
});
