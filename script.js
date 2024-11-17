const leftImage = document.querySelector('.image.left');
const rightImage = document.querySelector('.image.right');
const banner = document.querySelector('.fixed-banner');

// 스크롤바 존재 여부 확인 함수
function hasScrollbar() {
    return document.body.scrollHeight > window.innerHeight;
}

window.addEventListener('load', () => {
    if (!hasScrollbar()) {
        leftImage.style.opacity = 1;
        leftImage.style.transform = 'translateX(0)';
        rightImage.style.opacity = 1;
        rightImage.style.transform = 'translateX(0)';
    } else {
        leftImage.style.opacity = 1;
        rightImage.style.opacity = 0;
    }
});

window.addEventListener('scroll', () => {
    if (!hasScrollbar()) return;

    const scrollY = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / scrollHeight; // 스크롤 진행 비율 (0 ~ 1)

    if (scrollProgress < 0.5) {
        const progress = scrollProgress / 0.5;
        leftImage.style.opacity = 1 - progress;
        leftImage.style.transform = `translateX(${-50 - progress * 50}%)`;
    } else {
        leftImage.style.opacity = 0;
    }

    if (scrollProgress > 0.5) {
        const progress = (scrollProgress - 0.5) / 0.5;
        rightImage.style.opacity = Math.min(progress, 1);
        rightImage.style.transform = `translateX(${50 - progress * 50}%)`;
    } else {
        rightImage.style.opacity = 0;
    }
});

// 배너 크기 조정 애니메이션
window.addEventListener('scroll', () => {
    if (!hasScrollbar()) return;

    if (window.scrollY > 0) {
        banner.classList.add('shrink');
    } else {
        banner.classList.remove('shrink');
    }
});
