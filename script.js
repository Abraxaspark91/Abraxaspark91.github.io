document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      title: "New ERP Implementation Project",
      period: "Dec 2024 ~ Aug 2025",
      roles: ["Solution Architect", "Stabilization Support"],
      results: "Architected 10+ programs for profitability system used for BEPS compliance",
      industryClient: "Electronics · L Electronics",
      tags: ["Electronics", "Module Lead"],
    },
    {
      title: "GenAI Taskforce",
      period: "Feb 2024 ~ Nov 2024",
      roles: ["SAP Domain Expert", "GenAI R&D", "GenAI Strategist"],
      results: "KNIME expert | Open-source LLM ecosystem report | sLLM Fine-tuning",
      industryClient: "Technology · P Consulting",
      tags: ["Consulting", "Strategic"],
    },
    {
      title: "New Management Accounting Project",
      period: "Aug 2022 ~ Oct 2023",
      roles: [
        "Process and Solution Architect",
        "Stabilization Support",
        "Chinese Region Counterpart",
      ],
      results: "Process optimization | 8+ program design for marketing events' P&L tracking systems",
      industryClient: "FMCG · A Cosmetics",
      tags: ["Consumer Goods", "Senior Consultant"],
    },
    {
      title: "Financial Reporting Enhancement",
      period: "May 2021 ~ Aug 2022",
      roles: [
        "Process and Solution Architect",
        "Global Communication Manager",
        "Stabilization Support",
      ],
      results: "Architected 7+ programs for standardized intercompany transaction",
      industryClient: "Chemical · L Chemical",
      tags: ["Chemical", "Module Lead"],
    },
    {
      title: "Next-gen ERP Implementation",
      period: "Dec 2019 ~ May 2021",
      roles: [
        "Solution Architect",
        "Solution Implementation Consultant",
        "Stabilization Support",
      ],
      results: "Global COGS tracking-based consolidated profitability system",
      industryClient: "Energy · S Lubricants",
      tags: ["Energy", "Implementation"],
    },
  ];

  function createProjectHead(period) {
    const head = document.createElement("header");
    head.className = "project-head";

    const periodBadge = document.createElement("p");
    periodBadge.className = "period-badge";
    periodBadge.setAttribute("aria-label", "FROM ~ TO");
    periodBadge.textContent = period;

    head.append(periodBadge);
    return head;
  }

  function createProjectFacts({ roles, results, industryClient }) {
    const facts = document.createElement("dl");
    facts.className = "project-facts";

    const roleRow = document.createElement("div");
    roleRow.className = "fact-row";
    roleRow.innerHTML = `
      <dt>Role</dt>
      <dd>
        <ul class="card-body-list">
          ${roles.map((role) => `<li class="card-body">${role}</li>`).join("")}
        </ul>
      </dd>
    `;

    const resultsRow = document.createElement("div");
    resultsRow.className = "fact-row fact-row--results";
    resultsRow.innerHTML = `
      <dt>Results</dt>
      <dd class="card-body">${results}</dd>
    `;

    const industryRow = document.createElement("div");
    industryRow.className = "fact-row";
    industryRow.innerHTML = `
      <dt>Industry · Client</dt>
      <dd class="card-body">${industryClient}</dd>
    `;

    facts.append(roleRow, resultsRow, industryRow);
    return facts;
  }

  function createCardMeta(tags) {
    const meta = document.createElement("div");
    meta.className = "card-meta";

    tags.forEach((tag, index) => {
      const badge = document.createElement("span");
      badge.className = `meta-badge ${index === 0 ? "industry" : "role-level"}`;
      badge.textContent = tag;
      meta.appendChild(badge);
    });

    return meta;
  }

  function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "card card--project reveal-card";

    const title = document.createElement("h3");
    title.className = "card__title card-title title";
    title.textContent = project.title;

    const stack = document.createElement("div");
    stack.className = "card-stack";
    stack.append(createProjectHead(project.period));
    stack.append(
      createProjectFacts({
        roles: project.roles,
        results: project.results,
        industryClient: project.industryClient,
      })
    );

    card.append(title, stack, createCardMeta(project.tags));
    return card;
  }

  function renderProjects(projectList, container) {
    if (!container) return;

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    projectList.forEach((project) => {
      fragment.appendChild(createProjectCard(project));
    });

    container.appendChild(fragment);
  }

  // PROJECTS 카드는 projects 배열만 수정하면 자동으로 반영됩니다.
  const projectGrid = document.querySelector("#project-cards");
  renderProjects(projects, projectGrid);

  const prevProjectButton = document.querySelector("#project-prev");
  const nextProjectButton = document.querySelector("#project-next");
  const projectCarousel = document.querySelector(".project-carousel");

  function getVisibleCount() {
    if (window.matchMedia("(max-width: 760px)").matches) return 1;
    if (window.matchMedia("(max-width: 1023px)").matches) return 2;
    return 3;
  }

  function setupProjectCarousel() {
    if (!projectGrid || !projectCarousel || !prevProjectButton || !nextProjectButton) return;

    const cards = Array.from(projectGrid.querySelectorAll(".card"));
    if (!cards.length) return;

    let startIndex = 0;
    let visibleCount = getVisibleCount();

    const applyState = () => {
      const maxStart = Math.max(0, cards.length - visibleCount);
      startIndex = Math.min(startIndex, maxStart);

      cards.forEach((card, index) => {
        const isVisible = index >= startIndex && index < startIndex + visibleCount;
        card.classList.toggle("is-dimmed", !isVisible);
      });

      const cardWidth = cards[0].getBoundingClientRect().width;
      const gridGap = parseFloat(getComputedStyle(projectGrid).columnGap || "0");
      const offset = startIndex * (cardWidth + gridGap);
      projectGrid.style.transform = `translateX(${-offset}px)`;

      prevProjectButton.disabled = startIndex === 0;
      nextProjectButton.disabled = startIndex >= maxStart;
    };

    prevProjectButton.addEventListener("click", () => {
      startIndex = Math.max(0, startIndex - 1);
      applyState();
    });

    nextProjectButton.addEventListener("click", () => {
      const maxStart = Math.max(0, cards.length - visibleCount);
      startIndex = Math.min(maxStart, startIndex + 1);
      applyState();
    });

    window.addEventListener("resize", () => {
      visibleCount = getVisibleCount();
      applyState();
    });

    applyState();
  }

  setupProjectCarousel();

  // Hero 가시성에 따라 고정 배경 선명도/섹션 베일 강도를 전환합니다.
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        const heroIsActive = entry.isIntersecting && entry.intersectionRatio >= 0.45;
        document.body.classList.toggle("is-hero-active", heroIsActive);
      },
      { threshold: [0, 0.45, 0.75] }
    );

    heroObserver.observe(heroSection);
  }

  const root = document.documentElement;
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isReducedMotion = reduceMotionQuery.matches;

  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
  const canAnimate = !isReducedMotion && hasGsap && hasScrollTrigger;

  if (canAnimate) {
    root.classList.add("js-ready", "is-animated");
    gsap.registerPlugin(ScrollTrigger);

    // =========================
    // [1] 첫 화면 로드 애니메이션
    // =========================
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

    // =========================
    // [2] 스크롤 도달 시 목적별 애니메이션
    // =========================
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
  } else {
    root.classList.remove("js-ready", "is-animated");

    if (!isReducedMotion && (!hasGsap || !hasScrollTrigger)) {
      console.warn("[animation] GSAP/ScrollTrigger unavailable. Keeping reveal content accessible.");
    }
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

    if (link.closest(".nav") && !navLinkMap.has(id)) {
      navLinkMap.set(id, link);
    }
    if (!sectionMap.has(id)) {
      sectionMap.set(id, target);
    }
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

  let isScrollingToTarget = false;

  function updateActiveNavByScroll() {
    if (isScrollingToTarget) return;
    if (!sectionMap.size) return;

    const headerH = header ? header.offsetHeight : 0;
    const probeY = window.scrollY + headerH + 24;
    let activeId = null;

    sectionMap.forEach((section, id) => {
      if (section.offsetTop <= probeY) {
        activeId = id;
      } else {
        // probe 미도달 섹션: 뷰포트 상단부에 보이면 활성화
        // (Education·Contact처럼 짧아서 probe가 닿지 않는 섹션 대응)
        const rect = section.getBoundingClientRect();
        if (rect.top >= headerH && rect.top < window.innerHeight * 0.65) {
          activeId = id;
        }
      }
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

  function smoothScrollTo(targetY, onComplete) {
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

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (onComplete) onComplete();
      }
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
      isScrollingToTarget = true;

      if (isReducedMotion) {
        window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
        setActiveNav(id);
        isScrollingToTarget = false;
      } else {
        smoothScrollTo(targetY, () => {
          setActiveNav(id);
          isScrollingToTarget = false;
        });
      }

      history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    });
  });

  if (window.location.hash && sectionMap.has(window.location.hash)) {
    const section = sectionMap.get(window.location.hash);
    const headerH = header ? header.offsetHeight : 0;
    const targetY = section.getBoundingClientRect().top + window.scrollY - headerH - 10;
    window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
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
