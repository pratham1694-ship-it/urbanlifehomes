import { useRef, useEffect, useState } from "react";

export default function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 1000,
  outDelay = 0,
  outDuration = 600,
  threshold = 0,
  once = false,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const prevVisible = useRef(false);
  const direction = useRef("in");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => setVisible(true);

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);

    // Fail-safe: reveal as soon as any part of the element enters the
    // viewport, even if the observer misses its callback.
    const failSafe = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) show();
    };
    window.addEventListener("scroll", failSafe, { passive: true });
    window.addEventListener("resize", failSafe, { passive: true });
    failSafe();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", failSafe);
      window.removeEventListener("resize", failSafe);
    };
  }, [threshold, once]);

  if (prevVisible.current !== visible) {
    direction.current = visible ? "in" : "out";
    prevVisible.current = visible;
  }

  const exiting = direction.current === "out";
  const style = {
    "--sr-duration": exiting ? `${outDuration}ms` : `${duration}ms`,
    "--sr-delay": exiting ? `${outDelay}ms` : `${delay}ms`,
    "--sr-easing": "cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal--${animation} ${visible ? "scroll-reveal--visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
