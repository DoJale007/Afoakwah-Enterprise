document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade-in observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // MAIN FIX: Contact Form with AJAX + Success Popup
    const contactForm = document.getElementById('contactForm');
    const successPopup = document.getElementById('successPopup');
    const popupName = document.getElementById('popupName');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Show loading
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // SUCCESS: Show popup with name
                const name = document.getElementById('name').value.trim().split(' ')[0] || 'Customer';
                popupName.textContent = name;
                successPopup.classList.add('active');  // Smooth show
                contactForm.reset();
            } else {
                alert('Error sending message. Please try WhatsApp or call us.');
            }
        } catch (err) {
            alert('No internet. Please check your connection and try again.');
        } finally {
            // Hide loading
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    // Close popup function
    window.closePopup = function () {
        successPopup.classList.remove('active');
    };

    // Close on overlay click or ESC
    successPopup.addEventListener('click', (e) => {
        if (e.target === successPopup) closePopup();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });

    console.log('Afoakwah Ernest Enterprise Website – Fully Functional!');
});