(() => {
  "use strict";

  const documentElement = document.documentElement;
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navSectionLinks = [...document.querySelectorAll("[data-nav-link]")];
  const faqList = document.querySelector("[data-faq-list]");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopQuery = window.matchMedia("(min-width: 920px)");

  documentElement.classList.add("js-enabled");

  function setMenu(open, restoreFocus = false) {
    if (!menuButton || !navLinks) return;

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    navLinks.classList.toggle("is-open", open);
    body.classList.toggle("menu-open", open);

    if (open) {
      window.requestAnimationFrame(() => {
        navLinks.querySelector("a")?.focus({ preventScroll: true });
      });
    } else if (restoreFocus) {
      menuButton.focus({ preventScroll: true });
    }
  }

  function handleMenuKeydown(event) {
    if (!menuButton || !navLinks || menuButton.getAttribute("aria-expanded") !== "true") return;

    if (event.key === "Escape") {
      event.preventDefault();
      setMenu(false, true);
      return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = [
      menuButton,
      ...navLinks.querySelectorAll('a[href], button:not([disabled])')
    ];
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  function initializeMenu() {
    if (!menuButton || !navLinks) return;

    menuButton.addEventListener("click", () => {
      const shouldOpen = menuButton.getAttribute("aria-expanded") !== "true";
      setMenu(shouldOpen, !shouldOpen);
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", handleMenuKeydown);
    desktopQuery.addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });
  }

  function initializeHeader() {
    if (!header) return;

    let frameRequested = false;
    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
      frameRequested = false;
    };

    updateHeader();
    window.addEventListener("scroll", () => {
      if (!frameRequested) {
        window.requestAnimationFrame(updateHeader);
        frameRequested = true;
      }
    }, { passive: true });
  }

  function initializeActiveNavigation() {
    if (!navSectionLinks.length) return;

    const items = navSectionLinks
      .map((link) => ({ link, section: document.querySelector(link.hash) }))
      .filter((item) => item.section);
    let frameRequested = false;

    const updateActiveLink = () => {
      const offset = (header?.offsetHeight || 0) + 128;
      const activeItem = [...items]
        .reverse()
        .find(({ section }) => section.getBoundingClientRect().top <= offset);

      navSectionLinks.forEach((link) => link.removeAttribute("aria-current"));
      activeItem?.link.setAttribute("aria-current", "true");
      frameRequested = false;
    };

    const requestUpdate = () => {
      if (frameRequested) return;
      window.requestAnimationFrame(updateActiveLink);
      frameRequested = true;
    };

    updateActiveLink();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("load", requestUpdate, { once: true });
    window.addEventListener("hashchange", requestUpdate);
  }

  function initializeFaq() {
    if (!faqList) return;

    const questions = [...faqList.querySelectorAll(".faq-question")];
    questions.forEach((question) => {
      const answer = document.getElementById(question.getAttribute("aria-controls"));
      question.setAttribute("aria-expanded", "false");
      if (answer) answer.hidden = true;
    });

    faqList.addEventListener("click", (event) => {
      const question = event.target.closest(".faq-question");
      if (!question || !faqList.contains(question)) return;

      const answer = document.getElementById(question.getAttribute("aria-controls"));
      if (!answer) return;

      const willOpen = question.getAttribute("aria-expanded") !== "true";
      question.setAttribute("aria-expanded", String(willOpen));
      answer.hidden = !willOpen;
    });
  }

  function initializeReveals() {
    const revealElements = document.querySelectorAll(".reveal");
    if (!revealElements.length) return;

    if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  }

  function updateCopyrightYear() {
    const year = document.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  initializeMenu();
  initializeHeader();
  initializeActiveNavigation();
  initializeFaq();
  initializeReveals();
  updateCopyrightYear();
})();
