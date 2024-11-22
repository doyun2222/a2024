const banner = document.querySelector('.portfolio-banner');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        banner.classList.add('shrink');
    } else {
        banner.classList.remove('shrink');
    }
});


const apiUrl = "https://apis.data.go.kr/1051000/recruitment";
const apiKey = "pKNkTBCcfio%2B4XDb3xpeAScbhWpzcdlcXlYBMywYpX%2Bu0h9nUw1m3WekTcTneCAnG4KgnpW14Z7dXAjbT6tRmw%3D%3D";

function fetchJobListings() {
    const queryParams = `?serviceKey=${apiKey}&type=json&pageNo=1&numOfRows=10`;
    const url = apiUrl + queryParams;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); // 비동기 요청
    xhr.setRequestHeader("Accept", "application/json"); // JSON 데이터 수락

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log("API 응답 데이터:", response);
                renderJobListings(response);
            } else {
                console.error("에러 발생:", xhr.status, xhr.statusText);
                document.getElementById("job-listings").innerHTML = `<p>채용 정보를 가져오는 데 실패했습니다. ${xhr.statusText}</p>`;
            }
        }
    };

    xhr.send(); // 요청 전송
}

function renderJobListings(data) {
    const jobListingsContainer = document.getElementById("job-listings");
    jobListingsContainer.innerHTML = "";

    if (!data.response || !data.response.body || !data.response.body.items) {
        jobListingsContainer.innerHTML = "<p>채용공고가 없습니다.</p>";
        return;
    }

    data.response.body.items.forEach((job) => {
        const jobItem = document.createElement("div");
        jobItem.className = "job-item";
        jobItem.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>기관명:</strong> ${job.agencyName}</p>
            <p><strong>공고일자:</strong> ${job.postingDate}</p>
            <p><strong>마감일자:</strong> ${job.expirationDate}</p>
            <a href="${job.url}" target="_blank">공고 상세보기</a>
        `;
        jobListingsContainer.appendChild(jobItem);
    });
}

document.addEventListener("DOMContentLoaded", fetchJobListings);
