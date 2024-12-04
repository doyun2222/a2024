const banner = document.querySelector('.portfolio-banner');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        banner.classList.add('shrink');
    } else {
        banner.classList.remove('shrink');
    }
});

// 모든 섹션 요소 가져오기
const sections = document.querySelectorAll('section');

// Intersection Observer 설정
const observerOptions = {
    root: null, // 뷰포트를 기준으로 관찰
    threshold: 0.1 // 요소가 10% 이상 보일 때만 반응
};

// Observer 콜백 함수
const sectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // 섹션이 화면에 보이면 'visible' 클래스 추가
            entry.target.classList.add('visible');
        } else {
            // 섹션이 화면에서 사라지면 'visible' 클래스 제거
            entry.target.classList.remove('visible');
        }
    });
};

// Intersection Observer 인스턴스 생성
const sectionObserver = new IntersectionObserver(sectionObserverCallback, observerOptions);

// 각 섹션을 Observer에 연결
sections.forEach((section) => {
    sectionObserver.observe(section);
});
