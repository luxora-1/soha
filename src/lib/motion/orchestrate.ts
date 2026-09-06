/**
 * Motion for the whole site, in one place, driven by data attributes so the
 * sections themselves stay server components. Framework-free on purpose: the
 * same module runs inside React (see components/motion/MotionRoot.tsx) and
 * inside the static preview snapshot.
 *
 *   data-reveal            fade and short rise the first time it scrolls into view
 *   data-reveal-hero       part of the page-load choreography (data-delay in ms)
 *   data-split             headline whose lines rise out of a mask on load
 *   data-count             figure that counts up from zero ("91%", "1,200+")
 *   data-fill="0.91"       bar that fills to a fraction (scaleX)
 *   data-parallax="44"     drifts up by N px across its scroll through the viewport
 *   data-progress          reading-progress hairline (scaleX 0 → 1 over the page)
 *   data-header            gains data-scrolled once the page has moved 32px
 *   data-sticky            bottom bar that springs up after 640px of scrolling
 *   data-timeline          the eight-week story: pinned scrub on large screens, tabs elsewhere
 *
 * Reduced motion: every effect is skipped and the final state is shown; the
 * interactive pieces (header, sticky bar, timeline tabs) still work, without
 * animation. Breakpoint and preference changes revert and rebuild everything
 * through gsap.matchMedia().
 */
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin, DrawSVGPlugin);

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  // Inspection hook for development tooling only; stripped from production bundles.
  (window as unknown as { __motion?: unknown }).__motion = { gsap, ScrollTrigger };
}

type Cleanup = () => void;

const NUMBER = /^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/;
const EASE = "power3.out";

function all<T extends Element = HTMLElement>(root: ParentNode, selector: string): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

function ms(el: Element, name: string, fallback = 0): number {
  const value = Number((el as HTMLElement).dataset[name]);
  return Number.isFinite(value) ? value / 1000 : fallback;
}

/* ------------------------------------------------------------------------ */
/* Page-load choreography                                                    */
/* ------------------------------------------------------------------------ */

function heroIntro(root: ParentNode) {
  const headline = root.querySelector<HTMLElement>("[data-split]");
  const items = all(root, "[data-reveal-hero]");
  const tl = gsap.timeline({ defaults: { ease: EASE } });

  items.forEach((el) => {
    tl.fromTo(el, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, clearProps: "transform" }, ms(el, "delay"));
  });

  if (headline) {
    const delay = ms(headline, "delay", 0.2);
    SplitText.create(headline, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      aria: "auto",
      autoSplit: true,
      onSplit(self) {
        gsap.set(headline, { autoAlpha: 1 });
        return gsap.from(self.lines, { yPercent: 110, duration: 1, ease: EASE, stagger: 0.1, delay });
      },
    });
  }
}

/* ------------------------------------------------------------------------ */
/* Scroll-linked effects                                                     */
/* ------------------------------------------------------------------------ */

function reveals(root: ParentNode) {
  const targets = all(root, "[data-reveal]");
  if (!targets.length) return;
  gsap.set(targets, { autoAlpha: 0, y: 14 });
  ScrollTrigger.batch(targets, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        overwrite: true,
        onComplete: () => gsap.set(batch, { clearProps: "transform" }),
      });
    },
  });
}

function counts(root: ParentNode) {
  all(root, "[data-count]").forEach((el) => {
    // The final figure lives in the attribute, so a re-initialisation (React
    // strict mode, breakpoint change) can never read a half-counted value back
    // as the target. The text is reset to it by the matchMedia cleanup.
    const final = el.dataset.count || el.textContent || "";
    const match = NUMBER.exec(final);
    if (!match) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    if (!Number.isFinite(target) || target === 0) return;
    const decimals = (digits.split(".")[1] ?? "").length;
    const grouped = digits.includes(",");
    const format = (n: number) =>
      grouped ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : n.toFixed(decimals);
    const counter = { value: 0 };
    el.textContent = final;
    gsap.to(counter, {
      value: target,
      duration: 1.4,
      ease: "power2.out",
      delay: ms(el, "delay"),
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${format(counter.value)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = final;
      },
    });
  });
}

function resetCounts(root: ParentNode) {
  all(root, "[data-count]").forEach((el) => {
    if (el.dataset.count) el.textContent = el.dataset.count;
  });
}

function fills(root: ParentNode) {
  all(root, "[data-fill]").forEach((el) => {
    const value = Number(el.dataset.fill);
    if (!Number.isFinite(value)) return;
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: value, duration: 1.4, ease: "power2.out", delay: ms(el, "delay"), scrollTrigger: { trigger: el, start: "top 90%", once: true } },
    );
  });
}

function parallax(root: ParentNode) {
  all(root, "[data-parallax]").forEach((el) => {
    const distance = Number(el.dataset.parallax) || 40;
    gsap.to(el, { y: -distance, ease: "none", scrollTrigger: { trigger: el, start: "clamp(top bottom)", end: "clamp(bottom top)", scrub: true } });
  });
}

function progress(root: ParentNode) {
  const bar = root.querySelector<HTMLElement>("[data-progress]");
  if (!bar) return;
  gsap.fromTo(bar, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.4 } });
}

/* ------------------------------------------------------------------------ */
/* Chrome that works with or without motion                                 */
/* ------------------------------------------------------------------------ */

function header(root: ParentNode) {
  const el = root.querySelector<HTMLElement>("[data-header]");
  if (!el) return;
  const apply = (on: boolean) => el.toggleAttribute("data-scrolled", on);
  const trigger = ScrollTrigger.create({ start: 32, end: "max", onToggle: (self) => apply(self.isActive) });
  apply(trigger.isActive);
}

function sticky(root: ParentNode, animate: boolean) {
  const bar = root.querySelector<HTMLElement>("[data-sticky]");
  if (!bar) return;
  const show = (on: boolean) => {
    bar.setAttribute("aria-hidden", String(!on));
    bar.toggleAttribute("inert", !on);
    if (animate) {
      gsap.to(bar, { yPercent: on ? 0 : 115, duration: on ? 0.55 : 0.35, ease: on ? "back.out(1.2)" : "power2.in", overwrite: true });
    } else {
      gsap.set(bar, { yPercent: on ? 0 : 115 });
    }
  };
  // Parked below the viewport, then made visible: the stylesheet keeps it hidden until this runs.
  gsap.set(bar, { yPercent: 115, autoAlpha: 1 });
  const trigger = ScrollTrigger.create({ start: 640, end: "max", onToggle: (self) => show(self.isActive) });
  show(trigger.isActive);
}

/* ------------------------------------------------------------------------ */
/* The eight-week timeline                                                   */
/* ------------------------------------------------------------------------ */

function timeline(section: HTMLElement, options: { pin: boolean; animate: boolean }): Cleanup {
  const images = all(section, "[data-timeline-image]");
  const panels = all(section, "[data-timeline-panel]");
  const tabs = all<HTMLButtonElement>(section, "[data-timeline-tab]");
  const dots = all(section, "[data-timeline-dot]");
  const rail = section.querySelector<HTMLElement>("[data-timeline-rail]");
  const path = section.querySelector<SVGPathElement>("[data-timeline-path]");
  const pinTarget = section.querySelector<HTMLElement>("[data-timeline-pin]");
  const count = tabs.length;
  const last = count - 1;
  if (count < 2 || images.length !== count || panels.length !== count) return () => undefined;

  let active = 0;
  const applyState = (index: number) => {
    active = index;
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      tab.dataset.active = String(on);
    });
    panels.forEach((panel, i) => {
      const on = i === index;
      panel.dataset.active = String(on);
      panel.setAttribute("aria-hidden", String(!on));
      if (on) panel.removeAttribute("inert");
      else panel.setAttribute("inert", "");
    });
    images.forEach((image, i) => (image.dataset.active = String(i === index)));
    dots.forEach((dot, i) => (dot.dataset.active = String(i === index)));
  };

  const fraction = (index: number) => index / last;
  gsap.set(images, { autoAlpha: (i: number) => (i === 0 ? 1 : 0) });
  gsap.set(panels, { autoAlpha: (i: number) => (i === 0 ? 1 : 0) });
  if (rail) gsap.set(rail, { scaleX: 0, transformOrigin: "left center" });
  applyState(0);

  let scrubbed: gsap.core.Timeline | null = null;

  if (options.pin && options.animate && pinTarget) {
    if (path) gsap.set(path, { drawSVG: "0% 0%" });
    scrubbed = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: pinTarget,
        pin: true,
        start: "top top+=104",
        end: () => `+=${Math.round(window.innerHeight * 0.6) * last}`,
        scrub: 0.6,
        snap: { snapTo: "labels", inertia: false, duration: { min: 0.2, max: 0.6 }, delay: 0.05, ease: "power1.inOut" },
        onUpdate: (self) => applyState(Math.round(self.progress * last)),
      },
    });
    scrubbed.addLabel("w0", 0);
    for (let i = 0; i < last; i++) {
      const at = i;
      scrubbed
        .to(images[i], { autoAlpha: 0, duration: 0.6 }, at + 0.2)
        .to(images[i + 1], { autoAlpha: 1, duration: 0.6 }, at + 0.2)
        .to(panels[i], { autoAlpha: 0, y: -12, duration: 0.35 }, at)
        .fromTo(panels[i + 1], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, immediateRender: false }, at + 0.4);
      if (rail) scrubbed.to(rail, { scaleX: fraction(i + 1), duration: 1 }, at);
      if (path) scrubbed.to(path, { drawSVG: `0% ${fraction(i + 1) * 100}%`, duration: 1 }, at);
      scrubbed.addLabel(`w${i + 1}`, at + 1);
    }
    if (dots.length) {
      gsap.from(dots, { scale: 0, duration: 0.4, ease: "back.out(2)", stagger: 0.1, delay: 0.3, scrollTrigger: { trigger: section, start: "top 75%", once: true } });
    }
  } else if (options.animate) {
    if (path) {
      gsap.fromTo(path, { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1.8, ease: "power2.inOut", scrollTrigger: { trigger: section, start: "top 75%", once: true } });
    }
    if (dots.length) {
      gsap.from(dots, { scale: 0, duration: 0.4, ease: "back.out(2)", stagger: 0.1, delay: 0.5, scrollTrigger: { trigger: section, start: "top 75%", once: true } });
    }
  } else if (path) {
    gsap.set(path, { drawSVG: "0% 100%" });
  }

  const go = (raw: number) => {
    const index = gsap.utils.clamp(0, last, raw);
    if (scrubbed?.scrollTrigger) {
      const st = scrubbed.scrollTrigger;
      gsap.to(window, { scrollTo: { y: Math.round(st.start + (st.end - st.start) * fraction(index)) }, duration: 0.6, ease: "power2.inOut", overwrite: true });
      return;
    }
    if (index === active) return;
    const previous = active;
    applyState(index);
    if (options.animate) {
      gsap.to(images[previous], { autoAlpha: 0, duration: 0.4, overwrite: true });
      gsap.to(images[index], { autoAlpha: 1, duration: 0.4, overwrite: true });
      gsap.to(panels[previous], { autoAlpha: 0, y: -8, duration: 0.25, overwrite: true });
      gsap.fromTo(panels[index], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.35, delay: 0.15, overwrite: true });
      if (rail) gsap.to(rail, { scaleX: fraction(index), duration: 0.5, ease: "power2.out" });
    } else {
      gsap.set(images, { autoAlpha: (i: number) => (i === index ? 1 : 0) });
      gsap.set(panels, { autoAlpha: (i: number) => (i === index ? 1 : 0), y: 0 });
      if (rail) gsap.set(rail, { scaleX: fraction(index) });
    }
  };

  const listeners: Cleanup[] = [];
  tabs.forEach((tab, i) => {
    const onClick = () => go(i);
    const onKey = (event: KeyboardEvent) => {
      let next: number | null = null;
      if (event.key === "ArrowRight") next = (i + 1) % count;
      else if (event.key === "ArrowLeft") next = (i - 1 + count) % count;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = last;
      if (next === null) return;
      event.preventDefault();
      go(next);
      tabs[next].focus();
    };
    tab.addEventListener("click", onClick);
    tab.addEventListener("keydown", onKey);
    listeners.push(() => {
      tab.removeEventListener("click", onClick);
      tab.removeEventListener("keydown", onKey);
    });
  });
  return () => listeners.forEach((off) => off());
}

/* ------------------------------------------------------------------------ */

/**
 * Wire every motion behaviour under `root`. Returns a function that reverts
 * all of it (animations, ScrollTriggers, split text, listeners).
 */
export function initMotion(root: ParentNode = document): Cleanup {
  const mm = gsap.matchMedia();
  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
      desktop: "(min-width: 1024px)",
    },
    (context) => {
      const conditions = context.conditions as { motion: boolean; desktop: boolean };
      const animate = conditions.motion;
      const cleanups: Cleanup[] = [];

      header(root);
      sticky(root, animate);
      all(root, "[data-timeline]").forEach((section) => cleanups.push(timeline(section, { pin: conditions.desktop, animate })));

      if (animate) {
        heroIntro(root);
        reveals(root);
        counts(root);
        fills(root);
        parallax(root);
        progress(root);
      } else {
        gsap.set(all(root, "[data-reveal], [data-reveal-hero], [data-split]"), { clearProps: "all" });
        gsap.set(all(root, "[data-fill]"), { scaleX: (_i: number, el: Element) => Number((el as HTMLElement).dataset.fill) || 1, transformOrigin: "left center" });
        gsap.set(all(root, "[data-progress]"), { scaleX: 0 });
      }

      return () => {
        cleanups.forEach((fn) => fn());
        resetCounts(root);
      };
    },
  );
  return () => mm.revert();
}
