// 1. Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loading');
    if (!loader) return;

    gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }
    });
});

// 2. Modal Functions (Dynamic & Null Safe)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        const modalContent = modal.querySelector('.modal-content') || modal.children[0];
        if (modalContent) {
            modalContent.classList.add('scale-100', 'opacity-100');
        }
    }, 100);
}

window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-content') || modal.children[0];
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

// 3. DOM Loaded Handling
document.addEventListener('DOMContentLoaded', function () {
    // 4. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('-translate-y-full');
            mobileMenu.classList.toggle('translate-y-0');
        });

        // Tutup menu saat klik link
        document.querySelectorAll('.mobile-menu-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 5. Smooth Scroll & Scroll Animations (AOS)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // 6. Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.remove('opacity-0', 'invisible');
            } else {
                backToTop.classList.add('opacity-0', 'invisible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 7. Ripple Effect for Buttons
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

    // 10. Particles.js Initialization (Mobile Safety Check)
    if (window.innerWidth > 768 && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50 },
                size: { value: 3 },
                color: "#C68642"
            }
        });
    }
});