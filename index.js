
document.addEventListener("DOMContentLoaded", function() {
    // Get the modal and the close button
    var modal = document.getElementById("welcome-modal");
    var closeButton = document.querySelector(".close-button");

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none";
    }

    // Close the modal when the close button is clicked
    closeButton.addEventListener("click", closeModal);

    // Close the modal if the user clicks outside the modal content
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Automatically open the modal when the page loads
    modal.style.display = "flex";
});


let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addItemToCart(name, price, image) {
    const item = { name, price: parseFloat(price), image, quantity: 1 };
    const existingItem = cart.find(i => i.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    saveCartToStorage();
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsElement.innerHTML = ''; 
    let total = 0; // Initialize total

    // Display each item in the cart
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerHTML = `
            <div>
                <alt="${item.name}" width="50" class="me-2">
                ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="btn btn-danger btn-sm remove-item" data-name="${item.name}">Remove</button>
        `;
        cartItemsElement.appendChild(listItem);
        total += item.price * item.quantity; // Calculate total
    });

    // Update total display
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            cart = cart.filter(i => i.name !== name); // Remove item from cart
            saveCartToStorage(); // Update storage
            updateCartDisplay(); // Update display
        });
    });
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add event listeners for adding items to the cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        const image = this.previousElementSibling.src; // Get the image source
        addItemToCart(name, price, image);
    });
});

// Initial call to update cart display on page load
updateCartDisplay();

// JavaScript to handle Add to Cart button click and show alert
document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const itemPrice = this.getAttribute('data-price');
            alert(`You added ${itemName} to your shopping cart. Price: $${itemPrice}`);
        });
    });
});
