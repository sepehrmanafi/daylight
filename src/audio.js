// Daylight Audio Engine - Pure Web Audio API ambient soundscapes and gentle chimes
// Zero external network dependencies, works 100% offline.

let audioCtx = null;
let currentAmbient = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a crystal-clear meditation bowl / singing chime upon focus completion or task win
export function playChime(type = "focus-complete") {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === "focus-complete") {
      // Harmonic Tibetan Singing Bell (fundamental + overtone + shimmer)
      const freqs = [528, 1056, 1584, 2112];
      const gains = [0.35, 0.18, 0.09, 0.04];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);
        // Subtle natural detuning
        osc.frequency.exponentialRampToValueAtTime(f * 0.998, now + 3.5);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(gains[idx], now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 4.0);
      });
    } else if (type === "gentle-click") {
      // Soft woodblock click for slider interaction
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "task-celebrate") {
      // Soft ascending 3-note sparkle chime
      const notes = [587.33, 739.99, 880]; // D5, F#5, A5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + i * 0.08;
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);
        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.65);
      });
    }
  } catch (err) {
    console.warn("Daylight audio notice:", err);
  }
}

// Generate rich ambient multi-layered soundscapes
export function startAmbientSound(mode = "brown", volume = 0.5) {
  stopAmbientSound();
  try {
    const ctx = getAudioContext();
    if (!ctx) return null;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(Math.min(1, Math.max(0, volume * 0.4)), ctx.currentTime + 0.5);
    masterGain.connect(ctx.destination);

    const nodes = [masterGain];

    if (mode === "brown") {
      // Deep Brown Noise with gentle warm resonant filter
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < data.length; i++) {
        last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
        data[i] = last * 4;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(450, ctx.currentTime);

      noise.connect(lowpass);
      lowpass.connect(masterGain);
      noise.start();
      nodes.push(noise, lowpass);
    } else if (mode === "rain") {
      // Gentle warm rainfall (filtered pink noise + dynamic droplets)
      const buffer = ctx.createBuffer(2, ctx.sampleRate * 4, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = buffer.getChannelData(ch);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < data.length; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2 + white * 0.1) * 0.28;
        }
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.setValueAtTime(0.7, ctx.currentTime);

      noise.connect(filter);
      filter.connect(masterGain);
      noise.start();
      nodes.push(noise, filter);
    } else if (mode === "forest") {
      // Forest breeze + subtle harmonic singing tone
      const buffer = ctx.createBuffer(2, ctx.sampleRate * 4, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = buffer.getChannelData(ch);
        let last = 0;
        for (let i = 0; i < data.length; i++) {
          last = (last + 0.012 * (Math.random() * 2 - 1)) / 1.012;
          data[i] = last * 3.5;
        }
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Slow LFO wind modulation
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
      lfoGain.gain.setValueAtTime(150, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      noise.connect(filter);
      filter.connect(masterGain);

      lfo.start();
      noise.start();
      nodes.push(noise, lfo, lfoGain, filter);
    } else if (mode === "binaural") {
      // 432 Hz Alpha wave binaural drone for calm deep concentration
      const baseFreq = 216; // A3 harmonic
      const beatFreq = 10; // 10 Hz Alpha wave

      const oscL = ctx.createOscillator();
      const oscR = ctx.createOscillator();
      const merger = ctx.createChannelMerger(2);

      oscL.type = "sine";
      oscL.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      oscR.type = "sine";
      oscR.frequency.setValueAtTime(baseFreq + beatFreq, ctx.currentTime);

      const gainL = ctx.createGain();
      const gainR = ctx.createGain();
      gainL.gain.value = 0.15;
      gainR.gain.value = 0.15;

      oscL.connect(gainL);
      gainR.connect(merger, 0, 1);
      gainL.connect(merger, 0, 0);
      oscR.connect(gainR);

      merger.connect(masterGain);
      oscL.start();
      oscR.start();
      nodes.push(oscL, oscR, gainL, gainR, merger);
    }

    currentAmbient = {
      mode,
      masterGain,
      nodes,
      setVolume: (v) => {
        masterGain.gain.setTargetAtTime(Math.min(1, Math.max(0, v * 0.4)), ctx.currentTime, 0.1);
      },
      stop: () => {
        try {
          masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
          setTimeout(() => {
            nodes.forEach((n) => {
              try { if (n.stop) n.stop(); } catch {}
              try { if (n.disconnect) n.disconnect(); } catch {}
            });
          }, 350);
        } catch {}
      },
    };
    return currentAmbient;
  } catch (err) {
    console.warn("Ambient audio error:", err);
    return null;
  }
}

export function stopAmbientSound() {
  if (currentAmbient) {
    currentAmbient.stop();
    currentAmbient = null;
  }
}
