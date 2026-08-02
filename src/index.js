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

    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const particleCount = 15; // Reduced for better Chrome performance

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

// (Contact Form handler dihapus karena sekarang ditangani langsung oleh Formspree)

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

// ============================================
// DYNAMIC PAGINATION FOR BERITA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const beritaGrid = document.querySelector('.berita-grid');
    const paginationContainer = document.getElementById('pagination-container');
    
    if (beritaGrid && paginationContainer) {
        const itemsPerPage = 6;
        // Hanya ambil elemen dengan class berita-card
        const articles = Array.from(beritaGrid.querySelectorAll('.berita-card'));
        
        if (articles.length > itemsPerPage) {
            const totalPages = Math.ceil(articles.length / itemsPerPage);
            let currentPage = 1;

            function renderPage(page) {
                currentPage = page;
                
                // Show/hide articles
                articles.forEach((article, index) => {
                    const startIndex = (page - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    
                    if (index >= startIndex && index < endIndex) {
                        article.style.display = ''; // Kembalikan ke default display (flex/block dari CSS)
                    } else {
                        article.style.display = 'none'; // Sembunyikan
                    }
                });

                // Update pagination UI
                paginationContainer.innerHTML = '';
                
                // Prev button (Tampil jika bukan di halaman pertama)
                if (currentPage > 1) {
                    const prevBtn = document.createElement('a');
                    prevBtn.href = '#';
                    prevBtn.className = 'page-numbers next';
                    prevBtn.innerHTML = '&laquo;';
                    prevBtn.title = 'Sebelumnya';
                    prevBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        renderPage(currentPage - 1);
                        window.scrollTo({ top: beritaGrid.offsetTop - 100, behavior: 'smooth' });
                    });
                    paginationContainer.appendChild(prevBtn);
                }

                // Page numbers
                for (let i = 1; i <= totalPages; i++) {
                    const pageBtn = document.createElement('span');
                    pageBtn.className = 'page-numbers';
                    if (i === currentPage) {
                        pageBtn.classList.add('current');
                    } else {
                        pageBtn.style.cursor = 'pointer';
                        pageBtn.addEventListener('click', () => {
                            renderPage(i);
                            window.scrollTo({ top: beritaGrid.offsetTop - 100, behavior: 'smooth' });
                        });
                    }
                    pageBtn.textContent = i;
                    paginationContainer.appendChild(pageBtn);
                }

                // Next button (Tampil jika bukan di halaman terakhir)
                if (currentPage < totalPages) {
                    const nextBtn = document.createElement('a');
                    nextBtn.href = '#';
                    nextBtn.className = 'page-numbers next';
                    nextBtn.innerHTML = '&raquo;';
                    nextBtn.title = 'Selanjutnya';
                    nextBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        renderPage(currentPage + 1);
                        window.scrollTo({ top: beritaGrid.offsetTop - 100, behavior: 'smooth' });
                    });
                    paginationContainer.appendChild(nextBtn);
                }
            }

            // Inisialisasi halaman pertama
            renderPage(1);
        } else {
            // Jika artikel <= 6, sembunyikan container pagination agar bersih
            paginationContainer.style.display = 'none';
        }
    }
});

// ============================================
// AJAX NEWS MODAL SYSTEM
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const beritaLinks = document.querySelectorAll('.berita-link');
    
    if (beritaLinks.length === 0) return;

    // Create Modal HTML and inject into body
    const modalHTML = `
        <div class="news-modal-overlay" id="news-modal">
            <div class="news-modal-content">
                <button class="news-modal-close" id="news-modal-close">&times;</button>
                <div class="news-modal-body" id="news-modal-body">
                    <!-- Content will be injected here -->
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('news-modal');
    const modalBody = document.getElementById('news-modal-body');
    const modalCloseBtn = document.getElementById('news-modal-close');

    // Function to open modal and load content
    const openModal = async (url) => {
        // Show modal with loading state
        modalBody.innerHTML = '<div style="text-align:center; padding: 40px;"><div style="width: 40px; height: 40px; border: 4px solid var(--neutral-200); border-top-color: var(--primary-500); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div><p style="margin-top:16px;">Memuat berita...</p></div>';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const htmlText = await response.text();
            
            // Parse HTML to extract article content
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            
            // Extract the article wrapper
            const articleContent = doc.querySelector('.article-wrapper');
            
            if (articleContent) {
                modalBody.innerHTML = articleContent.outerHTML;

                // Adapt "Kembali ke ..." button based on which page the modal was opened from
                const backBtn = modalBody.querySelector('.article-footer a');
                if (backBtn) {
                    const isBeritaPage = window.location.pathname.includes('/berita');
                    backBtn.textContent = isBeritaPage ? '← Kembali ke Berita' : '← Kembali ke Beranda';
                    // Instead of navigating, just close the modal
                    backBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        closeModal();
                    });
                }
            } else {
                modalBody.innerHTML = '<p style="text-align:center;">Maaf, konten berita tidak dapat ditemukan.</p>';
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            modalBody.innerHTML = '<p style="text-align:center; color:red;">Gagal memuat berita. Periksa koneksi internet Anda.</p>';
        }
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
        // Optional: clear content after animation finishes
        setTimeout(() => {
            modalBody.innerHTML = '';
        }, 300);
    };

    // Attach click events to all news links
    beritaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Cek apakah link bukan href kosong atau #
            const url = link.getAttribute('href');
            if (url && url !== '#' && !url.startsWith('http')) {
                e.preventDefault();
                openModal(url);
            }
        });
    });

    // Close button event
    modalCloseBtn.addEventListener('click', closeModal);

    // Click outside modal content to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

