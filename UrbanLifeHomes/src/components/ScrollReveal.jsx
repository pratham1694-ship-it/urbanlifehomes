import { useRef, useEffect, useState } from "react";

export default function ScrollReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 1000,
  outDelay = 0,
  outDuration = 600,
  threshold = 0.15,
  once = false,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const prevVisible = useRef(false);
  const direction = useRef("in");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
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
