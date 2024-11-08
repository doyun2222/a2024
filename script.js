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
}, { threshold: 0.1 }); // 요소가 10% 이상 화면에 보일 때 트리거

// 요소들에 observer 연결
elements.forEach(element => observer.observe(element));
