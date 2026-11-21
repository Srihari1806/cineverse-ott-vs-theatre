import { useEffect, useState } from "react";

/**
 * Canvas textures get painted before the webfonts finish downloading, which
 * would silently drop marquee lettering onto a system serif. Every texture
 * factory therefore takes this flag as a dependency and repaints once the
 * display faces have landed.
 */
export function useFontsReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fonts = typeof document !== "undefined" ? document.fonts : undefined;

    if (!fonts) {
      setReady(true);
      return;
    }

    const markReady = () => {
      if (!cancelled) setReady(true);
    };

    // `Bebas Neue` is the display face and `Barlow` the body face; both are
    // loaded from Google Fonts in the root route head.
    Promise.all([
      fonts.load('400 96px "Bebas Neue"').catch(() => null),
      fonts.load('600 32px "Barlow"').catch(() => null),
      fonts.ready,
    ]).then(markReady);

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
