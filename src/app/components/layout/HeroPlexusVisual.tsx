import { useEffect, useRef, useCallback, type MouseEvent } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/** Cyan / purple plexus sphere — mouse-influenced rotation (canvas 2D). */
export function HeroPlexusVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, in: false });
  const prefersReducedMotion = useReducedMotion();

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
      in: true
    };
  }, []);

  const onLeave = useCallback(() => {
    mouseRef.current.in = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CYAN = '#6EE7F7';
    const PURPLE = '#A78BFA';
    const BG = 'rgba(10, 10, 15, 0.92)';

    const n = 72;
    const points: { x: number; y: number; z: number; hue: 'c' | 'p' }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      points.push({
        x: Math.cos(th) * rad,
        y,
        z: Math.sin(th) * rad,
        hue: i % 2 === 0 ? 'c' : 'p'
      });
    }

    let rotX = 0.2;
    let rotY = 0.35;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const rotateY = (x: number, y: number, z: number, a: number) => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return { x: x * c + z * s, y, z: -x * s + z * c };
    };

    const rotateX = (x: number, y: number, z: number, a: number) => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return { x, y: y * c - z * s, z: y * s + z * c };
    };

    const project = (x: number, y: number, z: number) => {
      const persp = 3.2;
      const s = persp / (persp + z);
      return { px: w * 0.5 + x * s * (w * 0.42), py: h * 0.5 + y * s * (h * 0.42), z, s };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawDotGrid = () => {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.12)';
      const step = 22;
      for (let gx = 0; gx < w + step; gx += step) {
        for (let gy = 0; gy < h + step; gy += step) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const maxEdge = 0.42;

    const frame = () => {
      const m = mouseRef.current;
      if (!prefersReducedMotion) {
        rotY += 0.003 + (m.in ? m.x * 0.004 : 0);
        rotX += 0.0015 + (m.in ? m.y * -0.003 : 0);
      }

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);
      drawDotGrid();

      ctx.strokeStyle = 'rgba(110, 231, 247, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, Math.min(w, h) * 0.38, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, Math.min(w, h) * 0.28, 0, Math.PI * 2);
      ctx.stroke();

      const rotPts: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < n; i++) {
        let { x, y, z } = points[i];
        const r1 = rotateY(x, y, z, rotY);
        x = r1.x;
        y = r1.y;
        z = r1.z;
        const r2 = rotateX(x, y, z, rotX);
        rotPts.push({ x: r2.x, y: r2.y, z: r2.z });
      }

      type Scr = { px: number; py: number; z: number; s: number; hue: 'c' | 'p' };
      const screen: Scr[] = [];
      for (let i = 0; i < n; i++) {
        const { x, y, z } = rotPts[i];
        screen.push({
          ...project(x * 1.05, y * 1.05, z * 1.05),
          hue: points[i].hue
        });
      }

      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const dx = rotPts[i].x - rotPts[j].x;
          const dy = rotPts[i].y - rotPts[j].y;
          const dz = rotPts[i].z - rotPts[j].z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d > maxEdge) continue;
          const a = screen[i];
          const b = screen[j];
          const midZ = (a.z + b.z) / 2;
          const alpha = Math.max(0.12, 0.45 - midZ * 0.08);
          ctx.strokeStyle =
            (i + j) % 2 === 0
              ? `rgba(110, 231, 247, ${alpha})`
              : `rgba(167, 139, 250, ${alpha})`;
          ctx.lineWidth = 0.8 + (a.s + b.s) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.px, a.py);
          ctx.lineTo(b.px, b.py);
          ctx.stroke();
        }
      }

      const order = screen
        .map((s, idx) => ({ idx, z: s.z }))
        .sort((a, b) => a.z - b.z);

      for (const { idx } of order) {
        const p = screen[idx];
        const col = p.hue === 'c' ? CYAN : PURPLE;
        const r = 2 + p.s * 3.5;
        const glow = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 4);
        glow.addColorStop(0, col);
        glow.addColorStop(0.4, `${col}88`);
        glow.addColorStop(1, `${col}00`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.px, p.py, r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden border-2 border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-sm"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      role="img"
      aria-label="Interactive network visualization"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block touch-none" />
      <p
        className="absolute bottom-4 left-0 right-0 text-center font-mono text-xs pointer-events-none"
        style={{ color: 'var(--text-secondary)' }}
      >
        Move cursor to rotate · Plexus network
      </p>
    </div>
  );
}
