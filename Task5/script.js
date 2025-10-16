const products = [
    { id: 1,name: "Wireless Noise Cancelling Headphones",category: "audio",price: 299.99,rating: 4.7,image: "./images/headphones.jpg" },
    { id: 2,name: "Ultra Thin Smartwatch",category: "wearables",price: 199.50,rating: 4.2,image: "./images/smartwatch.jpg"},
    { id: 3, name: "Portable Bluetooth Speaker", category: "audio", price: 89.00, rating: 4.9, image: "./images/speaker.jpg" },
    { id: 4, name: "4K Webcam Pro", category: "tech", price: 125.00, rating: 4.5, image: "./images/webcam.jpg" },
    { id: 5, name: "Minimalist Ergonomic Mouse", category: "tech", price: 49.99, rating: 4.0, image: "./images/mouse.jpg" },
    { id: 6, name: "Smart Home Security Camera", category: "tech", price: 175.99, rating: 4.6, image: "./images/camera.jpg" },
    { id: 7, name: "Advanced Fitness Tracker", category: "wearables", price: 149.00, rating: 4.3, image: "./images/fitness-tracker.jpg" },
    { id: 8, name: "Classic Hi-Fi Turntable", category: "audio", price: 349.99, rating: 4.8, image: "./images/turntable.jpg" },
    { id: 9, name: "Mini 1080p Projector", category: "tech", price: 210.50, rating: 4.1, image: "./images/projector.jpg" },
    { id: 10, name: "Comfort Blue Light Glasses", category: "wearables", price: 35.00, rating: 4.4, image: "./images/glasses.jpg" },
];
let cart = [];
const cartButton = document.getElementById('cart-button');
const closeCartButton = document.getElementById('close-cart-button');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const body = document.body;

/**
 * Toggles the visibility of the cart sidebar.
 * @param {boolean} [open] - Explicitly set to true (open) or false (close). If undefined, toggles the current state.
 */
function toggleCart(open) {
    if (open === true) {
        body.classList.remove('cart-closed');
        body.classList.add('cart-open');
        cartOverlay.classList.remove('hidden');
    } else if (open === false) {
        body.classList.remove('cart-open');
        body.classList.add('cart-closed');
        cartOverlay.classList.add('hidden');
    } else {
        const isOpen = body.classList.toggle('cart-open');
        body.classList.toggle('cart-closed', !isOpen);
        cartOverlay.classList.toggle('hidden', !isOpen);
    }
}
/**
 * Adds a product to the cart or increments its quantity.
 * This function is exposed globally for HTML onclick calls.
 * @param {number} productId - The ID of the product to add.
 */
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
    toggleCart(true); 
}
/**
 * Updates the quantity of a cart item, removing it if quantity drops to zero.
 * This function is exposed globally for HTML onclick calls.
 * @param {number} productId - The ID of the cart item to update.
 * @param {number} change - The amount to change the quantity by (e.g., 1 or -1).
 */
window.updateQuantity = function(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    renderCart();
}
/**
 * Renders the contents of the shopping cart sidebar.
 */
function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total');
    const countElement = document.getElementById('cart-count');
    const emptyMessage = document.getElementById('empty-cart-message');

    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal
            const cartItemHTML = `
                <div class="flex items-start p-3 bg-gray-50 rounded-lg shadow-sm">
                    <img src="${item.image}" onerror="this.onerror=null; this.src='https://placehold.co/64x64/000/fff?text=Item'" alt="${item.name}" class="w-16 h-16 object-cover rounded-md mr-4">
                    <div class="flex-grow">
                        <p class="font-semibold text-gray-800">${item.name}</p>
                        <p class="text-sm text-indigo-600">$${item.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500">Total: $${itemTotal.toFixed(2)}</p>
                    </div>
                    <div class="flex flex-col items-center ml-2">
                        <button onclick="updateQuantity(${item.id}, 1)" class="text-indigo-500 hover:text-indigo-700 transition">+</button>
                        <span class="font-bold text-sm">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, -1)" class="text-red-500 hover:text-red-700 transition">-</button>
                    </div>
                </div>
            `;
            container.innerHTML += cartItemHTML;
        });
    }
    totalElement.textContent = `$${total.toFixed(2)}`;
    countElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}
/**
 * Renders the products to the main grid.
 * @param {Array} filteredProducts - The list of products to display.
 */
function renderProducts(filteredProducts = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    if (filteredProducts.length === 0) {
         grid.innerHTML = '<p class="col-span-full text-center text-gray-500 py-10">No products match your criteria.</p>';
         return;
    }
    filteredProducts.forEach(product => {
        const productCard = `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition duration-300">
                <div class="relative overflow-hidden h-48 bg-gray-100">
                    <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='https://placehold.co/400x300/000/fff?text=No+Image';" class="w-full h-full object-cover transition duration-500 transform hover:scale-105">
                </div>
                
                <div class="p-5 flex-grow">
                    <h4 class="text-xl font-bold text-gray-900 truncate">${product.name}</h4>
                    <p class="text-sm text-gray-500 mb-3 capitalize">${product.category} &middot; ${product.rating} <span class="text-yellow-500">★</span></p>
                    <div class="flex justify-between items-center mt-auto">
                        <p class="text-2xl font-extrabold text-indigo-600">$${product.price.toFixed(2)}</p>
                        <button onclick="addToCart(${product.id})" class="text-sm font-semibold bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-150 transform hover:scale-105 shadow-md">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += productCard;
    });
}
/**
 * Filters products based on category and price range selected in the sidebar.
 * This function is exposed globally for HTML onchange calls.
 */
window.filterProducts = function() {
    const category = document.getElementById('category-filter').value;
    const maxPrice = parseFloat(document.getElementById('price-range').value);
    document.getElementById('price-value').textContent = `$${maxPrice}`;
    const sorted = getSortedProducts()
    const filtered = sorted.filter(p => {
        const categoryMatch = category === 'all' || p.category === category;
        const priceMatch = p.price <= maxPrice;
        return categoryMatch && priceMatch;
    });
    renderProducts(filtered);
}
/**
 * Sorts products based on the price sort dropdown.
 * This function is exposed globally for HTML onchange calls.
 */
window.sortProducts = function() {
    const sorted = getSortedProducts();
    const category = document.getElementById('category-filter').value;
    const maxPrice = parseFloat(document.getElementById('price-range').value);

    const filtered = sorted.filter(p => {
        const categoryMatch = category === 'all' || p.category === category;
        const priceMatch = p.price <= maxPrice;
        return categoryMatch && priceMatch;
    });
    renderProducts(filtered);
}
/**
 * Returns a sorted array of products based on the price-sort dropdown value.
 * @returns {Array} - The sorted product list.
 */
function getSortedProducts() {
    const sortType = document.getElementById('price-sort').value;
    let currentProducts = [...products];

    if (sortType === 'low-to-high') {
        currentProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-to-low') {
        currentProducts.sort((a, b) => b.price - a.price);
    }
    return currentProducts;
}
/**
 * Initializes the application, rendering the products and setting up event listeners.
 * This function is called immediately because the script is loaded at the end of the <body>.
 */
function initializeApp() {
    renderProducts();
    renderCart();

    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartButton) cartButton.addEventListener('click', () => toggleCart(true));
    if (closeCartButton) closeCartButton.addEventListener('click', () => toggleCart(false));
    if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));
    
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    if (priceRange && priceValue) {
        priceValue.textContent = `$${priceRange.value}`;
    }
}
initializeApp();