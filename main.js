// Initialize Lucide icons
lucide.createIcons();

// ── Mobile Menu ────────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn  = document.getElementById('close-menu-btn');
const mobileMenu    = document.getElementById('mobile-menu');
const mobileLinks   = document.querySelectorAll('.mobile-link');

const toggleMenu = (show) => {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('translate-x-full', !show);
    mobileMenu.classList.toggle('translate-x-0', show);
    document.body.style.overflow = show ? 'hidden' : '';
};

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
if (closeMenuBtn)  closeMenuBtn.addEventListener('click',  () => toggleMenu(false));
mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

// ── Navbar Scroll ──────────────────────────────────────────────
const navbar       = document.getElementById('navbar');
const navCta       = document.getElementById('nav-cta');
const mobileMenuBtnEl = document.getElementById('mobile-menu-btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('glass-nav', 'py-3', 'text-zinc-900');
        navbar.classList.remove('py-4', 'text-white', 'border-transparent');
        navCta.classList.add('bg-zinc-900', 'text-white');
        navCta.classList.remove('bg-white', 'text-black');
        if (mobileMenuBtnEl) {
            mobileMenuBtnEl.classList.add('text-zinc-900');
            mobileMenuBtnEl.classList.remove('text-white');
        }
    } else {
        navbar.classList.remove('glass-nav', 'py-3', 'text-zinc-900');
        navbar.classList.add('py-4', 'text-white', 'border-transparent');
        navCta.classList.remove('bg-zinc-900', 'text-white');
        navCta.classList.add('bg-white', 'text-black');
        if (mobileMenuBtnEl) {
            mobileMenuBtnEl.classList.remove('text-zinc-900');
            mobileMenuBtnEl.classList.add('text-white');
        }
    }
}, { passive: true });

// ── Gallery — lightbox setup ───────────────────────────────────
const galleryImages = [
    'imagenes/gallery_01_portrait.jpg',
    'imagenes/gallery_03_waiting.jpg',
    'imagenes/gallery_02_coffee.jpg',
    'imagenes/gallery_05_evening.jpg',
    'imagenes/gallery_06_sofa.jpg',
    'imagenes/gallery_tablet.jpg',
    'imagenes/gallery_productos.jpg',
    'imagenes/gallery_mostrador.jpg',
    'imagenes/gallery_monster.jpg',
    'imagenes/gallery_bombilla.jpg',
];

document.querySelectorAll('.gallery-card').forEach((card) => {
    const index = parseInt(card.dataset.index, 10);
    card.addEventListener('click', () => openLightbox(index));
});

// ── Lightbox ───────────────────────────────────────────────────
let currentLightboxIndex = 0;
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev  = document.getElementById('lightbox-prev');
const lightboxNext  = document.getElementById('lightbox-next');

function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxImg.src = galleryImages[index];
    lightbox.classList.remove('hidden');
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightbox.classList.add('flex');
    }, 10);
    document.body.style.overflow = 'hidden';
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
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape')     closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft')  showPrev();
    });
}

// Re-init Lucide (ensures dynamically inserted icons render)
lucide.createIcons();

// ── Film Strip ─────────────────────────────────────────────────
(function () {
    const container = document.getElementById('film-container');
    if (!container) return;

    const images = [
        'imagenes/gallery_01_portrait.jpg',
        'imagenes/gallery_03_waiting.jpg',
        'imagenes/gallery_02_coffee.jpg',
        'imagenes/gallery_05_evening.jpg',
        'imagenes/gallery_06_sofa.jpg',
        'imagenes/gallery_tablet.jpg',
        'imagenes/gallery_productos.jpg',
        'imagenes/gallery_mostrador.jpg',
        'imagenes/gallery_monster.jpg',
        'imagenes/gallery_bombilla.jpg',
    ];

    const mobile = window.innerWidth < 768;
    const rows = [
        { cls: 'film-ltr',            dur: mobile ? '16s' : '30s' },
        { cls: 'film-rtl',            dur: mobile ? '22s' : '42s' },
        { cls: 'film-ltr film-slow',  dur: mobile ? '30s' : '56s' },
    ];

    rows.forEach(({ cls, dur }) => {
        const row   = document.createElement('div');
        row.className = 'filmstrip-row';

        const track = document.createElement('div');
        track.className = `filmstrip-track ${cls}`;
        track.style.animationDuration = dur;

        // double the set for seamless infinite loop
        [...images, ...images].forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'filmstrip-img';
            img.alt = '';
            img.draggable = false;
            track.appendChild(img);
        });

        row.appendChild(track);
        container.appendChild(row);
    });
})();

// ── Splash Screen ──────────────────────────────────────────────
(function () {
    const splash = document.getElementById('splash');
    if (!splash) return;

    // Block scroll while splash is active
    document.body.style.overflow = 'hidden';

    // Timing:
    //  0.35s  → logo starts writing  (1.55s duration)
    //  1.90s  → logo fully visible
    //  1.70s  → line starts growing  (0.7s duration)
    //  2.20s  → tagline fades in
    //  3.10s  → hold
    //  3.10s  → start fade-out (0.85s)
    setTimeout(() => {
        splash.classList.add('splash-exit');
        setTimeout(() => {
            splash.style.display = 'none';
            document.body.style.overflow = '';
        }, 900);
    }, 3100);
})();

// ── Scroll Reveal ──────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Gallery 3D Tilt ────────────────────────────────────────────
// Only on non-touch devices
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

document.querySelectorAll('.gallery-card').forEach(card => {
    if (isTouchDevice()) return;

    card.addEventListener('mouseenter', () => {
        // only tilt if already visible (revealed)
        if (!card.classList.contains('is-visible')) return;
        card.classList.add('tilt-active');
    });

    card.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('is-visible')) return;
        const rect = card.getBoundingClientRect();
        const xRel = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 to +0.5
        const yRel = (e.clientY - rect.top)  / rect.height - 0.5;
        const rotY =  xRel * 10;  // max ±5 deg
        const rotX = -yRel * 10;
        card.style.transform =
            `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('tilt-active');
        card.style.transform = '';
    });
});


// ── Barber Card 3D Tilt ────────────────────────────────────────
document.querySelectorAll('.barber-card:not(.barber-card--soon)').forEach(card => {
    if (isTouchDevice()) return;

    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('is-visible')) return;
        card.classList.add('tilt-active');
    });

    card.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('is-visible')) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform =
            `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02) translateZ(6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('tilt-active');
        card.style.transform = '';
    });
});

// ── Counter animation for prices (counts up on reveal) ────────
function animateCounter(el) {
    const target  = parseFloat(el.textContent.replace('€', '').replace(',', '.'));
    if (isNaN(target)) return;
    const duration = 900; // ms
    const start    = performance.now();
    const from     = target * 0.4;

    const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = from + (target - from) * eased;
        el.textContent = current.toFixed(2).replace('.', ',') + '€';
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(2).replace('.', ',') + '€';
    };
    requestAnimationFrame(tick);
}

const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        // price is the <span class="font-black"> inside the .group
        const priceSpan = entry.target.querySelector(':scope > div > span.font-black');
        if (priceSpan) animateCounter(priceSpan);
        priceObserver.unobserve(entry.target);
    });
}, { threshold: 0.4 });

document.querySelectorAll('#servicios .group.reveal').forEach(item => {
    priceObserver.observe(item);
});
