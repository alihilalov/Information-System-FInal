//Task 2.⁠ ⁠Adding a slider or images using HTML, CSS, and JavaScript


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

// Task 5.⁠ ⁠Implementing basket or wishlist logic using HTML, CSS, and JavaScript
// js/script.js

// In-memory stores
const cart = [];
const wishlist = [];

// --- Helpers ---
function formatMoney(amount) {
    return amount.toFixed(2);
}

function updateCartCount() {
    document.querySelector('.cart-count').textContent =
        cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateWishlistCount() {
    document.querySelector('.wishlist-count').textContent =
        wishlist.length;
}

// --- Render UIs ---
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
        <span>${item.name} × ${item.qty}</span>
        <span class="item-price">$${formatMoney(item.price * item.qty)}</span>
        <button onclick="removeFromCart(${idx})">Remove</button>
      `;
            container.appendChild(div);
        });
    }

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    document.getElementById('cartTotal').textContent = formatMoney(total);
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

// --- Cart & Wishlist Operations ---
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
        // Grab name from product card dynamically
        const card = document.querySelector(`.product-card:nth-child(${id}) .product-info h3`);
        const name = card ? card.textContent : `Item ${id}`;
        wishlist.push({ id, name });
    }
    updateWishlistCount();
    updateWishlistUI();
}

// --- Sidebar Toggles (keep UI fresh on open) ---
function toggleCart() {
    updateCartCount();
    updateCartUI();
    document.getElementById('cartSidebar').classList.toggle('active');
}

function toggleWishlist() {
    updateWishlistCount();
    updateWishlistUI();
    document.getElementById('wishlistSidebar').classList.toggle('active');
}

// --- Slider + Smooth Scroll Init ---
function initSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

let slideIndex = 1;
function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// --- DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    // Slider
    showSlides(slideIndex);
    document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
    document.querySelector('.next').addEventListener('click', () => changeSlide(1));
    document.querySelectorAll('.dot').forEach((dot, i) =>
        dot.addEventListener('click', () => currentSlide(i + 1))
    );
    setInterval(() => changeSlide(1), 5000);

    // Smooth scroll
    initSmoothScroll();

    // Cart & Wishlist initial render
    updateCartCount();
    updateWishlistCount();
    updateCartUI();
    updateWishlistUI();
});
