(function () {
  "use strict";
  const W = window.WEDDING;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- 날짜 ----------
  const [Y, M, D] = W.date.split("-").map(Number);
  const [hh, mm] = W.time.split(":").map(Number);
  const wedding = new Date(Y, M - 1, D, hh, mm);
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  const timeText = `${hh < 12 ? "오전" : "오후"} ${hh % 12 || 12}시${mm ? ` ${mm}분` : ""}`;
  const dateText = `${Y}년 ${M}월 ${D}일 ${DAYS[wedding.getDay()]}요일`;
  const dot = `${Y}. ${String(M).padStart(2, "0")}. ${String(D).padStart(2, "0")}`;

  const g = W.groom, b = W.bride;

  // ---------- 표지 ----------
  $("#cover").innerHTML = `
    <p class="cover-eyebrow">WEDDING INVITATION</p>
    <h1 class="cover-names">${esc(g.shortName)}<span class="amp">그리고</span>${esc(b.shortName)}</h1>
    <div class="cover-photo"><img src="${esc(W.cover)}" alt="${esc(g.shortName)} · ${esc(b.shortName)} 웨딩 사진"></div>
    <p class="cover-date">${dot} ${DAYS[wedding.getDay()]}요일 ${timeText}</p>
    <p class="cover-venue">${esc(W.venue.name)} ${esc(W.venue.hall)}</p>`;

  // ---------- 인사말 ----------
  const parentLine = (p) => `
    <p class="parents"><span>${esc(p.father)} · ${esc(p.mother)}</span><small>의 ${esc(p.order)}</small><strong>${esc(p.shortName)}</strong></p>`;
  $("#greeting").innerHTML = `
    <p class="eyebrow">INVITATION</p>
    <h2 class="title">${esc(W.greeting.title)}</h2>
    <p class="greeting-body">${esc(W.greeting.body)}</p>
    <div class="divider"></div>
    ${parentLine(g)}${parentLine(b)}
    <div class="btn-row">
      <a class="btn" href="tel:${esc(g.phone)}">신랑에게 연락하기</a>
      <a class="btn" href="tel:${esc(b.phone)}">신부에게 연락하기</a>
    </div>`;

  // ---------- 달력 + D-day ----------
  (function renderCalendar() {
    const first = new Date(Y, M - 1, 1).getDay();
    const last = new Date(Y, M, 0).getDate();
    let cells = DAYS.map((d, i) => `<div class="cal-head ${i === 0 ? "sun" : i === 6 ? "sat" : ""}">${d}</div>`).join("");
    for (let i = 0; i < first; i++) cells += `<div></div>`;
    for (let d = 1; d <= last; d++) {
      const dow = (first + d - 1) % 7;
      const cls = [d === D ? "on" : "", dow === 0 ? "sun" : dow === 6 ? "sat" : ""].join(" ").trim();
      cells += `<div class="cal-day ${cls}">${d}</div>`;
    }
    const today = new Date();
    const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = Math.round((new Date(Y, M - 1, D) - t0) / 86400000);
    const names = `${esc(g.shortName)} <span class="heart">♥</span> ${esc(b.shortName)}`;
    const dday =
      diff > 0 ? `${names}의 결혼식이 <b>${diff}일</b> 남았습니다.`
      : diff === 0 ? `오늘은 ${names}의 결혼식 날입니다.`
      : `${names}, 함께한 지 <b>${-diff}일</b>이 되었습니다.`;

    $("#calendar").innerHTML = `
      <p class="eyebrow">WEDDING DAY</p>
      <h2 class="title">${dateText}<br><span class="sub">${timeText}</span></h2>
      <div class="cal">
        <div class="cal-month">${Y}. ${String(M).padStart(2, "0")}</div>
        <div class="cal-grid">${cells}</div>
      </div>
      <p class="dday">${dday}</p>`;
  })();

  // ---------- 갤러리 ----------
  (function renderGallery() {
    const PREVIEW = 6;
    const items = W.gallery
      .map((src, i) => `<button class="g-item ${i >= PREVIEW ? "g-more" : ""}" data-i="${i}" aria-label="사진 ${i + 1} 크게 보기"><img src="${esc(src)}" alt="" loading="lazy"></button>`)
      .join("");
    $("#gallery").innerHTML = `
      <p class="eyebrow">GALLERY</p>
      <h2 class="title">우리의 순간</h2>
      <div class="g-grid">${items}</div>
      ${W.gallery.length > PREVIEW ? `<button class="btn btn--wide" id="g-toggle">사진 더보기</button>` : ""}`;
    const grid = $(".g-grid");
    const toggle = $("#g-toggle");
    if (toggle) toggle.addEventListener("click", () => {
      const open = grid.classList.toggle("expanded");
      toggle.textContent = open ? "접기" : "사진 더보기";
    });
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".g-item");
      if (btn) openLightbox(Number(btn.dataset.i));
    });
  })();

  // ---------- 라이트박스 ----------
  const lb = $("#lightbox"), lbImg = $("img", lb), lbCount = $(".lb-count", lb);
  let cur = 0;
  function show(i) {
    cur = (i + W.gallery.length) % W.gallery.length;
    lbImg.src = W.gallery[cur];
    lbCount.textContent = `${cur + 1} / ${W.gallery.length}`;
  }
  function openLightbox(i) { show(i); lb.hidden = false; document.body.style.overflow = "hidden"; }
  function closeLightbox() { lb.hidden = true; document.body.style.overflow = ""; }
  $(".lb-close", lb).addEventListener("click", closeLightbox);
  $(".lb-prev", lb).addEventListener("click", () => show(cur - 1));
  $(".lb-next", lb).addEventListener("click", () => show(cur + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
  let sx = null;
  lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
    sx = null;
  });

  // ---------- 오시는 길 ----------
  const q = encodeURIComponent(W.venue.mapQuery || W.venue.name);
  $("#location").innerHTML = `
    <p class="eyebrow">LOCATION</p>
    <h2 class="title">오시는 길</h2>
    <p class="venue-name">${esc(W.venue.name)} <span>${esc(W.venue.hall)}</span></p>
    <p class="venue-addr">${esc(W.venue.address)}
      <button class="link-btn" data-copy="${esc(W.venue.address)}">주소 복사</button></p>
    ${W.venue.tel ? `<p class="venue-tel"><a href="tel:${esc(W.venue.tel)}">${esc(W.venue.tel)}</a></p>` : ""}
    <div class="btn-row">
      <a class="btn" href="https://map.kakao.com/link/search/${q}" target="_blank" rel="noopener">카카오맵</a>
      <a class="btn" href="https://map.naver.com/p/search/${q}" target="_blank" rel="noopener">네이버지도</a>
    </div>
    <dl class="transport">
      ${W.transport.map((t) => `<dt>${esc(t.title)}</dt><dd>${t.lines.map(esc).join("<br>")}</dd>`).join("")}
    </dl>`;

  // ---------- 마음 전하실 곳 ----------
  const accGroup = (label, list) => `
    <details class="acc">
      <summary>${label}</summary>
      <ul>${list.map((a) => `
        <li>
          <div><span class="acc-role">${esc(a.role)}</span> ${esc(a.name)}<br>
            <span class="acc-num">${esc(a.bank)} ${esc(a.number)}</span></div>
          <button class="btn btn--sm" data-copy="${esc(a.bank)} ${esc(a.number)}">복사</button>
        </li>`).join("")}
      </ul>
    </details>`;
  $("#accounts").innerHTML = `
    <p class="eyebrow">ACCOUNT</p>
    <h2 class="title">마음 전하실 곳</h2>
    <p class="note">참석이 어려우신 분들을 위해 기재하였습니다.<br>너그러운 양해 부탁드립니다.</p>
    ${accGroup("신랑측 계좌번호", W.accounts.groom)}
    ${accGroup("신부측 계좌번호", W.accounts.bride)}`;

  // ---------- 참석 여부 ----------
  if (W.rsvpUrl) {
    const r = $("#rsvp");
    r.hidden = false;
    r.innerHTML = `
      <p class="eyebrow">RSVP</p>
      <h2 class="title">참석 여부 전달</h2>
      <p class="note">원활한 식사 준비를 위해<br>참석 여부를 알려주시면 감사하겠습니다.</p>
      <a class="btn btn--wide btn--solid" href="${esc(W.rsvpUrl)}" target="_blank" rel="noopener">참석 여부 전달하기</a>`;
  }

  // ---------- 푸터 / 공유 ----------
  $("#footer").innerHTML = `
    <button class="btn btn--wide" id="share">청첩장 공유하기</button>
    <button class="link-btn" data-copy-url>링크 복사</button>
    <p class="thanks">${esc(g.shortName)} · ${esc(b.shortName)}</p>`;
  $("#share").addEventListener("click", async () => {
    const data = { title: document.title, text: `${dateText} ${timeText}\n${W.venue.name}`, url: location.href };
    if (navigator.share) { try { await navigator.share(data); } catch (_) {} }
    else copy(location.href, "링크가 복사되었습니다");
  });

  // ---------- 복사 / 토스트 ----------
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
  }
  async function copy(text, msg = "복사되었습니다") {
    try { await navigator.clipboard.writeText(text); }
    catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
    }
    toast(msg);
  }
  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-copy]");
    if (c) return copy(c.dataset.copy);
    if (e.target.closest("[data-copy-url]")) copy(location.href, "링크가 복사되었습니다");
  });

  // ---------- 스크롤 등장 효과 ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
