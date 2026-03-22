// =============================================
//  MEDHAA'S RAINBOW SCHOOL — script.js
// =============================================

/* ---------- Slideshow ---------- */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (slides.length > 0 && prevBtn && nextBtn) {
    let current = 0;
    let autoTimer = null;

    function showSlide(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function startAuto() {
        autoTimer = setInterval(() => showSlide(current + 1), 4000);
    }
    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }

    prevBtn.addEventListener('click', () => { showSlide(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', () => { showSlide(current + 1); resetAuto(); });
    dots.forEach(dot => dot.addEventListener('click', () => {
        showSlide(+dot.dataset.index); resetAuto();
    }));

    startAuto();
}

/* ---------- Mobile Nav Toggle ---------- */
const hamburger = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

/* ---------- Active Nav Link on Scroll ---------- */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(sec => observer.observe(sec));
