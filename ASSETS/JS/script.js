// 1. Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loading');
    gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }
    });
});

// 2. Modal Functions (Modal 1 & 2)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modal with ID "${modalId}" not found`);
        return;
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        // Ganti .modal-enter dengan elemen pertama di dalam modal
        const modalContent = modal.children[0];
        if (modalContent) {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }
    }, 100);
}

window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modal with ID "${modalId}" not found`);
        return;
    }

    // Ganti .modal-enter dengan elemen pertama di dalam modal
    const modalContent = modal.children[0];
    if (modalContent) {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
    }

    setTimeout(() => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
};

// Tunggu DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scrolling untuk anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Cegah scroll default

            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip jika hanya #

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return; // Cegah error jika elemen tidak ditemukan

            // Scroll dengan animasi smooth
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Tutup mobile menu jika sedang terbuka
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// 3. Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('-translate-y-full');
    mobileMenu.classList.toggle('translate-y-0');
});

// 4. Smooth Scroll & Scroll Animations (AOS)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// 6. Coffee Cup Loading Animation (SVG)
gsap.to('.coffee-cup', {
    y: -10,
    repeat: -1,
    yoyo: true,
    ease: " power1.inOut", duration: 1.5
}); // 7. Ripple Effect for Buttons
document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = this.querySelector('.ripple-effect') || document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.backgroundColor = 'rgba(255,255,255,0.6)';
        this.appendChild(ripple);

        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(8)', opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        });

        setTimeout(() => ripple.remove(), 800);
    });
});

// 8. Modal Scroll Fix (Prevent Background Scroll)
document.querySelectorAll('[onclick^="openModal"]').forEach(button => {
    button.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('.modal-exit').forEach(button => {
    button.addEventListener('click', () => {
        document.body.style.overflow = 'auto';
    });
});

// 9. GSAP Scroll Animations
gsap.utils.toArray('.animate-on-scroll').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});