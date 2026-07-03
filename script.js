// ==========================================
// ============ COMPLETE SCRIPT.JS ==========
// ==========================================

// ---------- LOADING SCREEN ----------
window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1000);
});

// ---------- AOS INITIALIZATION ----------
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 400,
        offset: 50,
        delay: 0,
        easing: 'ease-out',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom',
        disable: false
    });
});

// ---------- NIGHT MODE TOGGLE ----------
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('nightModeToggle');
    const body = document.body;
    let isNightMode = false;

    const savedMode = localStorage.getItem('velocitaNightMode');
    if (savedMode === 'true') {
        isNightMode = true;
        body.classList.add('night-mode');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        toggleBtn.style.background = 'rgba(255, 215, 0, 0.15)';
        toggleBtn.style.borderColor = 'rgba(255, 215, 0, 0.3)';
        toggleBtn.style.color = '#ffd700';
    }

    toggleBtn.addEventListener('click', function () {
        isNightMode = !isNightMode;

        if (isNightMode) {
            body.classList.add('night-mode');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            toggleBtn.style.background = 'rgba(255, 215, 0, 0.15)';
            toggleBtn.style.borderColor = 'rgba(255, 215, 0, 0.3)';
            toggleBtn.style.color = '#ffd700';
            localStorage.setItem('velocitaNightMode', 'true');
        } else {
            body.classList.remove('night-mode');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            toggleBtn.style.background = '';
            toggleBtn.style.borderColor = '';
            toggleBtn.style.color = '';
            localStorage.setItem('velocitaNightMode', 'false');
        }
    });
});

// ---------- SIDEBAR TOGGLE (FIXED - MENU disappears) ----------
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Hide the MENU button when sidebar opens
        menuBtn.classList.add('hide');
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        // Show the MENU button when sidebar closes
        menuBtn.classList.remove('hide');
    }

    menuBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
});

// ---------- BACK TO TOP ----------
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ---------- DYNAMIC COUNTERS ----------
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;
    const statsSection = document.querySelector('.stats-section');

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const speed = 100;

            const updateCount = () => {
                const inc = Math.ceil(target / speed);
                if (count < target) {
                    count = Math.min(count + inc, target);
                    counter.innerText = count;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                    if (!counter.innerHTML.includes('+')) {
                        counter.innerHTML = target + '+';
                    }
                }
            };
            updateCount();
        });
    }

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(statsSection);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(statsSection);
    } else {
        setTimeout(startCounters, 600);
    }
});

// ---------- CAROUSEL AUTO PLAY ----------
document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 3000,
            wrap: true,
            pause: 'hover'
        });
    });
});