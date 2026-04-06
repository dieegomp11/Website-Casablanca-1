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

// Dynamic smooth scroll with navbar offset (works on any screen size)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
});

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

// Dynamic Gallery Loader
const galleryGrid = document.getElementById('gallery-grid');
const galleryImages = [
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600'
];

galleryImages.forEach((src, index) => {
    const card = document.createElement('div');
    card.className = 'img-card group cursor-pointer relative';
    card.innerHTML = `
        <div class="aspect-square bg-zinc-200 overflow-hidden group">
            <img 
                src="${src}" 
                alt="Barber style" 
                class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                loading="lazy"
            >
        </div>
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <i data-lucide="plus" class="text-white w-10 h-10"></i>
        </div>
    `;
    card.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(card);
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
