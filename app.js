document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Contact Form Validation and Submission
     // Contact Form with Formspree AJAX & Popup
    const contactForm = document.getElementById('contactForm');
    const successPopup = document.getElementById('successPopup');
    const popupName = document.getElementById('popupName');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Submit to Formspree
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                // Show popup with user's name
                popupName.textContent = name;
                successPopup.style.display = 'flex';
                contactForm.reset();
            } else {
                alert('Sorry, there was an error. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Network error. Please check your connection.');
        }
    });

    // Close popup functions
    window.closePopup = function() {
        successPopup.style.display = 'none';
    };
    
    // Close on overlay click
    successPopup.addEventListener('click', function(e) {
        if (e.target === successPopup) {
            closePopup();
        }
    });

    // Floating WhatsApp click tracking (optional)
    document.querySelector('.whatsapp-float').addEventListener('click', function() {
        console.log('WhatsApp button clicked - redirecting to chat');
        
    });

    // Hero button click tracking
    document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Hero CTA clicked:', this.textContent.trim());
        });
    });

    // Gallery image click handler
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay p').textContent;
            console.log('Gallery image clicked:', title);
            
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        });

        // Observe gallery images
        document.querySelectorAll('.gallery-item img').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = `&copy; ${currentYear} Afoakwah Ernest Enterprise. All rights reserved.`;
    }

    console.log('Afoakwah Ernest Enterprise website loaded successfully!');
});