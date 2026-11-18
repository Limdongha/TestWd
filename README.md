# 모바일 청첩장

## 내용 바꾸기
- **이름, 날짜, 장소, 인사말, 계좌, 교통편**: `config.js`만 수정하면 됩니다.
- **사진**: `images/cover.*` (대표 사진), `images/gallery/` (갤러리) 에 넣고 `config.js` 경로를 맞춰주세요.
  - 한 장당 가로 1200px 이하, 500KB 안팎으로 줄여서 넣으면 로딩이 빨라요.
- **카톡 공유 미리보기**: `index.html` 위쪽 `<meta property="og:...">` 태그 수정.
  - `og:image`는 **JPG/PNG**이고 `https://...` 로 시작하는 전체 주소여야 합니다 (권장 1200×630).
- **참석 여부**: 구글 폼을 만들고 링크를 `config.js`의 `rsvpUrl`에 넣으면 섹션이 나타납니다.

## 미리보기
```
python -m http.server 8080
```
→ http://localhost:8080

## GitHub Pages 배포
1. GitHub에 저장소를 만들고 이 폴더를 push
2. 저장소 Settings → Pages → Branch: `main` / `(root)` → Save
3. 몇 분 뒤 `https://아이디.github.io/저장소이름/` 에서 확인
4. 카톡 미리보기가 안 바뀌면 [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 캐시 초기화
