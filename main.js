// No canvas logic needed. Using native CSS mix-blend-mode.
// Initial load ready
// Initialize Lucide icons
lucide.createIcons();
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

const toggleMenu = (show) => {
    if(!mobileMenu) return;
    mobileMenu.classList.toggle('translate-x-full', !show);
    mobileMenu.classList.toggle('translate-x-0', show);
    document.body.style.overflow = show ? 'hidden' : '';
};

if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
if(closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMenu(false));
mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

// Navbar scroll logic
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const navCta = document.getElementById('nav-cta');
const navLogo = document.getElementById('nav-logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('glass-nav', 'py-3', 'text-zinc-900');
        navbar.classList.remove('py-4', 'text-white', 'border-transparent');
        navCta.classList.add('bg-zinc-900', 'text-white');
        navCta.classList.remove('bg-white', 'text-black');
        if(mobileMenuBtn) {
            mobileMenuBtn.classList.add('text-zinc-900');
            mobileMenuBtn.classList.remove('text-white');
        }
    } else {
        navbar.classList.remove('glass-nav', 'py-3', 'text-zinc-900');
        navbar.classList.add('py-4', 'text-white', 'border-transparent');
        navCta.classList.remove('bg-zinc-900', 'text-white');
        navCta.classList.add('bg-white', 'text-black');
        if(mobileMenuBtn) {
            mobileMenuBtn.classList.remove('text-zinc-900');
            mobileMenuBtn.classList.add('text-white');
        }
    }
});

// Gallery — static layout (cards in HTML)
const galleryImages = [
    'imagenes/gallery_01_portrait.jpg',
    'imagenes/gallery_03_waiting.jpg',
    'imagenes/gallery_02_coffee.jpg',
    'imagenes/gallery_05_evening.jpg',
];

document.querySelectorAll('.gallery-card').forEach((card) => {
    const index = parseInt(card.dataset.index, 10);
    card.addEventListener('click', () => openLightbox(index));
});

// Lightbox Logic
let currentLightboxIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxImg.src = galleryImages[index];
    lightbox.classList.remove('hidden');
    // small delay for transition
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightbox.classList.add('flex');
    }, 10);
    document.body.style.overflow = 'hidden'; // prevent background scrolling
}

function closeLightbox() {
    lightbox.classList.add('opacity-0');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    }, 300);
    document.body.style.overflow = '';
}

function showNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentLightboxIndex];
}

function showPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentLightboxIndex];
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if(lightbox.classList.contains('hidden')) return;
        if(e.key === 'Escape') closeLightbox();
        if(e.key === 'ArrowRight') showNext();
        if(e.key === 'ArrowLeft') showPrev();
    });
}

// Re-initialize Lucide for dynamic elements
lucide.createIcons();
