const banner = document.querySelector('.portfolio-banner');

// 스크롤 이벤트 추가
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        banner.classList.add('shrink');
    } else {
        banner.classList.remove('shrink');
    }
});

// 채용 정보 API URL 및 인증키
const recruitmentUrl = "https://apis.data.go.kr/1051000/recruitment/list";

// 채용정보 테이블 설정
const recruitmentTable = new Tabulator("#resultTable", {
    layout: "fitDataStretch",
    pagination: "local",
    paginationSize: 10,
    columns: [
        { title: "#", field: "recrutPblntSn" },
        { title: "상태", field: "ongoingYn" },
        { title: "공시기관", field: "pblntInstNm" },
        {
            title: "제목",
            field: "recrutPbancTtl",
            formatter: function (cell) {
                const id = cell.getRow().getData().recrutPblntSn;
                if (id) {
                    return `<a href="https://doyun2222.github.io/a2024/job_search_information_site/detail.html?sn=${id}" target="_blank" style="text-decoration: underline; color: blue;">${cell.getValue()}</a>`;
                }
                return cell.getValue();
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
});

// 채용정보 검색 버튼 이벤트
document.getElementById("searchBtn").addEventListener("click", () => {
    const params = {
        serviceKey: "pKNkTBCcfio+4XDb3xpeAScbhWpzcdlcXlYBMywYpX+u0h9nUw1m3WekTcTneCAnG4KgnpW14Z7dXAjbT6tRmw==",
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

    fetchRecruitmentData(params);
});

// 채용정보 API 호출 및 데이터 반영
function fetchRecruitmentData(params) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${recruitmentUrl}?${queryString}`;

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
                recruitmentTable.setData(tableData);
            } else {
                recruitmentTable.clearData();
                alert("조건에 맞는 데이터가 없습니다.");
            }
        })
        .catch((error) => {
            alert(`API 요청 실패: ${error.message}`);
        });
}

const companyUrl = "https://apis.data.go.kr/1051000/public_inst/list";
const serviceKey = "pKNkTBCcfio+4XDb3xpeAScbhWpzcdlcXlYBMywYpX+u0h9nUw1m3WekTcTneCAnG4KgnpW14Z7dXAjbT6tRmw==";

// 회사 정보 테이블 초기화
const companyTable = new Tabulator("#companyTable", {
    layout: "fitDataStretch", // 테이블 레이아웃
    pagination: "local", // 페이지네이션 활성화
    paginationSize: 10, // 페이지 당 데이터 수
    columns: [
        { title: "기관코드", field: "instCd" }, // 기관코드
        { title: "기관명", field: "instNm" }, // 기관명
        { title: "기관유형", field: "instTypeNm" }, // 기관유형
        { title: "주소", field: "roadNmAddr" }, // 주소
        { title: "대표 전화", field: "rprsTelno" }, // 대표 전화
        {
            title: "홈페이지",
            field: "siteUrl",
            formatter: "link", // 링크 형식으로 표시
            formatterParams: { target: "_blank" }, // 새 창으로 열기
        },
    ],
});

// 회사 정보 데이터 호출
function fetchCompanyData(params) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${companyUrl}?${queryString}`;

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
                    instCd: item.instCd || "정보 없음",
                    instNm: item.instNm || "정보 없음",
                    instTypeNm: item.instTypeNm || "정보 없음",
                    roadNmAddr: item.roadNmAddr || "정보 없음",
                    rprsTelno: item.rprsTelno || "정보 없음",
                    siteUrl: item.siteUrl || "정보 없음",
                }));
                companyTable.setData(tableData);
            } else {
                alert("조건에 맞는 데이터가 없습니다.");
            }
        })
        .catch((error) => {
            alert(`API 요청 실패: ${error.message}`);
        });
}

// 검색 버튼 이벤트 리스너 추가
document.getElementById("searchCompanyBtn").addEventListener("click", () => {
    const params = {
        serviceKey,
        instNm: document.getElementById("instNm").value || "",
        ctpvNm: document.getElementById("ctpvNm").value || "",
        sggNm: document.getElementById("sggNm").value || "",
        instType: document.getElementById("instType").value || "",
        instClsf: document.getElementById("instClsf").value || "",
        numOfRows: 1000, // 한 번에 불러올 데이터 수
        pageNo: 1, // 페이지 번호
        resultType: "json", // 결과 형식
    };

    fetchCompanyData(params);
});
