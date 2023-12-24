import { useEffect } from "react";

export const useHeaderVisibilityOnScroll = (elementId: string) => {
  useEffect(() => {
    let prevScrollpos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const header = document.getElementById(elementId) as HTMLElement;

      if (prevScrollpos > currentScrollPos) {
        header.style.opacity = "1";
        header.style.pointerEvents = "auto";
      } else {
        header.style.opacity = "0";
        header.style.pointerEvents = "none";
      }

      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elementId]);
};
