import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Music2 } from 'lucide-react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/* ─── helpers ─────────────────────────────────────────────────── */
function fmt(s: number) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

const BAR_COUNT = 22;

/* ─── component ────────────────────────────────────────────────── */
export function MusicPlayerWidget() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceCreatedRef = useRef(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  /* ── canvas draw loop ──────────────────────────────────────── */
  const drawBars = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const barW = (W / BAR_COUNT) * 0.65;
    const gap = (W / BAR_COUNT) * 0.35;

    for (let i = 0; i < BAR_COUNT; i++) {
      const dataIdx = Math.floor((i / BAR_COUNT) * bufferLength * 0.7);
      const value = dataArray[dataIdx] / 255;
      const barH = Math.max(3, value * H * 0.9);
      const x = i * (barW + gap);
      const y = H - barH;

      // gradient: teal → coral
      const grad = ctx.createLinearGradient(x, H, x, y);
      grad.addColorStop(0, 'rgba(77,191,176,0.75)');
      grad.addColorStop(1, 'rgba(244,168,184,0.55)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [2, 2, 0, 0]);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(drawBars);
  }, []);

  /* ── static idle bars (no motion) ─────────────────────────── */
  const drawIdleBars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const barW = (W / BAR_COUNT) * 0.65;
    const gap = (W / BAR_COUNT) * 0.35;

    // gentle sine-shaped idle state
    for (let i = 0; i < BAR_COUNT; i++) {
      const norm = Math.sin((i / BAR_COUNT) * Math.PI);
      const barH = Math.max(3, norm * H * 0.35);
      const x = i * (barW + gap);
      const y = H - barH;
      ctx.fillStyle = 'rgba(77,191,176,0.25)';
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [2, 2, 0, 0]);
      ctx.fill();
    }
  }, []);

  /* ── set up (or resume) Web Audio API on first play ──────── */
  const ensureAudioContext = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || sourceCreatedRef.current) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.8;
    analyserRef.current = analyser;

    const source = ctx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(ctx.destination);

    sourceCreatedRef.current = true;
  }, []);

  /* ── play / pause toggle ────────────────────────────────── */
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(rafRef.current);
      setIsPlaying(false);
      if (!prefersReducedMotion) drawIdleBars();
    } else {
      try {
        ensureAudioContext();
        if (audioCtxRef.current?.state === 'suspended') {
          await audioCtxRef.current.resume();
        }
        await audio.play();
        setIsPlaying(true);
        if (!prefersReducedMotion) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(drawBars);
        }
      } catch (err) {
        console.warn('[MusicPlayer] play() failed:', err);
      }
    }
  }, [isPlaying, prefersReducedMotion, drawBars, drawIdleBars, ensureAudioContext]);

  /* ── audio element event handlers ──────────────────────── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setDuration(audio.duration);
      setIsReady(true);
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      cancelAnimationFrame(rafRef.current);
      if (!prefersReducedMotion) drawIdleBars();
    };

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    // If metadata already loaded (cached)
    if (audio.readyState >= 1) onLoaded();

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [prefersReducedMotion, drawIdleBars]);

  /* ── initial idle bars on mount ────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // small delay to let canvas render with correct dimensions
    const id = setTimeout(() => drawIdleBars(), 50);
    return () => clearTimeout(id);
  }, [drawIdleBars]);

  /* ── cleanup on unmount ─────────────────────────────────── */
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  /* ── seek on click ──────────────────────────────────────── */
  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      const bar = progressBarRef.current;
      if (!audio || !bar || !duration) return;

      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.currentTime = ratio * duration;
      setCurrentTime(ratio * duration);
    },
    [duration]
  );

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="flex flex-col gap-3">
      {/* hidden audio element */}
      <audio ref={audioRef} src="/audio/fireworks.mp3" preload="metadata" />

      {/* track row */}
      <div className="flex items-center gap-3">
        {/* play/pause button */}
        <motion.button
          type="button"
          onClick={togglePlay}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: 'linear-gradient(135deg, var(--accent-primary), #6ec9bd)',
            color: '#fff',
            boxShadow: '0 4px 16px var(--accent-glow)'
          }}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.06 }}
          aria-label={isPlaying ? 'Pause Fireworks' : 'Play Fireworks'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 pl-0.5" />}
        </motion.button>

        {/* track info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Music2 className="w-3 h-3 shrink-0" style={{ color: 'var(--accent-primary)' }} />
            <p className="font-display font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
              Fireworks
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            {isReady ? 'Focus playlist · chill' : 'Loading…'}
          </p>
        </div>

        {/* time display */}
        <p className="font-mono text-[10px] shrink-0 tabular-nums" style={{ color: 'var(--text-secondary)' }}>
          {fmt(currentTime)}<span className="opacity-40"> / </span>{fmt(duration)}
        </p>
      </div>

      {/* visualizer + progress stacked */}
      <div className="relative rounded-xl overflow-hidden" style={{ height: 52 }}>
        {/* canvas visualizer */}
        <canvas
          ref={canvasRef}
          width={400}
          height={52}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: prefersReducedMotion ? 0.18 : 1 }}
        />

        {/* progress bar overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-1 pb-1">
          <div
            ref={progressBarRef}
            className="h-1.5 rounded-full overflow-hidden cursor-pointer"
            style={{ background: 'rgba(77,191,176,0.18)' }}
            onClick={handleSeek}
            role="slider"
            aria-label="Seek"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full rounded-full origin-left"
              style={{
                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-second))',
                scaleX: progress
              }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </div>
        </div>

        {/* subtle gradient overlay so text behind is readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,0.12) 0%, transparent 60%)'
          }}
        />
      </div>
    </div>
  );
}
