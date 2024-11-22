const banner = document.querySelector('.portfolio-banner');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        banner.classList.add('shrink');
    } else {
        banner.classList.remove('shrink');
    }
});


const apiUrl = "https://apis.data.go.kr/1051000/recruitment";
const apiKey =
    "pKNkTBCcfio%2B4XDb3xpeAScbhWpzcdlcXlYBMywYpX%2Bu0h9nUw1m3WekTcTneCAnG4KgnpW14Z7dXAjbT6tRmw%3D%3D";

function fetchJobListings() {
    const queryParams = `?serviceKey=${apiKey}&resultType=json&pageNo=1&numOfRows=10`;
    const url = apiUrl + queryParams;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); // 비동기 요청
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log("응답 상태 코드:", xhr.status); // 상태 코드 확인
            console.log("응답 본문:", xhr.responseText); // 응답 데이터 확인

            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log("API 응답 데이터:", response);
                renderJobListings(response);
            } else {
                console.error("에러 발생:", xhr.status, xhr.statusText);
                document.getElementById("job-listings").innerHTML = `<p>채용 정보를 가져오는 데 실패했습니다. 상태 코드: ${xhr.status}, 에러: ${xhr.statusText}</p>`;
            }
        }
    };

    xhr.send(); // 요청 전송
}

function renderJobListings(data) {
    const jobListingsContainer = document.getElementById("job-listings");
    jobListingsContainer.innerHTML = "";

    if (!data.result || !data.result.length) {
        jobListingsContainer.innerHTML = "<p>채용공고가 없습니다.</p>";
        return;
    }

    data.result.forEach((job) => {
        const jobItem = document.createElement("div");
        jobItem.className = "job-item";
        jobItem.innerHTML = `
            <h3>${job.item.recrutPbancTtl}</h3>
            <p><strong>기관명:</strong> ${job.item.instNm}</p>
            <p><strong>공고 시작일:</strong> ${job.item.pbancBgngYmd}</p>
            <p><strong>공고 종료일:</strong> ${job.item.pbancEndYmd}</p>
            <a href="${job.item.srcUrl}" target="_blank">공고 상세보기</a>
        `;
        jobListingsContainer.appendChild(jobItem);
    });
}

document.addEventListener("DOMContentLoaded", fetchJobListings);
