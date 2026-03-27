document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // =========================
  // [1] 첫 화면 로드 애니메이션
  // =========================
  gsap.fromTo(
    ".hero-title",
    { y: 56, opacity: 0, filter: "blur(0px)" },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.5, // [튜닝] 첫 인상 속도
      ease: "power3.out",
    }
  );

  gsap.fromTo(
    [".hero-desc", ".btn"],
    { y: 22, opacity: 0, filter: "blur(0px)" },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.1, // [튜닝] 설명/버튼 나타나는 시간
      delay: 0.3,
      ease: "power2.out",
      stagger: 0.1,
    }
  );

  // =========================
  // [2] 스크롤 도달 시 텍스트 펼쳐짐/등장
  // =========================
  gsap.utils.toArray(".reveal-text").forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9, // [튜닝] 섹션 등장 속도
      delay: (i % 3) * 0.04,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 86%", // [튜닝] 값 작을수록 더 늦게 시작
        toggleActions: "play none none reverse",
      },
    });
  });

  // 카드 등장(기존 reveal 유지)
  gsap.utils.toArray(".reveal").forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      delay: (i % 4) * 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // =========================
  // [3] 메뉴 클릭 부드러운 이동
  // "상단에서 멀수록 이동속도 빠르게" 구현:
  // - 거리(distance)가 멀수록 duration 증가폭을 제한(로그 스케일)
  // - 결과적으로 긴 거리를 체감상 빠르게 이동
  // =========================
  const navLinks = document.querySelectorAll("a[data-scroll]");
  const header = document.querySelector(".site-header");

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollTo(targetY) {
    const startY = window.scrollY;
    const distance = Math.abs(targetY - startY);

    // [핵심 튜닝 포인트]
    // distance가 커져도 duration이 과도하게 늘어나지 않도록 제한
    // => 멀수록 "상대적으로 빠른" 이동 느낌
    const duration = Math.min(900, Math.max(320, 220 + Math.log2(distance + 1) * 110));

    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + (targetY - startY) * eased);

      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const id = link.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;

      const headerH = header ? header.offsetHeight : 0;
      const targetY = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
      smoothScrollTo(targetY);
    });
  });

  // =========================
  // [4] tsParticles (기존 유지)
  // =========================
  tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    particles: {
      number: { value: 70, density: { enable: true, area: 900 } },
      color: { value: ["#dcdce2", "#a9a9b3"] },
      links: {
        enable: true,
        distance: 135, // [튜닝] 선 길이
        color: "#8f8f99",
        opacity: 0.22, // [튜닝] 선 진하기
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.35, // [튜닝] 파티클 이동 속도
        direction: "none",
        outModes: { default: "out" },
      },
      size: { value: { min: 1, max: 2.4 } },
      opacity: { value: 0.45 },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: ["repulse", "grab"] },
        resize: { enable: true },
      },
      modes: {
        repulse: { distance: 110, duration: 0.35, factor: 90 }, // [튜닝] 회피 강도
        grab: { distance: 145, links: { opacity: 0.4 } }, // [튜닝] 커서 연결 강도
      },
    },
    detectRetina: true,
  });
});
