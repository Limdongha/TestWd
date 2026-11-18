// ============================================================
//  청첩장 내용은 이 파일만 고치면 됩니다.
//  (카톡 공유 미리보기 제목/사진은 index.html 위쪽 <meta> 태그에서 따로 수정)
// ============================================================
window.WEDDING = {
  groom: {
    name: "임동하",        // 전체 이름
    shortName: "동하",     // 표지/문구에 쓰일 이름
    father: "임현제",
    mother: "이숙이",
    order: "장남",         // 장남, 차남, 아들 ...
    phone: "010-0000-0000",
  },
  bride: {
    name: "임상은",
    shortName: "상은",
    father: "임희관",
    mother: "최은미",
    order: "장녀",
    phone: "010-0000-0000",
  },

  // 예식 일시 (24시간제)
  date: "2027-06-05",
  time: "16:20",

  venue: {
    name: "더컨벤션 영등포",
    hall: "2층 다이너스티홀",
    address: "서울 영등포구 국회대로38길 2",
    tel: "",              // 웨딩홀 전화번호 (비워두면 표시 안 함)
    // 지도 앱에서 검색할 이름 (보통 웨딩홀 이름 그대로)
    mapQuery: "더컨벤션 영등포",
  },

  greeting: {
    title: "소중한 분들을 초대합니다",
    body:
`서로 다른 길을 걸어온 두 사람이
이제 같은 길을 함께 걸어가려 합니다.

저희의 새로운 시작을
가까이에서 축복해 주시면
더없는 기쁨으로 간직하겠습니다.`,
  },

  cover: "images/cover.svg",

  gallery: [
    "images/gallery/01.svg",
    "images/gallery/02.svg",
    "images/gallery/03.svg",
    "images/gallery/04.svg",
    "images/gallery/05.svg",
    "images/gallery/06.svg",
    "images/gallery/07.svg",
    "images/gallery/08.svg",
    "images/gallery/09.svg",
  ],

  transport: [
    { title: "지하철", lines: ["2·5호선 영등포구청역 4번 출구 도보 약 3분"] },
    // TODO: 주차 무료 시간은 웨딩홀에 확인 후 추가
    { title: "자가용", lines: ["내비게이션에 '더컨벤션 영등포' 또는 '국회대로38길 2' 검색"] },
  ],

  accounts: {
    groom: [
      // TODO: 신랑측 계좌 받으면 채우기
      { role: "신랑", name: "임동하", bank: "OO은행", number: "000-000000-00000" },
      { role: "신랑 아버지", name: "임현제", bank: "OO은행", number: "000-000000-00000" },
      { role: "신랑 어머니", name: "이숙이", bank: "OO은행", number: "000-000000-00000" },
    ],
    bride: [
      { role: "신부", name: "임상은", bank: "농협", number: "312-6654-9436-41" },
      { role: "신부 아버지", name: "임희관", bank: "농협", number: "407089-52-094699" },
      { role: "신부 어머니", name: "최은미", bank: "농협", number: "407089-51-032270" },
    ],
  },

  // 참석 여부 받을 구글 폼 링크 (비워두면 섹션이 숨겨집니다)
  rsvpUrl: "",
};
