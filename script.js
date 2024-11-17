const leftImage = document.querySelector('.image.left');
const rightImage = document.querySelector('.image.right');

window.addEventListener('load', () => {
    leftImage.style.opacity = 1;
    rightImage.style.opacity = 0;
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollY < windowHeight) {
        const progress = scrollY / windowHeight;
        leftImage.style.opacity = 1 - progress;
        leftImage.style.transform = `translateX(${-50 - progress * 50}%)`;
    } else {
        leftImage.style.opacity = 0;
    }

    if (scrollY > windowHeight / 2) {
        const progress = (scrollY - windowHeight / 2) / (windowHeight / 2);
        rightImage.style.opacity = Math.min(progress, 1);
        rightImage.style.transform = `translateX(${50 - progress * 50}%)`;
    } else {
        rightImage.style.opacity = 0;
    }
});

const banner = document.querySelector('.fixed-banner');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        banner.classList.add('shrink');
    } else {
        banner.classList.remove('shrink');
    }
});
