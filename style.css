/* =========================
   Black & White 미니멀 테마
   ========================= */
:root {
  --bg: #0f0f10;
  --panel: #151517;
  --text: #f5f5f5;
  --muted: #b8b8be;
  --line: #2d2d33; /* 카드 테두리 색 */
  --white: #ffffff;
}

/* reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  background: var(--bg);
  color: var(--text);
  scroll-behavior: smooth;
}

body {
  position: relative;
  overflow-x: hidden;
}

/* 배경 파티클 */
#tsparticles {
  position: fixed;
  inset: 0;
  z-index: 0;
}

main,
.site-header {
  position: relative;
  z-index: 1;
}

/* 공통 컨테이너 */
.container {
  width: min(1120px, 92%);
  margin: 0 auto;
}

.section-pad {
  padding: 6rem 0;
}

/* =========================
   상단 고정 메뉴
   ========================= */
.site-header {
  position: fixed; /* 항상 고정 */
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid var(--line);
  background: rgba(15, 15, 16, 0.75);
  backdrop-filter: blur(8px);
}

.nav-wrap {
  min-height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: var(--white);
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav a {
  color: #d5d5db;
  text-decoration: none;
  font-size: 0.95rem;
}
.nav a:hover {
  color: var(--white);
}

/* 헤더 고정 때문에 첫 섹션 여백 */
.hero {
  padding-top: 9rem;
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
}

.hero-inner {
  max-width: 820px;
}

.hero-title {
  font-size: clamp(2rem, 6vw, 4rem);
  margin-bottom: 1rem;
}
.hero-desc {
  color: var(--muted);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  border: 1px solid #4b4b52;
  color: #fff;
  text-decoration: none;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  transition: all 0.3s ease;
}
.btn:hover {
  border-color: #ffffff;
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* 제목 */
.section-title {
  font-size: clamp(1.4rem, 3.5vw, 2.2rem);
  margin-bottom: 1.4rem;
}

/* 카드 (테두리 살림) */
.card {
  border: 1px solid var(--line); /* ✅ 요청사항: 카드 테두리 유지 */
  background: var(--panel);
  border-radius: 16px;
  padding: 1.2rem;
}
.card h3 {
  margin-bottom: 0.5rem;
}
.card p {
  color: var(--muted);
  line-height: 1.75;
}

/* 멀티 컬럼 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

/* 미디어 */
.media-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1rem;
}
.media-card {
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  background: var(--panel);
}
.media-card img {
  width: 100%;
  display: block;
}
.media-card figcaption {
  padding: 0.8rem 1rem;
  color: var(--muted);
}
.video-wrap iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  display: block;
}

/* 비대칭 레이아웃 */
.asym-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 1rem;
}
.asym-grid .large {
  grid-row: span 2; /* 큰 카드가 세로로 2칸 차지 */
  min-height: 320px;
}

/* 스크롤 등장 기본 상태 */
.reveal {
  opacity: 0;
  transform: translateY(24px);
}

/* 반응형 */
@media (max-width: 980px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .media-grid,
  .asym-grid {
    grid-template-columns: 1fr;
  }
  .asym-grid .large {
    grid-row: auto;
    min-height: auto;
  }
}

@media (max-width: 640px) {
  .nav {
    gap: 0.6rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .feature-grid,
  .project-grid {
    grid-template-columns: 1fr;
  }
}
