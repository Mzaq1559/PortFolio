import { useEffect, useRef } from 'react';

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Particle system
    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;

      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.speedZ = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z -= this.speedZ;

        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * canvas.offsetWidth;
          this.y = Math.random() * canvas.offsetHeight;
        }

        if (this.x < 0 || this.x > canvas.offsetWidth) {
          this.speedX *= -1;
        }
        if (this.y < 0 || this.y > canvas.offsetHeight) {
          this.speedY *= -1;
        }
      }

      draw() {
        if (!ctx) return;
        
        const scale = 1000 / (1000 - this.z);
        const x2d = (this.x - canvas.offsetWidth / 2) * scale + canvas.offsetWidth / 2;
        const y2d = (this.y - canvas.offsetHeight / 2) * scale + canvas.offsetHeight / 2;
        const size2d = this.size * scale;

        const opacity = 1 - this.z / 1000;
        ctx.fillStyle = `rgba(110, 231, 247, ${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Floating geometry
    class FloatingShape {
      x: number;
      y: number;
      rotation: number;
      rotationSpeed: number;
      floatOffset: number;
      floatSpeed: number;

      constructor() {
        this.x = canvas.offsetWidth / 2;
        this.y = canvas.offsetHeight / 2;
        this.rotation = 0;
        this.rotationSpeed = 0.01;
        this.floatOffset = 0;
        this.floatSpeed = 0.02;
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.floatOffset += this.floatSpeed;
      }

      draw() {
        if (!ctx) return;

        const size = 80;
        const float = Math.sin(this.floatOffset) * 20;

        ctx.save();
        ctx.translate(this.x, this.y + float);
        ctx.rotate(this.rotation);

        // Draw icosahedron wireframe (simplified as hexagon)
        ctx.strokeStyle = '#6EE7F7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.cos(angle) * size;
          const y = Math.sin(angle) * size;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();

        // Inner lines
        ctx.strokeStyle = '#A78BFA';
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.cos(angle) * size;
          const y = Math.sin(angle) * size;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // Create particles and shape
    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
    const shape = new FloatingShape();

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Update and draw shape
      shape.update();
      shape.draw();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}