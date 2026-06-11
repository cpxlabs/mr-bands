import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const { state } = useApp();
  const { reducedMotion } = state;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dots = [];
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const buildDots = () => {
      dots.length = 0;
      const count = Math.max(20, Math.floor(window.innerWidth / 45));
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          s: Math.random() * 1.8 + 0.6,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 240, 255, 0.3)";
      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.s, 0, Math.PI * 2);
        ctx.fill();
      });
      if (!reducedMotion) animId = requestAnimationFrame(render);
    };

    const onResize = () => { resize(); buildDots(); };
    window.addEventListener("resize", onResize);

    resize();
    buildDots();
    render();

    return () => {
      window.removeEventListener("resize", onResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
