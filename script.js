const banner = document.querySelector('.fixed-banner');

// 모든 이미지와 설명 도형 요소 선택
const images = document.querySelectorAll('.image');
const descriptionBoxes = document.querySelectorAll('.description-box');

// Intersection Observer 설정
const observerOptions = {
    root: null, // 뷰포트를 기준으로 관찰
    threshold: 0.1 // 요소가 10% 이상 보일 때 콜백 호출
};

// Observer 콜백 함수
const observerCallback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // 요소가 화면에 보이면 'visible' 클래스 추가
            entry.target.classList.add('visible');
        } else {
            // 요소가 화면에서 사라지면 'visible' 클래스 제거
            entry.target.classList.remove('visible');
        }
    });
};

// Intersection Observer 생성
const observer = new IntersectionObserver(observerCallback, observerOptions);

// 이미지와 설명 도형에 Observer 연결
[...images, ...descriptionBoxes].forEach((element) => {
    observer.observe(element);
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
