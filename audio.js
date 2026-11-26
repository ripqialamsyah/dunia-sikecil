// Rich procedural Web Audio synthesizer + optional real MP3 support + Indonesian Speech (id-ID)
class SoundEngine {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.master = null;
    this.noiseBuffer = null;
    this.idVoice = null;
    this.pentatonic = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    this.noteIndex = 0;

    this.availableRealSounds = new Set([
      'airplane.mp3', 'bicycle.ogg', 'bus.ogg', 'car.ogg',
      'cat.mp3', 'cow.mp3', 'crunch.ogg', 'dog.mp3',
      'duck.mp3', 'elephant.ogg', 'frog.mp3', 'lion.mp3',
      'sheep.ogg', 'train.ogg'
    ]);
    this.activeAudioEl = null;
    this.audioStopTimer = null;

    if ('speechSynthesis' in window) {
      this._pickVoice();
      window.speechSynthesis.onvoiceschanged = () => this._pickVoice();
    }

    this._loadRealSoundManifest();
  }

  async _loadRealSoundManifest() {
    if (location.protocol === 'file:') return;
    try {
      const res = await fetch('./sounds/list.json', { cache: 'no-cache' });
      if (!res.ok) return;
      const files = await res.json();
      if (Array.isArray(files)) {
        files.forEach((f) => {
          if (typeof f === 'string' && f.trim()) {
            this.availableRealSounds.add(f.trim());
          }
        });
      }
    } catch {
      // Optional folder; silently use built-in synthesis
    }
  }

  _pickVoice() {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;
    const idVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('id'));
    this.idVoice =
      idVoices.find((v) => /google|damayanti|ardi|gadisha|natural/i.test(v.name)) ||
      idVoices[0] ||
      voices.find((v) => v.lang.toLowerCase().includes('id')) ||
      null;
  }

  _ensureCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        const comp = this.ctx.createDynamicsCompressor();
        comp.threshold.value = -16;
        comp.knee.value = 18;
        comp.ratio.value = 6;
        comp.attack.value = 0.01;
        comp.release.value = 0.18;
        comp.connect(this.ctx.destination);
        this.master = comp;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  _getNoiseBuffer() {
    const ctx = this._ensureCtx();
    if (!ctx) return null;
    if (!this.noiseBuffer) {
      const len = ctx.sampleRate * 1.5;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buf;
    }
    return this.noiseBuffer;
  }

  stopEffects() {
    if (this.audioStopTimer) {
      clearTimeout(this.audioStopTimer);
      this.audioStopTimer = null;
    }
    if (this.activeAudioEl) {
      this.activeAudioEl.pause();
      this.activeAudioEl.currentTime = 0;
      this.activeAudioEl = null;
    }
  }

  setEnabled(val) {
    this.enabled = val;
    if (!val) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      this.stopEffects();
    }
  }

  playTone(freq, duration = 0.2, type = 'sine', volume = 0.16, delay = 0, slideTo = null, filterHz = 2800) {
    if (!this.enabled) return;
    const ctx = this._ensureCtx();
    if (!ctx || !this.master) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), now + duration);
    }

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterHz, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.022);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);

    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  playNoise({ duration = 0.25, delay = 0, filterType = 'bandpass', freqStart = 800, freqEnd = 400, q = 1.5, volume = 0.14 }) {
    if (!this.enabled) return;
    const ctx = this._ensureCtx();
    const buf = this._getNoiseBuffer();
    if (!ctx || !buf || !this.master) return;

    const now = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.Q.value = q;
    filter.frequency.setValueAtTime(freqStart, now);
    if (freqEnd && freqEnd !== freqStart) {
      filter.frequency.exponentialRampToValueAtTime(Math.max(60, freqEnd), now + duration);
    }

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);

    src.start(now);
    src.stop(now + duration + 0.03);
  }

  playVibratoTone({ freqStart = 200, freqEnd = 200, duration = 0.45, delay = 0, type = 'sawtooth', lfoRate = 12, lfoDepth = 18, filterStart = 900, filterEnd = 600, q = 2, volume = 0.15 }) {
    if (!this.enabled) return;
    const ctx = this._ensureCtx();
    if (!ctx || !this.master) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, now);
    if (freqEnd !== freqStart) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(45, freqEnd), now + duration);
    }

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = lfoRate;
    lfoGain.gain.value = lfoDepth;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = q;
    filter.frequency.setValueAtTime(filterStart, now);
    if (filterEnd !== filterStart) {
      filter.frequency.exponentialRampToValueAtTime(Math.max(80, filterEnd), now + duration);
    }

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.04);
    gain.gain.setValueAtTime(volume * 0.85, now + duration * 0.65);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);

    lfo.start(now);
    osc.start(now);
    lfo.stop(now + duration + 0.03);
    osc.stop(now + duration + 0.03);
  }

  playPop(stepIndex = null) {
    const idx =
      stepIndex !== null
        ? stepIndex % this.pentatonic.length
        : this.noteIndex++ % this.pentatonic.length;
    this.playTone(this.pentatonic[idx], 0.22, 'triangle', 0.15);
  }

  playBubblePop() {
    const base = 360 + Math.random() * 240;
    this.playTone(base, 0.11, 'sine', 0.12, 0, base * 1.45, 3200);
  }

  playCountNote(stepIndex) {
    const scale = [523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5, 1174.66, 1318.51];
    const freq = scale[stepIndex % scale.length];
    this.playTone(freq, 0.24, 'triangle', 0.16);
  }

  playSuccess() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      this.playTone(n, 0.24, 'triangle', 0.15, i * 0.08);
    });
  }

  playSoftNudge() {
    this.playTone(392, 0.15, 'sine', 0.11, 0, 330);
  }

  /**
   * Plays a real recorded audio file from ./sounds/<key>.mp3 if registered in sounds/list.json,
   * otherwise plays expressive synthesized character sound.
   * Returns duration hint (ms) before speech should start.
   */
  playEffect(soundKey) {
    if (!this.enabled) return 0;

    // 1. Real MP3 / OGG / WAV if registered in sounds/list.json and supported by this browser
    const mimeMap = { mp3: 'audio/mpeg', ogg: 'audio/ogg; codecs="vorbis"', wav: 'audio/wav' };
    const probe = document.createElement('audio');
    const candidates = ['mp3', 'wav', 'ogg']
      .filter((ext) => probe.canPlayType && probe.canPlayType(mimeMap[ext]) !== '')
      .map((ext) => `${soundKey}.${ext}`);

    const matched = candidates.find((file) => this.availableRealSounds.has(file));
    if (matched) {
      try {
        this.stopEffects();
        const audio = new Audio(`./sounds/${matched}`);
        audio.volume = 0.88;
        this.activeAudioEl = audio;
        audio.play().catch(() => {
          this._playSynthesizedEffect(soundKey);
        });
        // Keep clips crisp (~2.3s max) for toddler attention & clean speech handoff
        this.audioStopTimer = setTimeout(() => {
          if (this.activeAudioEl === audio) {
            this.stopEffects();
          }
        }, 2300);
        return 1050;
      } catch {
        // Fallback to synthesis below
      }
    }

    return this._playSynthesizedEffect(soundKey);
  }

  _playSynthesizedEffect(soundKey) {
    // 2. Expressive procedural character sound
    switch (soundKey) {
      case 'cat':
        // Formant kitten "Meee-ow!"
        this.playVibratoTone({ freqStart: 520, freqEnd: 820, duration: 0.18, type: 'triangle', lfoRate: 7, lfoDepth: 8, filterStart: 1200, filterEnd: 1900, q: 2.2, volume: 0.2 });
        this.playVibratoTone({ freqStart: 820, freqEnd: 430, duration: 0.34, delay: 0.16, type: 'triangle', lfoRate: 6, lfoDepth: 10, filterStart: 1800, filterEnd: 900, q: 2.2, volume: 0.18 });
        return 520;

      case 'dog':
        // Two playful "Guk! Guk!" barks
        this.playTone(360, 0.11, 'triangle', 0.2, 0, 145, 1400);
        this.playNoise({ duration: 0.08, delay: 0, filterType: 'bandpass', freqStart: 700, freqEnd: 350, q: 2, volume: 0.12 });
        this.playTone(390, 0.13, 'triangle', 0.2, 0.18, 150, 1400);
        this.playNoise({ duration: 0.09, delay: 0.18, filterType: 'bandpass', freqStart: 760, freqEnd: 360, q: 2, volume: 0.12 });
        return 380;

      case 'cow':
        // Warm low "Moooo!"
        this.playVibratoTone({ freqStart: 138, freqEnd: 112, duration: 0.68, type: 'sawtooth', lfoRate: 5.5, lfoDepth: 6, filterStart: 420, filterEnd: 560, q: 3, volume: 0.24 });
        this.playTone(138, 0.65, 'triangle', 0.12, 0, 112, 420);
        return 680;

      case 'duck':
        // Nasal "Kwek! Kwek!"
        this.playVibratoTone({ freqStart: 360, freqEnd: 290, duration: 0.13, type: 'sawtooth', lfoRate: 18, lfoDepth: 12, filterStart: 1500, filterEnd: 850, q: 4, volume: 0.2 });
        this.playVibratoTone({ freqStart: 350, freqEnd: 270, duration: 0.15, delay: 0.17, type: 'sawtooth', lfoRate: 18, lfoDepth: 12, filterStart: 1450, filterEnd: 800, q: 4, volume: 0.2 });
        return 360;

      case 'frog':
        // Double ribbit "Krok-krok!"
        this.playVibratoTone({ freqStart: 165, freqEnd: 460, duration: 0.13, type: 'triangle', lfoRate: 28, lfoDepth: 25, filterStart: 600, filterEnd: 1300, q: 2.5, volume: 0.22 });
        this.playVibratoTone({ freqStart: 175, freqEnd: 510, duration: 0.15, delay: 0.18, type: 'triangle', lfoRate: 28, lfoDepth: 25, filterStart: 650, filterEnd: 1400, q: 2.5, volume: 0.22 });
        return 380;

      case 'elephant':
        // Playful trumpet "Preeeet!"
        this.playVibratoTone({ freqStart: 280, freqEnd: 620, duration: 0.26, type: 'sawtooth', lfoRate: 11, lfoDepth: 18, filterStart: 900, filterEnd: 2100, q: 2.5, volume: 0.2 });
        this.playVibratoTone({ freqStart: 620, freqEnd: 510, duration: 0.3, delay: 0.24, type: 'sawtooth', lfoRate: 9, lfoDepth: 16, filterStart: 2000, filterEnd: 1300, q: 2.5, volume: 0.18 });
        return 560;

      case 'lion':
        // Gentle warm roar "Auuuum!"
        this.playTone(115, 0.55, 'sawtooth', 0.16, 0, 74, 480);
        this.playNoise({ duration: 0.52, delay: 0.02, filterType: 'bandpass', freqStart: 480, freqEnd: 210, q: 1.8, volume: 0.18 });
        return 560;

      case 'sheep':
        // Vibrato bleat "Mbeeek!"
        this.playVibratoTone({ freqStart: 330, freqEnd: 285, duration: 0.52, type: 'sawtooth', lfoRate: 16, lfoDepth: 22, filterStart: 1200, filterEnd: 950, q: 3, volume: 0.2 });
        return 540;

      case 'car':
        // Friendly "Tin tin!"
        this.playTone(523.25, 0.12, 'triangle', 0.16, 0);
        this.playTone(659.25, 0.12, 'triangle', 0.13, 0);
        this.playTone(523.25, 0.14, 'triangle', 0.16, 0.16);
        this.playTone(659.25, 0.14, 'triangle', 0.13, 0.16);
        return 350;

      case 'train':
        // Warm train whistle + chugs "Tut tut! Jes jes!"
        this.playTone(440, 0.16, 'sine', 0.14, 0);
        this.playTone(554.37, 0.16, 'sine', 0.11, 0);
        this.playTone(440, 0.22, 'sine', 0.14, 0.2);
        this.playTone(554.37, 0.22, 'sine', 0.11, 0.2);
        this.playNoise({ duration: 0.08, delay: 0.46, filterType: 'bandpass', freqStart: 1200, freqEnd: 800, q: 1.5, volume: 0.11 });
        this.playNoise({ duration: 0.08, delay: 0.58, filterType: 'bandpass', freqStart: 1200, freqEnd: 800, q: 1.5, volume: 0.11 });
        return 680;

      case 'airplane':
        // Whoosh flyby
        this.playNoise({ duration: 0.55, delay: 0, filterType: 'bandpass', freqStart: 260, freqEnd: 1100, q: 1.4, volume: 0.18 });
        this.playTone(210, 0.52, 'sine', 0.1, 0, 460, 1400);
        return 560;

      case 'ship':
        // Deep friendly foghorn + wave
        this.playTone(164.81, 0.48, 'triangle', 0.16, 0, 155, 700);
        this.playTone(207.65, 0.48, 'triangle', 0.1, 0, 196, 700);
        this.playNoise({ duration: 0.45, delay: 0.05, filterType: 'lowpass', freqStart: 500, freqEnd: 300, q: 1, volume: 0.09 });
        return 520;

      case 'bus':
        this.playTone(349.23, 0.14, 'triangle', 0.15, 0);
        this.playTone(440.0, 0.14, 'triangle', 0.11, 0);
        this.playTone(349.23, 0.17, 'triangle', 0.15, 0.18);
        this.playTone(440.0, 0.17, 'triangle', 0.11, 0.18);
        return 380;

      case 'bicycle':
        // Bright "Kring kring!" bell
        this.playTone(1174.66, 0.18, 'sine', 0.14, 0);
        this.playTone(1396.91, 0.18, 'sine', 0.12, 0.09);
        this.playTone(1174.66, 0.18, 'sine', 0.14, 0.19);
        this.playTone(1396.91, 0.2, 'sine', 0.12, 0.28);
        return 460;

      case 'crunch':
        // Apple / bread bite "Kriuk!"
        this.playNoise({ duration: 0.09, delay: 0, filterType: 'highpass', freqStart: 1500, freqEnd: 900, q: 1.2, volume: 0.15 });
        this.playNoise({ duration: 0.09, delay: 0.13, filterType: 'highpass', freqStart: 1700, freqEnd: 1000, q: 1.2, volume: 0.14 });
        this.playTone(659.25, 0.18, 'triangle', 0.12, 0.22);
        return 340;

      case 'gulp':
        // Milk drink "Gluk gluk!"
        this.playTone(300, 0.11, 'sine', 0.15, 0, 620);
        this.playTone(360, 0.11, 'sine', 0.15, 0.14, 700);
        this.playTone(420, 0.12, 'sine', 0.15, 0.28, 780);
        return 420;

      case 'juicy':
        // Fresh fruit chime
        this.playTone(587.33, 0.16, 'triangle', 0.14, 0);
        this.playTone(783.99, 0.18, 'triangle', 0.14, 0.09);
        this.playTone(987.77, 0.2, 'triangle', 0.14, 0.18);
        return 340;

      default:
        this.playPop();
        return 140;
    }
  }

  speak(text, delayMs = 0) {
    if (!this.enabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const run = () => {
      if (!this.enabled) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'id-ID';
      if (this.idVoice) utter.voice = this.idVoice;
      utter.rate = 0.88;
      utter.pitch = 1.12;
      utter.volume = 0.95;
      window.speechSynthesis.speak(utter);
    };

    if (delayMs > 0) {
      setTimeout(run, delayMs);
    } else {
      run();
    }
  }
}

window.soundEngine = new SoundEngine();
