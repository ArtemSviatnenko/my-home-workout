import { useRef, useCallback } from "react";

export function useWorkoutAudio() {
  const ctxRef = useRef<AudioContext | null>(null);

  function getCtx(): AudioContext {
    if (!ctxRef.current || ctxRef.current.state === "closed") {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }

  function playTone(freq: number, startTime: number, duration: number) {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.4, startTime + 0.01);
    gain.gain.setValueAtTime(0.4, startTime + duration - 0.05);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  const playWorkoutStart = useCallback(() => {
    const ctx = getCtx();
    const t = ctx.currentTime;
    playTone(523, t, 0.15);       // C5
    playTone(659, t + 0.18, 0.15); // E5
    playTone(784, t + 0.36, 0.25); // G5
  }, []);

  const playExerciseStart = useCallback(() => {
    const ctx = getCtx();
    playTone(659, ctx.currentTime, 0.3); // E5
  }, []);

  const playRestStart = useCallback(() => {
    const ctx = getCtx();
    playTone(330, ctx.currentTime, 0.4); // E4
  }, []);

  const playHalfwayBeep = useCallback(() => {
    const ctx = getCtx();
    const t = ctx.currentTime;
    playTone(440, t, 0.1);        // A4
    playTone(440, t + 0.15, 0.1); // A4
  }, []);

  const playCountdownBeep = useCallback(() => {
    const ctx = getCtx();
    playTone(523, ctx.currentTime, 0.12); // C5
  }, []);

  const playComplete = useCallback(() => {
    const ctx = getCtx();
    const t = ctx.currentTime;
    playTone(523,  t, 0.15);
    playTone(659,  t + 0.18, 0.15);
    playTone(784,  t + 0.36, 0.15);
    playTone(1047, t + 0.54, 0.35);
  }, []);

  // Two descending tones — signals cancellation
  const playStop = useCallback(() => {
    const ctx = getCtx();
    const t = ctx.currentTime;
    playTone(440, t, 0.15);        // A4
    playTone(330, t + 0.18, 0.25); // E4
  }, []);

  return { playWorkoutStart, playExerciseStart, playRestStart, playHalfwayBeep, playCountdownBeep, playComplete, playStop };
}
