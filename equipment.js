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