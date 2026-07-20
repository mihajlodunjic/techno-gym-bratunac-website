// @ts-nocheck
(() => {
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const COMPACT_QUERY = "(max-width: 63.9375rem), (hover: none), (pointer: coarse)";
const PAN_THRESHOLD = 8;
const MOBILE_BASE_WIDTH = 680;
const INITIAL_ZOOM = 1.6;
const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.15;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const focusWithoutScroll = (element) => {
  if (!(element instanceof HTMLElement || element instanceof SVGElement)) {
    return;
  }

  try {
    element.focus({ preventScroll: true });
  } catch {
    element.focus();
  }
};

const initializeGymFloorPlan = () => {
  document.querySelectorAll("[data-gym-map]").forEach((root) => {
    const stage = root.querySelector("[data-gym-map-stage]");
    const scroll = root.querySelector("[data-gym-map-scroll]");
    const canvas = root.querySelector("[data-gym-map-canvas]");
    const popover = root.querySelector("[data-gym-map-popover]");
    const closeButton = root.querySelector("[data-gym-map-popover-close]");
    const backdrop = root.querySelector("[data-gym-map-popover-backdrop]");
    const meta = root.querySelector("[data-gym-map-popover-meta]");
    const title = root.querySelector("[data-gym-map-popover-title]");
    const image = root.querySelector("[data-gym-map-popover-image]");
    const zoomOutButton = root.querySelector("[data-gym-map-zoom-out]");
    const zoomInButton = root.querySelector("[data-gym-map-zoom-in]");
    const resetButton = root.querySelector("[data-gym-map-reset]");
    const zoomLabel = root.querySelector("[data-gym-map-zoom-label]");
    const machines = Array.from(root.querySelectorAll("[data-machine]"));

    if (
      !(stage instanceof HTMLElement) ||
      !(scroll instanceof HTMLElement) ||
      !(canvas instanceof HTMLElement) ||
      !(popover instanceof HTMLElement) ||
      !(backdrop instanceof HTMLElement) ||
      machines.length === 0
    ) {
      return;
    }

    const finePointer = window.matchMedia(FINE_POINTER_QUERY);
    const compactLayout = window.matchMedia(COMPACT_QUERY);
    let activeMachine = null;
    let locked = false;
    let lastFocusedMachine = null;
    let isRestoringFocus = false;
    let pointerStart = null;
    let zoom = INITIAL_ZOOM;
    let baseWidth = MOBILE_BASE_WIDTH;

    const isCompact = () => compactLayout.matches;

    const clearMachineStates = () => {
      machines.forEach((machine) => {
        machine.removeAttribute("data-active");
        machine.setAttribute("aria-pressed", "false");
        machine.setAttribute("aria-expanded", "false");
        machine.removeAttribute("aria-describedby");
      });
    };

    const machineData = (machine) => ({
      id: machine.dataset.machineId || "",
      label: machine.dataset.machineLabel || "",
      name: machine.dataset.machineName || "",
      category: machine.dataset.machineCategory || "",
      image: machine.dataset.machineImage || "/images/equipment/placeholder.svg",
      imageAlt: machine.dataset.machineImageAlt || ""
    });

    const updatePopoverContent = (machine) => {
      const data = machineData(machine);

      if (meta) {
        meta.textContent = `${data.id.toUpperCase()} / ${data.category}`;
      }

      if (title) {
        title.textContent = data.name;
      }

      if (image instanceof HTMLImageElement) {
        image.src = data.image;
        image.alt = data.imageAlt;
      }
    };

    const positionDesktopPopover = () => {
      if (!activeMachine || isCompact()) {
        popover.style.left = "";
        popover.style.top = "";
        return;
      }

      popover.hidden = false;
      const margin = 12;
      const targetRect = activeMachine.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const popupRect = popover.getBoundingClientRect();
      const stageMinLeft = stageRect.left + margin;
      const stageMaxRight = stageRect.right - margin;
      const minLeft = Math.max(margin, stageMinLeft);
      const maxLeft = Math.max(
        minLeft,
        Math.min(window.innerWidth - popupRect.width - margin, stageMaxRight - popupRect.width)
      );
      const preferredRight = targetRect.right + margin;
      const fallbackLeft = targetRect.left - popupRect.width - margin;
      const hasSpaceRight = preferredRight + popupRect.width <= maxLeft + popupRect.width;
      const absoluteLeft = clamp(hasSpaceRight ? preferredRight : fallbackLeft, minLeft, maxLeft);
      const absoluteTop = clamp(
        targetRect.top + targetRect.height / 2 - popupRect.height / 2,
        margin,
        Math.max(margin, window.innerHeight - popupRect.height - margin)
      );

      popover.style.left = `${absoluteLeft - stageRect.left}px`;
      popover.style.top = `${absoluteTop - stageRect.top}px`;
    };

    const setActiveMachine = (machine, options = {}) => {
      const nextLocked = Boolean(options.locked);
      activeMachine = machine;
      locked = nextLocked;
      lastFocusedMachine = machine;
      clearMachineStates();
      updatePopoverContent(machine);

      machine.setAttribute("data-active", "true");
      machine.setAttribute("aria-pressed", "true");
      machine.setAttribute("aria-expanded", "true");
      machine.setAttribute("aria-describedby", "gym-map-popover-title");

      popover.hidden = false;
      popover.dataset.locked = locked || isCompact() ? "true" : "false";
      popover.setAttribute("aria-modal", isCompact() ? "true" : "false");
      backdrop.hidden = !isCompact();
      root.dataset.gymMapOpen = "true";

      if (isCompact()) {
        popover.style.left = "";
        popover.style.top = "";
        if (closeButton instanceof HTMLElement) {
          focusWithoutScroll(closeButton);
        }
      } else {
        positionDesktopPopover();
      }
    };

    const closePopover = (options = {}) => {
      const shouldRestoreFocus = options.restoreFocus !== false;
      const focusTarget = lastFocusedMachine;

      activeMachine = null;
      locked = false;
      clearMachineStates();
      popover.hidden = true;
      popover.removeAttribute("data-locked");
      popover.removeAttribute("aria-modal");
      popover.style.left = "";
      popover.style.top = "";
      backdrop.hidden = true;
      root.removeAttribute("data-gym-map-open");

      if (shouldRestoreFocus && focusTarget) {
        isRestoringFocus = true;
        focusWithoutScroll(focusTarget);
        window.setTimeout(() => {
          isRestoringFocus = false;
        }, 0);
      }
    };

    const setZoom = (nextZoom, options = {}) => {
      const preserveCenter = options.preserveCenter !== false;
      const compact = isCompact();
      const currentWidth = canvas.getBoundingClientRect().width || baseWidth;
      const centerX = scroll.scrollLeft + scroll.clientWidth / 2;
      const centerY = scroll.scrollTop + scroll.clientHeight / 2;
      const ratioX = currentWidth ? centerX / currentWidth : 0.5;
      const currentHeight = canvas.getBoundingClientRect().height || baseWidth;
      const ratioY = currentHeight ? centerY / currentHeight : 0.5;

      zoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);

      if (compact) {
        canvas.style.width = `${baseWidth * zoom}px`;
      } else {
        canvas.style.width = "";
      }

      if (zoomLabel) {
        zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
      }

      window.requestAnimationFrame(() => {
        if (!preserveCenter) {
          return;
        }

        const newWidth = canvas.getBoundingClientRect().width || baseWidth;
        const newHeight = canvas.getBoundingClientRect().height || baseWidth;
        scroll.scrollLeft = ratioX * newWidth - scroll.clientWidth / 2;
        scroll.scrollTop = ratioY * newHeight - scroll.clientHeight / 2;
      });
    };

    const resetZoom = () => {
      setZoom(MIN_ZOOM, { preserveCenter: false });
      window.requestAnimationFrame(() => {
        scroll.scrollLeft = Math.max(0, (scroll.scrollWidth - scroll.clientWidth) / 2);
        scroll.scrollTop = Math.max(0, (scroll.scrollHeight - scroll.clientHeight) / 2);
      });
    };

    const setupMapSize = () => {
      baseWidth = Math.max(MOBILE_BASE_WIDTH, scroll.clientWidth);

      if (isCompact()) {
        setZoom(zoom || INITIAL_ZOOM, { preserveCenter: false });
        window.requestAnimationFrame(() => {
          scroll.scrollLeft = Math.max(0, (scroll.scrollWidth - scroll.clientWidth) * 0.52);
          scroll.scrollTop = Math.max(0, (scroll.scrollHeight - scroll.clientHeight) * 0.36);
        });
      } else {
        canvas.style.width = "";
        if (zoomLabel) {
          zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
        }
      }
    };

    machines.forEach((machine) => {
      machine.addEventListener("mouseenter", () => {
        if (finePointer.matches && !locked) {
          setActiveMachine(machine);
        }
      });

      machine.addEventListener("mouseleave", () => {
        if (finePointer.matches && !locked) {
          closePopover({ restoreFocus: false });
        }
      });

      machine.addEventListener("focus", () => {
        if (isRestoringFocus) {
          return;
        }

        if (!isCompact() && !locked) {
          setActiveMachine(machine);
        }
      });

      machine.addEventListener("blur", () => {
        window.setTimeout(() => {
          if (!locked && !isCompact() && !root.contains(document.activeElement)) {
            closePopover({ restoreFocus: false });
          }
        }, 0);
      });

      machine.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActiveMachine(machine, { locked: true });
          return;
        }

        if (event.key === "Escape") {
          event.preventDefault();
          closePopover();
        }
      });

      machine.addEventListener("click", (event) => {
        if (isCompact()) {
          return;
        }

        event.stopPropagation();
        setActiveMachine(machine, { locked: true });
      });

      machine.addEventListener("pointerdown", (event) => {
        if (!isCompact()) {
          return;
        }

        pointerStart = {
          id: machine.dataset.machineId,
          x: event.clientX,
          y: event.clientY,
          moved: false
        };
      });

      machine.addEventListener("pointermove", (event) => {
        if (!pointerStart || pointerStart.id !== machine.dataset.machineId) {
          return;
        }

        const distance = Math.hypot(
          event.clientX - pointerStart.x,
          event.clientY - pointerStart.y
        );

        if (distance > PAN_THRESHOLD) {
          pointerStart.moved = true;
        }
      });

      machine.addEventListener("pointerup", (event) => {
        if (!isCompact() || !pointerStart || pointerStart.id !== machine.dataset.machineId) {
          pointerStart = null;
          return;
        }

        const shouldOpen = !pointerStart.moved;
        pointerStart = null;

        if (shouldOpen) {
          event.preventDefault();
          setActiveMachine(machine, { locked: true });
        }
      });

      machine.addEventListener("pointercancel", () => {
        pointerStart = null;
      });
    });

    if (closeButton) {
      closeButton.addEventListener("click", () => closePopover());
    }

    backdrop.addEventListener("click", () => closePopover());

    document.addEventListener("pointerdown", (event) => {
      if (!locked || !activeMachine || isCompact()) {
        return;
      }

      const target = event.target;

      if (
        target instanceof Node &&
        !popover.contains(target) &&
        !activeMachine.contains(target)
      ) {
        closePopover({ restoreFocus: false });
      }
    });

    const handleEscape = (event) => {
      if (event.key === "Escape" && activeMachine) {
        event.preventDefault();
        closePopover();
      }
    };

    document.addEventListener("keydown", handleEscape);
    window.addEventListener("keydown", handleEscape);

    window.addEventListener("resize", () => {
      setupMapSize();
      positionDesktopPopover();
    });

    compactLayout.addEventListener("change", () => {
      closePopover({ restoreFocus: false });
      setupMapSize();
    });

    if (zoomOutButton) {
      zoomOutButton.addEventListener("click", () => setZoom(zoom - ZOOM_STEP));
    }

    if (zoomInButton) {
      zoomInButton.addEventListener("click", () => setZoom(zoom + ZOOM_STEP));
    }

    if (resetButton) {
      resetButton.addEventListener("click", resetZoom);
    }

    setupMapSize();
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGymFloorPlan, {
    once: true
  });
} else {
  initializeGymFloorPlan();
}
})();
