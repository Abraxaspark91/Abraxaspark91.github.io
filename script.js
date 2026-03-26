document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 초기 로드 애니메이션
  gsap.fromTo(
    ".hero-title",
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
    }
  );

  gsap.fromTo(
    [".hero-desc", ".hero-btn"],
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.3, // 타이틀 후 시차
      ease: "power2.out",
      stagger: 0.1,
    }
  );

  // 스크롤 시 프로젝트 섹션 페이드인
  gsap.to(".projects-inner", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".projects-inner",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // tsParticles 네트워크/거미줄 배경 + 마우스 인터랙션
  tsParticles.load("tsparticles", {
    fullScreen: {
      enable: false, // canvas를 직접 제어
    },
    background: {
      color: "transparent",
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 900,
        },
      },
      color: {
        value: ["#59e3ff", "#8f7dff"],
      },
      links: {
        enable: true,
        distance: 140,
        color: "#6ec7ff",
        opacity: 0.35,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5, // 아주 천천히 이동
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out",
        },
      },
      size: {
        value: { min: 1, max: 3 },
      },
      opacity: {
        value: 0.6,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["repulse", "grab"], // 마우스 피하기 + 연결 느낌
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        repulse: {
          distance: 120,
          duration: 0.4,
          factor: 120,
        },
        grab: {
          distance: 160,
          links: {
            opacity: 0.65,
          },
        },
      },
    },
    detectRetina: true,
  });
});
