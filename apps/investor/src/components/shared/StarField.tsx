"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: [number, number, number];
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  hue: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Star color palette (RGB)
    const starColors: [number, number, number][] = [
      [255, 255, 255],     // Pure white
      [200, 220, 255],     // Blue-white
      [255, 240, 230],     // Warm white
      [180, 220, 255],     // Light blue
      [255, 200, 180],     // Warm
      [34, 211, 238],      // Cyan (accent)
      [168, 85, 247],      // Purple (accent)
      [236, 72, 153],      // Pink (accent)
    ];

    // Create stars
    const stars: Star[] = [];
    const starCount = Math.min(400, Math.floor((width * height) / 3000));

    for (let i = 0; i < starCount; i++) {
      // 90% normal colors, 10% accent colors
      const colorIndex = Math.random() < 0.9
        ? Math.floor(Math.random() * 5)
        : 5 + Math.floor(Math.random() * 3);

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        baseOpacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: starColors[colorIndex],
      });
    }

    // Shooting stars array
    const shootingStars: ShootingStar[] = [];

    const createShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.003) {
        const hue = [190, 280, 330][Math.floor(Math.random() * 3)]; // cyan, purple, or pink
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 150 + 80,
          speed: Math.random() * 20 + 15,
          opacity: 1,
          angle: Math.PI / 5 + (Math.random() - 0.5) * 0.4,
          hue,
        });
      }
    };

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016; // ~60fps
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset);
        const opacity = star.baseOpacity + twinkle * 0.3;
        const clampedOpacity = Math.max(0.1, Math.min(1, opacity));

        const [r, g, b] = star.color;

        // Draw glow
        if (star.size > 1) {
          const glowGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 4
          );
          glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${clampedOpacity * 0.4})`);
          glowGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${clampedOpacity * 0.1})`);
          glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }

        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${clampedOpacity})`;
        ctx.fill();

        // Add cross flare for bright stars
        if (star.size > 1.5 && clampedOpacity > 0.6) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${clampedOpacity * 0.3})`;
          ctx.lineWidth = 0.5;

          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 3, star.y);
          ctx.lineTo(star.x + star.size * 3, star.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(star.x, star.y - star.size * 3);
          ctx.lineTo(star.x, star.y + star.size * 3);
          ctx.stroke();
        }
      });

      // Create and animate shooting stars
      createShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];

        // Draw shooting star trail
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const gradient = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        gradient.addColorStop(0, `hsla(${ss.hue}, 80%, 70%, ${ss.opacity})`);
        gradient.addColorStop(0.2, `hsla(${ss.hue}, 70%, 60%, ${ss.opacity * 0.7})`);
        gradient.addColorStop(0.5, `hsla(${ss.hue}, 60%, 50%, ${ss.opacity * 0.3})`);
        gradient.addColorStop(1, `hsla(${ss.hue}, 50%, 40%, 0)`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw bright head
        const headGradient = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 6);
        headGradient.addColorStop(0, `hsla(${ss.hue}, 100%, 90%, ${ss.opacity})`);
        headGradient.addColorStop(0.5, `hsla(${ss.hue}, 80%, 70%, ${ss.opacity * 0.5})`);
        headGradient.addColorStop(1, `hsla(${ss.hue}, 60%, 50%, 0)`);

        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = headGradient;
        ctx.fill();

        // Update position
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.012;

        // Remove if off screen or faded
        if (ss.opacity <= 0 || ss.x > width + 100 || ss.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Base cosmic background gradient */}
      <div className="cosmic-bg" />

      {/* Aurora effect */}
      <div className="aurora" />

      {/* Nebula clouds */}
      <div className="nebula-container">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
        <div className="nebula nebula-4" />
        <div className="nebula nebula-5" />
      </div>

      {/* Cosmic dust particles */}
      <div className="cosmic-dust" />

      {/* Gradient mesh overlay */}
      <div className="gradient-mesh" />

      {/* Subtle grid */}
      <div className="space-grid" />

      {/* Star canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 7 }}
      />

      {/* Vignette effect */}
      <div className="vignette" />
    </>
  );
}
