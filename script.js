document.addEventListener('DOMContentLoaded', () => {
    // Navbar behavior on scroll
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        // Sticky/blur effect on scroll
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.65)';
            navbar.style.boxShadow = 'var(--glass-shadow)';
        }
        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // If it's mobile menu, close it
                if (document.querySelector('.nav-links').classList.contains('active')) {
                    document.querySelector('.nav-links').classList.remove('active');
                    document.querySelector('.mobile-menu-btn i').classList.replace('ph-x', 'ph-list');
                }
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinksInner = document.querySelectorAll('.nav-links a');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
                // Basic mobile styling applied via JS for simplicity, though CSS is better
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '100%';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.right = '0';
                navLinksContainer.style.background = 'rgba(255, 255, 255, 0.95)';
                navLinksContainer.style.backdropFilter = 'blur(10px)';
                navLinksContainer.style.padding = '20px';
                navLinksContainer.style.borderRadius = 'var(--radius-lg)';
                navLinksContainer.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                navLinksContainer.style.gap = '20px';
                navLinksContainer.style.textAlign = 'center';
            } else {
                icon.classList.replace('ph-x', 'ph-list');
                navLinksContainer.style.display = 'none';
            }
        });
        // Reset mobile menu style on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'row';
                navLinksContainer.style.position = 'static';
                navLinksContainer.style.background = 'transparent';
                navLinksContainer.style.boxShadow = 'none';
                navLinksContainer.style.padding = '0';
                navLinksContainer.classList.remove('active');
                mobileBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
            } else if (!navLinksContainer.classList.contains('active')) {
                navLinksContainer.style.display = 'none';
            }
        });
    }
    // Add subtle reveal animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const revealElements = document.querySelectorAll('.service-card, .industry-card, .lang-card, .section-header');
    // Add initial styles for animation
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0, 1)';
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // Add slight stagger to grids
    document.querySelectorAll('.services-grid, .industries-grid, .lang-grid').forEach(grid => {
        Array.from(grid.children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(child);
        });
    });
    document.querySelectorAll('.section-header').forEach(header => {
        observer.observe(header);
    });
});


document.addEventListener("DOMContentLoaded", function () {

  /* ================= EMAILJS INIT ================= */
  emailjs.init("RiRrzCZZxWTXXLfVs");

  /* ================= FORM SUBMIT ================= */
  const form = document.getElementById("contact-form");

  if(form){
    form.addEventListener("submit", function (e) {

      e.preventDefault();

      const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
      };

            const statusEl = document.getElementById('contact-status');

            function showStatus(message, type = 'success') {
                if (!statusEl) {
                    alert(message);
                    return;
                }
                statusEl.textContent = message;
                statusEl.classList.remove('success', 'error');
                statusEl.classList.add(type);
                // remove message after 6s
                clearTimeout(statusEl._hideTimeout);
                statusEl._hideTimeout = setTimeout(() => {
                    statusEl.textContent = '';
                    statusEl.classList.remove('success', 'error');
                }, 6000);
            }

            emailjs.send(
                "service_3jyl15h",
                "template_0zqutwa",
                params
            )
            .then(function () {
                showStatus("Message sent successfully! We'll reach out soon.", 'success');
                form.querySelectorAll('input, textarea').forEach(i => i.value = '');
            })
            .catch(function (error) {
                console.error(error);
                showStatus("Failed to send message. Please try again later.", 'error');
            });

    });
  }

});