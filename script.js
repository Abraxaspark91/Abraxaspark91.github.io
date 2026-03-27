document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isReducedMotion = reduceMotionQuery.matches;

  const revealSelectors = [".reveal-section", ".reveal-card", ".reveal-text"];

  // =========================
  // [1] 첫 화면 로드 애니메이션
  // =========================
  if (isReducedMotion) {
    gsap.set([".hero-title", ".hero-desc", ".btn"], {
      clearProps: "all",
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "none",
    });
  } else {
    gsap.fromTo(
      ".hero-title",
      { y: 56, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      [".hero-desc", ".btn"],
      { y: 22, opacity: 0, filter: "blur(6px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        delay: 0.3,
        ease: "power2.out",
        stagger: 0.1,
      }
    );
  }

  // =========================
  // [2] 스크롤 도달 시 목적별 애니메이션
  // =========================
  if (isReducedMotion) {
    gsap.set(revealSelectors.join(", "), {
      clearProps: "all",
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "none",
    });
  } else {
    gsap.utils.toArray(".reveal-section").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.95,
        delay: (i % 2) * 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.utils.toArray(".reveal-card").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.75,
        delay: (i % 4) * 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.utils.toArray(".reveal-text").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        delay: (i % 3) * 0.03,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }

  // =========================
  // [3] 메뉴 클릭 스크롤 이동
  // - reduced-motion일 때는 즉시 이동
  // =========================
  const scrollLinks = document.querySelectorAll("a[data-scroll]");
  const navLinks = document.querySelectorAll(".nav a[data-scroll]");
  const header = document.querySelector(".site-header");
  const navLinkMap = new Map();
  const sectionMap = new Map();

  scrollLinks.forEach((link) => {
    const id = link.getAttribute("href");
    if (!id || !id.startsWith("#")) return;

    const target = document.querySelector(id);
    if (!target) return;

    sectionMap.set(id, target);
  });

  navLinks.forEach((link) => {
    const id = link.getAttribute("href");
    if (!id || !id.startsWith("#")) return;
    navLinkMap.set(id, link);
  });

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });

    const activeLink = navLinkMap.get(id);
    if (!activeLink) return;

    activeLink.classList.add("active");
    activeLink.setAttribute("aria-current", "page");
  }

  function updateActiveNavByScroll() {
    if (!sectionMap.size) return;

    const headerH = header ? header.offsetHeight : 0;
    const probeY = window.scrollY + headerH + 24;
    let activeId = null;

    sectionMap.forEach((section, id) => {
      if (section.offsetTop <= probeY) activeId = id;
    });

    if (!activeId) {
      const firstId = sectionMap.keys().next().value;
      if (firstId) setActiveNav(firstId);
      return;
    }

    setActiveNav(activeId);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollTo(targetY) {
    const startY = window.scrollY;
    const distance = Math.abs(targetY - startY);
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

  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const id = link.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;

      const headerH = header ? header.offsetHeight : 0;
      const targetY = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
      setActiveNav(id);

      if (isReducedMotion) {
        window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
      } else {
        smoothScrollTo(targetY);
      }

      history.replaceState(null, "", `${window.location.pathname}${window.location.search}${id}`);
    });
  });

  if (window.location.hash && sectionMap.has(window.location.hash)) {
    const section = sectionMap.get(window.location.hash);
    const headerH = header ? header.offsetHeight : 0;
    const targetY = section.getBoundingClientRect().top + window.scrollY - headerH - 10;
    setActiveNav(window.location.hash);
    requestAnimationFrame(() => {
      window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
    });
  }

  updateActiveNavByScroll();
  window.addEventListener("scroll", updateActiveNavByScroll, { passive: true });
  window.addEventListener("resize", updateActiveNavByScroll);

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
        distance: 135,
        color: "#8f8f99",
        opacity: 0.22,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.35,
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
        repulse: { distance: 110, duration: 0.35, factor: 90 },
        grab: { distance: 145, links: { opacity: 0.4 } },
      },
    },
    detectRetina: true,
  });
});
