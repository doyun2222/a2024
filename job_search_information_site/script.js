const banner = document.querySelector('.portfolio-banner');

// 스크롤 이벤트 추가
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        banner.classList.add('shrink');
    } else {
        banner.classList.remove('shrink');
    }
});

const reqUrl = "https://apis.data.go.kr/1051000/recruitment/list";
const serviceKey = "pKNkTBCcfio+4XDb3xpeAScbhWpzcdlcXlYBMywYpX+u0h9nUw1m3WekTcTneCAnG4KgnpW14Z7dXAjbT6tRmw==";

// Tabulator 테이블 설정
const table = new Tabulator("#resultTable", {
    layout: "fitDataStretch",
    pagination: "local", // 데이터를 로컬로 페이징 처리
    paginationSize: 5, // 한 페이지에 표시할 행 수
    columns: [
        { title: "#", field: "recrutPblntSn" },
        { title: "상태", field: "ongoingYn" },
        { title: "공시기관", field: "pblntInstNm" },
        {
            title: "제목",
            field: "recrutPbancTtl",
            formatter: function (cell) {
                const id = cell.getRow().getData().recrutPblntSn; // 해당 행의 ID 가져오기
                if (id) {
                    return `<a href="https://doyun2222.github.io/a2024/job_search_information_site/detail.html?sn=${id}" target="_blank" style="text-decoration: underline; color: blue;">${cell.getValue()}</a>`;
                }
                return cell.getValue(); // ID가 없으면 일반 텍스트 반환
            }
        },
        { title: "시작일", field: "pbancBgngYmd" },
        { title: "종료일", field: "pbancEndYmd" },
        { title: "채용분야", field: "ncsCdNmLst" },
        { title: "고용형태", field: "hireTypeNmLst" },
        { title: "채용구분", field: "recrutSeNm" },
        { title: "채용인원", field: "recrutNope" },
        { title: "근무지", field: "workRgnNmLst" },
    ],
    rowFormatter: function (row) {
        row.getElement().style.cursor = "pointer"; // 마우스 커서 변경
    }
});

// 검색 버튼 클릭 시 API 요청 및 테이블 데이터 설정
document.getElementById("searchBtn").addEventListener("click", () => {
    const params = {
        serviceKey,
        acbgCondLst: document.getElementById("acbgCondLst").value || "",
        hireTypeLst: document.getElementById("hireTypeLst").value || "",
        instClsf: document.getElementById("instClsf").value || "",
        instType: document.getElementById("instType").value || "",
        ncsCdLst: document.getElementById("ncsCdLst").value || "",
        numOfRows: 1000,
        ongoingYn: document.getElementById("ongoingYn").value || "Y",
        pageNo: 1,
        pbancBgngYmd: document.getElementById("pbancBgngYmd").value || "",
        pbancEndYmd: document.getElementById("pbancEndYmd").value || "",
        pblntInstCd: document.getElementById("pblntInstCd").value || "",
        recrutPbancTtl: document.getElementById("recrutPbancTtl").value || "",
        recrutSe: document.getElementById("recrutSe").value || "",
        replmprYn: document.getElementById("replmprYn").value || "",
        resultType: "json",
        workRgnLst: document.getElementById("workRgnLst").value || "",
    };

    fetchData(params);
});

// API 데이터를 가져와서 Tabulator 테이블에 반영
function fetchData(params) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${reqUrl}?${queryString}`;

    fetch(fullUrl, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.result && data.result.length > 0) {
                const tableData = data.result.map((item) => ({
                    recrutPblntSn: item.recrutPblntSn || "정보 없음",
                    ongoingYn: item.ongoingYn || "정보 없음",
                    pblntInstNm: item.instNm || "정보 없음",
                    recrutPbancTtl: item.recrutPbancTtl || "정보 없음",
                    pbancBgngYmd: item.pbancBgngYmd || "정보 없음",
                    pbancEndYmd: item.pbancEndYmd || "정보 없음",
                    ncsCdNmLst: item.ncsCdNmLst || "정보 없음",
                    hireTypeNmLst: item.hireTypeNmLst || "정보 없음",
                    recrutSeNm: item.recrutSeNm || "정보 없음",
                    recrutNope: item.recrutNope || "정보 없음",
                    workRgnNmLst: item.workRgnNmLst || "정보 없음",
                }));
                table.setData(tableData); // Tabulator에 데이터 설정
            } else {
                document.getElementById("error").textContent = "조건에 맞는 데이터가 없습니다.";
                table.clearData(); // 테이블 데이터 초기화
            }
        })
        .catch((error) => {
            document.getElementById("error").textContent = `API 요청 실패: ${error.message}`;
        });
}
