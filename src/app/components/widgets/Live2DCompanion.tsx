import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import avatarImg from '../../../avatar.png';

declare global {
  interface Window {
    loadlive2d?: (canvasId: string, modelUrl: string) => void;
  }
}

type Status = 'idle' | 'loading' | 'ready' | 'error';

let scriptPromise: Promise<void> | null = null;

function loadLive2DScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  if (typeof window !== 'undefined' && window.loadlive2d) {
    return Promise.resolve();
  }

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[src*="live2d.min.js"]');
    if (existingScript) {
      if (window.loadlive2d) {
        resolve();
        return;
      }
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', (err) => {
        scriptPromise = null;
        reject(err);
      }, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/live2d.min.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => {
      scriptPromise = null;
      reject(err);
    };
    document.body.appendChild(script);
  });

  return scriptPromise;
}

export function Live2DCompanion() {
  const [status, setStatus] = useState<Status>('idle');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cancelledRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    cancelledRef.current = false;
    let timer1: ReturnType<typeof setTimeout> | null = null;
    let timer2: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          if (cancelledRef.current) return;
          setStatus('loading');

          loadLive2DScript()
            .then(() => {
              if (cancelledRef.current) return;
              timer1 = setTimeout(() => {
                if (cancelledRef.current) return;
                if (window.loadlive2d) {
                  try {
                    window.loadlive2d('live2d', 'https://unpkg.com/live2d-widget-model-haruto/assets/haruto.model.json');
                    timer2 = setTimeout(() => {
                      if (cancelledRef.current) return;
                      setStatus('ready');
                    }, 800);
                  } catch (err) {
                    console.error('Failed to initialize Live2D model:', err);
                    if (!cancelledRef.current) setStatus('error');
                  }
                } else {
                  if (!cancelledRef.current) setStatus('error');
                }
              }, 500);
            })
            .catch((err) => {
              console.error('Failed to load Live2D script:', err);
              if (!cancelledRef.current) setStatus('error');
            });
        }
      },
      { rootMargin: '300px' }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      cancelledRef.current = true;
      observer.disconnect();
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[280px] aspect-[4/5] mx-auto flex items-center justify-center">
      {/* Live2D Canvas - always present in DOM from initial render */}
      <canvas
        id="live2d"
        width={280}
        height={350}
        role="img"
        aria-label="Interactive anime avatar that follows your cursor"
        className={`w-full h-full object-contain cursor-crosshair ${
          status === 'ready' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.12))',
          transition: prefersReducedMotion ? 'none' : 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}
      />

      {/* Loading Overlay */}
      {(status === 'idle' || status === 'loading') && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
          <Loader2
            className="w-8 h-8 animate-spin mb-3"
            style={{ color: 'var(--accent-primary)' }}
          />
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--text-secondary)' }}
          >
            Summoning Companion...
          </span>
        </div>
      )}

      {/* Error Fallback Overlay */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <img
            src={avatarImg}
            alt="Companion fallback avatar"
            className="w-24 h-24 rounded-full object-cover border-2 mb-3 shadow-md"
            style={{ borderColor: 'var(--accent-primary)' }}
          />
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--text-secondary)' }}
          >
            Companion unavailable
          </span>
        </div>
      )}
    </div>
  );
}
