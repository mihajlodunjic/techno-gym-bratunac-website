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

const focusWithoutScroll = (element) => {
  try {
    element.focus({ preventScroll: true });
  } catch {
    element.focus();
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

  const setMenuState = (nextOpen) => {
    isOpen = nextOpen;
    toggle.setAttribute("aria-expanded", String(nextOpen));
    toggle.setAttribute(
      "aria-label",
      nextOpen ? "Zatvori navigaciju" : "Otvori navigaciju"
    );
    panel.hidden = !nextOpen;
    backdrop.hidden = !nextOpen;

    if (nextOpen) {
      toggle.dataset.open = "true";
      root.dataset.open = "true";
      lockScroll();

      const firstLink = panel.querySelector("a[href]");
      if (firstLink instanceof HTMLElement) {
        focusWithoutScroll(firstLink);
      }
    } else {
      toggle.removeAttribute("data-open");
      root.removeAttribute("data-open");
      unlockScroll();
      focusWithoutScroll(toggle);
    }
  };

  const closeMenu = () => setMenuState(false);
  const openMenu = () => setMenuState(true);

  toggle.addEventListener("click", () => {
    const isCurrentlyOpen =
      toggle.getAttribute("aria-expanded") === "true" || !panel.hidden;

    if (isCurrentlyOpen) {
      closeMenu();
      return;
    }

    openMenu();
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
