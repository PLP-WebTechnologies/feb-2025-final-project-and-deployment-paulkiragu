document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.length;

    updateCartCount();

    // Function to save cart to local storage and add image url 

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        cartCount = cart.length;
        document.getElementById('cart-count').textContent = cartCount;
    }

    function addToCart(name, price, imageUrl) {
        cart.push({ name, price, imageUrl });
        saveCart();
        updateCartCount();
        alert(`${name} added to cart!`);
    }

    // Show cart modal

    function showCart() {
        const cartModal = document.getElementById('cart-modal');
        const cartItemsList = document.getElementById('cart-items');
        const totalPriceDisplay = document.getElementById('total-price');

        cartItemsList.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            
            li.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
                <span class="cart-item-name">${item.name}</span>: ksh ${item.price}
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            
            cartItemsList.appendChild(li);
            totalPrice += item.price;
        });

        totalPriceDisplay.textContent = `Total: ksh ${totalPrice}`;
        cartModal.style.display = 'block';
    }

    // To complete the order function
    function completeOrder() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Order completed!');
        cart = [];
        saveCart();
        updateCartCount();
        document.getElementById('cart-modal').style.display = 'none';
    }

    function closeCart() {
        document.getElementById('cart-modal').style.display = 'none';
    }

    document.querySelectorAll('button[data-name]').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const imageUrl = this.getAttribute('data-image'); 
            addToCart(name, price, imageUrl);
        });
    });

    const cartIcon = document.getElementById('cart-icon');
    const closeCartBtn = document.getElementById('close-cart');
    const completeOrderBtn = document.getElementById('complete-order');

    if (cartIcon) cartIcon.addEventListener('click', showCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (completeOrderBtn) completeOrderBtn.addEventListener('click', completeOrder);

    // Remove item from cart
    document.getElementById('cart-items').addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            saveCart();
            updateCartCount();
            showCart(); 
        }
    });

    // Form validations  and  submission
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();  

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields.");
                return;
            }

            successMessage.style.display = "block";
            form.reset();
            setTimeout(function() {
                successMessage.style.display = "none";
            }, 3000);
        });
    }

// Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    if (hamburger && mobileMenu && overlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
});

  // Copy desktop nav links into mobile menu dynamically
  const navLinks = document.querySelector('.nav-links').cloneNode(true);
  navLinks.classList.remove('nav-links');
  navLinks.classList.add('mobile-nav-links');
  document.querySelector('.mobile-menu').appendChild(navLinks);

  // hero-section Image slider
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 4000);


