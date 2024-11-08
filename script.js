// 모든 "shape" 요소를 선택
const elements = document.querySelectorAll('.shape');

// Intersection Observer 설정
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // 요소가 화면에 보이면 'visible' 클래스 추가
        } else {
            entry.target.classList.remove('visible'); // 요소가 화면에서 사라지면 'visible' 클래스 제거
        }
    });
}, { threshold: 0.5 }); // 요소가 50% 이상 화면에 보일 때 트리거

// 요소들에 observer 연결
elements.forEach(element => observer.observe(element));

// 상단 고정 배너 크기 조절
const banner = document.querySelector('.fixed-banner');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        banner.classList.add('shrink'); // 스크롤이 내려가면 배너 축소
    } else {
        banner.classList.remove('shrink'); // 최상단으로 돌아가면 배너 원래 크기로 복귀
    }
});
