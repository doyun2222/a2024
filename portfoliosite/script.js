const banner = document.querySelector('.portfolio-banner');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        banner.classList.add('shrink');
    } else {
        banner.classList.remove('shrink');
    }
});
