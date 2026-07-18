// @ts-nocheck
const dayMap = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7
};

const highlightCurrentDay = () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Europe/Sarajevo"
  });

  const todayKey = formatter.format(new Date());
  const todayIndex = dayMap[todayKey];

  if (!todayIndex) {
    return;
  }

  document
    .querySelectorAll(`[data-day-index="${todayIndex}"]`)
    .forEach((element) => {
      if (element instanceof HTMLElement) {
        element.dataset.today = "true";
      }
    });

  const group = todayIndex >= 6 ? "weekend" : "weekday";

  document
    .querySelectorAll(`[data-day-group="${group}"]`)
    .forEach((element) => {
      if (element instanceof HTMLElement) {
        element.dataset.today = "true";
      }
    });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", highlightCurrentDay, {
    once: true
  });
} else {
  highlightCurrentDay();
}
