// 상단 고정 배너 크기 조절
const banner = document.querySelector('.portfolio-banner');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        banner.classList.add('shrink'); // 스크롤 시 배너 축소
    } else {
        banner.classList.remove('shrink'); // 최상단으로 돌아오면 원래 크기로
    }
});
