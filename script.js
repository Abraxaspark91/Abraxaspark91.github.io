document.addEventListener("DOMContentLoaded", () => {
  // GSAP 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  // =========================
  // 1) 첫 화면(히어로) 애니메이션
  // =========================
  gsap.fromTo(
    ".hero-title",
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5, // 요청하신 1.5초
      ease: "power3.out",
    }
  );

  gsap.fromTo(
    [".hero-desc", ".hero-btn"],
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.1,
      delay: 0.3, // 타이틀 이후 0.3초 지연
      ease: "power2.out",
      stagger: 0.1, // desc -> button 순차 등장
    }
  );

  // =========================
  // 2) 프로젝트 카드 스크롤 페이드인
  // =========================
  gsap.utils.toArray(".project-card").forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: index * 0.08, // 카드가 순차 등장
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // =========================
  // 3) tsParticles 네트워크 배경
  // =========================
  tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    particles: {
      number: {
        value: 90, // [점 개수 변경 포인트]
        density: { enable: true, area: 900 },
      },
      color: {
        value: ["#59e3ff", "#8f7dff"], // [점 색상 변경 포인트]
      },
      links: {
        enable: true,
        distance: 140, // [선 연결 거리 변경]
        color: "#6ec7ff",
        opacity: 0.35,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.45, // [이동 속도 변경] 낮을수록 천천히
        direction: "none",
        outModes: { default: "out" },
      },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.6 },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          // repulse: 마우스 근처에서 점이 튕겨 나감
          // grab: 마우스 근처 점과 선으로 연결되는 느낌
          mode: ["repulse", "grab"],
        },
        resize: { enable: true },
      },
      modes: {
        repulse: {
          distance: 120, // [회피 거리]
          duration: 0.4,
          factor: 120,
        },
        grab: {
          distance: 160, // [커서-점 연결 거리]
          links: { opacity: 0.65 },
        },
      },
    },
    detectRetina: true,
  });
});
