// Import CSS
import './style.css';

// ============================================
// NAVBAR — Scroll Effect & Mobile Toggle
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect (hanya untuk halaman dengan hero)
if (navbar && !navbar.classList.contains('navbar-solid')) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('open');
    });
});

// ============================================
// HERO — Floating Particles (only on pages with hero)
// ============================================
function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');

        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;

        container.appendChild(particle);
    }
}

createParticles();

// ============================================
// STATS — Counter Animation
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (!target) return;

        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// ============================================
// SCROLL REVEAL — Intersection Observer
// ============================================
function initReveal() {
    const revealTargets = document.querySelectorAll(
        '.nav-card, .info-card, .berita-card, .profile-card, .proker-item, .kontak-item, .kontak-form, .stats-row, .section-header'
    );

    revealTargets.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counter animation when stats row is visible
                if (entry.target.classList.contains('stats-row')) {
                    animateCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealTargets.forEach(el => observer.observe(el));
}

initReveal();

// ============================================
// CONTACT FORM — Basic Handler
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('pesan').value;

        console.log('Form submitted:', { nama, email, pesan });
        alert(`Terima kasih, ${nama}! Pesan Anda telah terkirim.`);
        contactForm.reset();
    });
}

console.log('✅ Website KKN 26 Posko 4 — Universitas Handayani Makassar loaded!');

// ============================================
// PRELOADER — Fade out when page is fully loaded
// ============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => preloader.remove(), 500);
    }
});
