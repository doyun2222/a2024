const leftImage = document.querySelector('.image.left');
const rightImage = document.querySelector('.image.right');
const leftDescriptionBox = document.querySelector('.description-box.right');
const rightDescriptionBox = document.querySelector('.description-box.left');
const banner = document.querySelector('.fixed-banner');

function hasScrollbar() {
    return document.body.scrollHeight > window.innerHeight;
}

window.addEventListener('scroll', () => {
    if (!hasScrollbar()) return;

    const scrollY = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / scrollHeight;

    // 첫 번째 섹션 동작: 왼쪽 이미지, 오른쪽 설명 도형
    if (scrollProgress < 0.5) {
        const progress = scrollProgress / 0.5;

        // 왼쪽 이미지: 왼쪽으로 사라짐
        leftImage.style.opacity = 1 - progress;
        leftImage.style.transform = `translateX(${-50 - progress * 50}%)`;

        // 오른쪽 설명 도형: 오른쪽에서 나타남
        leftDescriptionBox.style.opacity = 1 - progress
        leftDescriptionBox.style.transform = `translateX(${0 + progress * 50}%) translateY(-50%)`;
    } else {
        leftImage.style.opacity = 0;
        leftDescriptionBox.style.opacity = 0;
    }

    // 두 번째 섹션 동작: 오른쪽 이미지, 왼쪽 설명 도형
    if (scrollProgress > 0.5) {
        const progress = (scrollProgress - 0.5) / 0.5;

        // 오른쪽 이미지: 오른쪽으로 사라짐
        rightImage.style.opacity = Math.min(progress, 1);
        rightImage.style.transform = `translateX(${200 - progress * 50}%)`;

        // 왼쪽 설명 도형: 왼쪽에서 나타남
        rightDescriptionBox.style.opacity = progress;
        rightDescriptionBox.style.transform = `translateX(${-100 + progress * 100}%) translateY(-50%)`;
    } else {
        rightImage.style.opacity = 0;
        rightDescriptionBox.style.opacity = 0;
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
