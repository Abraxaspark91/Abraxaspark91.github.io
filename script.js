document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // =========================
  // 첫 로드 애니메이션
  // =========================
  gsap.fromTo(
    ".hero-title",
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
  );

  gsap.fromTo(
    [".hero-desc", ".btn"],
    { y: 24, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.1,
      delay: 0.3,
      ease: "power2.out",
      stagger: 0.1,
    }
  );

  // =========================
  // 스크롤할수록 나타나는 요소
  // .reveal 클래스 가진 요소 전체 대상
  // =========================
  gsap.utils.toArray(".reveal").forEach((el, idx) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: idx % 4 === 0 ? 0 : 0.04,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // =========================
  // 배경 파티클 (B&W + subtle)
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
        distance: 135,
        color: "#8f8f99",
        opacity: 0.22,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.35, // 아주 천천히
        direction: "none",
        outModes: { default: "out" },
      },
      size: { value: { min: 1, max: 2.4 } },
      opacity: { value: 0.45 },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["repulse", "grab"], // 마우스 회피 + 연결
        },
        resize: { enable: true },
      },
      modes: {
        repulse: { distance: 110, duration: 0.35, factor: 90 },
        grab: { distance: 145, links: { opacity: 0.4 } },
      },
    },
    detectRetina: true,
  });
});
