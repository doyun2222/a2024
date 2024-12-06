document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.fixed-banner');
    const galleryImages = document.querySelectorAll('.gallery-container img');

    // 모든 이미지와 설명 도형 요소 선택
    const images = document.querySelectorAll('.merged .image');
    const descriptionBoxes = document.querySelectorAll('.merged .description-box');

    // Intersection Observer 설정
    const observerOptions = {
        root: null,
        threshold: 0.2,
    };

    // Observer 콜백 함수
    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('gallery-container')) {
                    entry.target.classList.add('gallery-visible');
                } else {
                    entry.target.classList.add('visible');
                }
            } else {
                if (entry.target.classList.contains('gallery-container')) {
                    entry.target.classList.remove('gallery-visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            }
        });
    };

    // Intersection Observer 생성
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 이미지와 설명 도형, 갤러리 이미지에 Observer 연결
    [...images, ...descriptionBoxes, ...galleryImages].forEach((element) => {
        observer.observe(element);
    });

    // 배너 크기 조정 애니메이션
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 0) {
                    banner.classList.add('shrink');
                } else {
                    banner.classList.remove('shrink');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
});
