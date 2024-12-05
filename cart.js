let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addItemToCart(name, price) {
    console.log(`Adding item to cart: ${name}, Price: ${price}`); // Debugging log
    const item = { name, price: parseFloat(price), quantity: 1 };
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    console.log(cart); // Check the cart after adding an item
    saveCartToStorage();
    updateCartDisplay();
    alert(`${name} has been added to your cart!`);
}

// Save cart to localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        alert('Error saving to storage: ' + e.message);
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
// Use event delegation to handle remove button clicks
document.getElementById('cart-items').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('remove-item')) {
        const name = event.target.getAttribute('data-name');
        removeItemFromCart(name);
    }
});
});

// Remove item from cart
function removeItemFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCartToStorage();
    updateCartDisplay();
    alert(`${name} will be removed from your cart.`);
}

// Update cart display
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    cartItemsElement.innerHTML = ''; // Clear current items
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <div>
                ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="btn btn-danger btn-sm remove-item" data-name="${item.name}">Remove</button>
        `;
        cartItemsElement.appendChild(listItem);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        // const image = this.getAttribute('data-image');
        
        // Debugging alert to check the values
        console.log(`Item clicked: ${name}, Price: ${price}`);

        if (!name || !price) {
            alert('Error: Missing item details.');
            return; // Exit if any attribute is missing
        }
        
        addItemToCart(name, price); // Call the function after the check
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    function updateCartDisplay() {
        cartItemsElement.innerHTML = ''; // Clear current items
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <div>
                    <alt="${item.name}" width="50" class="me-2">
                    ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="btn btn-danger btn-sm remove-item" data-name="${item.name}">Remove</button>
            `;
            cartItemsElement.appendChild(listItem);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    updateCartDisplay();
});

document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.querySelector('.btn.btn-dark');
    const modal = document.getElementById('checkoutModal');
    const closeModal = document.querySelector('.close');
    const form = document.querySelector('#checkoutModal form');

    // Show modal on button click
    checkoutButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close modal on clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal on clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission
        alert('Your purchase has been successful. Thank you for your purchase!');
        
        // Optional: Close the modal after showing the alert
        const modal = document.getElementById('checkoutModal');
        modal.style.display = 'none';

        // Optionally clear the cart and update display
        cart = [];
        saveCartToStorage();
        updateCartDisplay();
    });
});









