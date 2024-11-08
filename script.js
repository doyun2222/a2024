// 모든 "image-text" 요소를 선택
const elements = document.querySelectorAll('.image-text');

// Intersection Observer 설정
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // 화면에 보이면 visible 클래스 추가
        }
    });
}, { threshold: 0.1 }); // 요소가 10% 이상 화면에 보일 때 트리거

// 요소들에 observer 연결
elements.forEach(element => observer.observe(element));