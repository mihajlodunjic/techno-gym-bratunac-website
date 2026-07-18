// @ts-nocheck
const DESKTOP_MEDIA_QUERY = "(min-width: 64rem)";

const trapFocus = (event, root) => {
  if (event.key !== "Tab") {
    return;
  }

  const focusable = Array.from(
    root.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(
    (element) => element instanceof HTMLElement && !element.hasAttribute("hidden")
  );

  if (focusable.length === 0) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const initializeMobileNavigation = () => {
  const root = document.querySelector("[data-mobile-nav]");

  if (!(root instanceof HTMLElement)) {
    return;
  }

  const toggle = root.querySelector("[data-mobile-nav-toggle]");
  const panel = root.querySelector("[data-mobile-nav-panel]");
  const backdrop = root.querySelector("[data-mobile-nav-backdrop]");
  const links = Array.from(root.querySelectorAll("[data-mobile-nav-link]")).filter(
    (link) => link instanceof HTMLAnchorElement
  );

  if (
    !(toggle instanceof HTMLButtonElement) ||
    !(panel instanceof HTMLElement) ||
    !(backdrop instanceof HTMLElement)
  ) {
    return;
  }

  const desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY);
  let isOpen = false;

  const lockScroll = () => {
    document.body.classList.add("is-locked");
  };

  const unlockScroll = () => {
    document.body.classList.remove("is-locked");
  };

  const closeMenu = () => {
    if (!isOpen) {
      return;
    }

    isOpen = false;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Otvori navigaciju");
    toggle.dataset.open = "false";
    panel.hidden = true;
    backdrop.hidden = true;
    unlockScroll();
    toggle.focus();
  };

  const openMenu = () => {
    isOpen = true;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Zatvori navigaciju");
    toggle.dataset.open = "true";
    panel.hidden = false;
    backdrop.hidden = false;
    lockScroll();

    const firstLink = panel.querySelector("a[href]");
    if (firstLink instanceof HTMLElement) {
      firstLink.focus();
    }
  };

  toggle.addEventListener("click", () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener("click", closeMenu);

  links.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    trapFocus(event, panel);
  });

  const handleDesktopSwitch = (event) => {
    if (event.matches) {
      closeMenu();
    }
  };

  desktopMedia.addEventListener("change", handleDesktopSwitch);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMobileNavigation, {
    once: true
  });
} else {
  initializeMobileNavigation();
}
