// Menu Items Data
const menuItems = [
    {
        id: 1,
        name: "Poke Bowl",
        category: "main",
        price: 15.99,
        image: "./first.jpg",
        description: "Fresh and healthy poke bowl with your choice of protein"
    },
    {
        id: 2,
        name: "Breakfast Special",
        category: "starters",
        price: 12.99,
        image: "./second.jpg",
        description: "Delicious breakfast spread with eggs, toast, and fresh fruits"
    },
    {
        id: 3,
        name: "French Toast",
        category: "starters",
        price: 9.99,
        image: "./third.jpg",
        description: "Classic French toast with maple syrup and fresh berries"
    },
    {
        id: 4,
        name: "Salmon Dish",
        category: "main",
        price: 24.99,
        image: "./fourth.jpg",
        description: "Grilled salmon with seasonal vegetables"
    },
    {
        id: 5,
        name: "Pizza",
        category: "main",
        price: 18.99,
        image: "./fifth.jpg",
        description: "Hand-tossed pizza with premium toppings"
    },
    {
        id: 6,
        name: "Fruits & Pastries",
        category: "desserts",
        price: 8.99,
        image: "./sixth.jpg",
        description: "Fresh fruit platter with assorted pastries"
    },
    {
        id: 7,
        name: "Burger",
        category: "main",
        price: 14.99,
        image: "./seventh.jpg",
        description: "Juicy beef burger with special sauce"
    },
    {
        id: 8,
        name: "Spaghetti Carbonara",
        category: "main",
        price: 16.99,
        image: "./eighth.jpg",
        description: "Classic Italian pasta with creamy sauce"
    },
    {
        id: 9,
        name: "Penne Pasta",
        category: "main",
        price: 15.99,
        image: "./ninth.jpg",
        description: "Al dente penne with rich tomato sauce"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const menuGrid = document.querySelector('.menu-grid');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total-amount');
const cartCount = document.getElementById('cart-count');
const closeModal = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout-btn');
const reservationForm = document.getElementById('reservation-form');

// Display menu items
function displayMenuItems(category = 'all') {
    menuGrid.innerHTML = '';
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        
        // Create image element with error handling
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.onerror = function() {
            this.src = 'placeholder.jpg'; // Fallback image if the original fails to load
            this.onerror = null; // Prevent infinite loop
        };

        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price">$${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        
        // Insert image at the beginning of the menu item
        menuItem.insertBefore(img, menuItem.firstChild);
        menuGrid.appendChild(menuItem);
    });
}

// Add to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        cart.push(item);
        updateCartCount();
        showNotification('Item added to cart!');
    }
}

// Update cart count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Show cart modal
function showCart() {
    cartModal.style.display = 'block';
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Create image element with error handling
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.onerror = function() {
            this.src = 'placeholder.jpg'; // Fallback image if the original fails to load
            this.onerror = null; // Prevent infinite loop
        };

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        
        // Insert image at the beginning of the cart item
        cartItem.insertBefore(img, cartItem.firstChild);
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDisplay();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayMenuItems(button.dataset.category);
    });
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Order placed successfully!');
    cart = [];
    updateCartCount();
    updateCartDisplay();
    cartModal.style.display = 'none';
});

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Reservation submitted successfully!');
    reservationForm.reset();
});

// Initialize menu display
displayMenuItems();

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 