import { useEffect } from "react";

/**
 * Forces the page to open at the top. Without this the browser restores the
 * previous scroll offset, and a leftover hash (e.g. `#twin-assistant` from
 * clicking a nav link before a reload) makes it jump to that anchor instead.
 */
export function useScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo(0, 0);

    // Images and fonts landing after the first paint can shift layout and make
    // some browsers re-apply anchor scrolling, so re-assert once it settles.
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, []);
}
