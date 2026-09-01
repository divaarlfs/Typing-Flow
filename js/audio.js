/**
 * audio.js - Web Audio API Sound Synthesizer & BGM
 * Menghasilkan semua efek suara dan musik ceria secara prosedural tanpa file eksternal.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isBgmPlaying = false;
    this.bgmTimer = null;
    this.bgmStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isBgmPlaying) {
      this.stopBgm();
    }
    return this.isMuted;
  }

  // Helper membuat nada sederhana
  playTone(freq, type = 'sine', duration = 0.15, startTime = 0, gainLevel = 0.2) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);
      
      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + startTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Suara kocokan dan lemparan dadu
  playDiceRoll() {
    if (this.isMuted) return;
    this.init();
    for (let i = 0; i < 7; i++) {
      const freq = 160 + Math.random() * 220;
      this.playTone(freq, 'triangle', 0.04, i * 0.05, 0.15);
    }
    // Bunyi ketukan akhir
    this.playTone(180, 'sine', 0.1, 0.38, 0.25);
  }

  // Suara langkah pion melompat (cute pop)
  playPawnHop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.09);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // Suara naik tangga (melodi naik gembira)
  playLadderClimb() {
    if (this.isMuted) return;
    this.init();
    const notes = [330, 392, 440, 523, 659, 784, 1046]; // E4, G4, A4, C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.12, idx * 0.09, 0.22);
    });
  }

  // Suara meluncur turun ular (whistle slide down lucu)
  playSnakeSlide() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.5);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.55);
    } catch (e) {}
  }

  // Suara Jawaban BENAR (Chime gembira + nada kemenangan ceria)
  playCorrect() {
    if (this.isMuted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.28, idx * 0.08, 0.25);
    });
    // Efek glitter sparkle
    setTimeout(() => {
      this.playTone(1567.98, 'triangle', 0.35, 0, 0.15);
      this.playTone(2093.00, 'sine', 0.45, 0.08, 0.12);
    }, 400);
  }

  // Suara Jawaban SALAH (Suara lembut menghibur, no harsh buzz)
  playWrong() {
    if (this.isMuted) return;
    this.init();
    // Nada lembut 'boing-boing' ramah anak
    this.playTone(392, 'sine', 0.18, 0, 0.18);
    this.playTone(349.23, 'sine', 0.22, 0.16, 0.16);
    this.playTone(329.63, 'triangle', 0.35, 0.34, 0.14);
  }

  // Suara timer ticking lembut (woodblock)
  playTimerTick() {
    if (this.isMuted) return;
    this.init();
    this.playTone(880, 'sine', 0.03, 0, 0.08);
  }

  // Suara popup modal muncul
  playPopup() {
    if (this.isMuted) return;
    this.init();
    this.playTone(440, 'sine', 0.08, 0, 0.12);
    this.playTone(880, 'sine', 0.14, 0.06, 0.15);
  }

  // Suara Kemenangan Utama (Victory Fanfare)
  playVictory() {
    if (this.isMuted) return;
    this.init();
    // Fanfare: C4 - C4 - C4 - E4 - G4 - C5
    const melody = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 523.25, d: 0.15, t: 0.18 },
      { f: 523.25, d: 0.15, t: 0.36 },
      { f: 659.25, d: 0.28, t: 0.54 },
      { f: 783.99, d: 0.22, t: 0.82 },
      { f: 1046.50, d: 0.70, t: 1.05 },
      { f: 1318.51, d: 0.90, t: 1.40 },
    ];
    melody.forEach(item => {
      this.playTone(item.f, 'triangle', item.d, item.t, 0.28);
    });
  }

  // Background Music Ceria Santai (Synthesized Marimba & Melody)
  startBgm() {
    if (this.isMuted || this.isBgmPlaying) return;
    this.init();
    this.isBgmPlaying = true;

    // Pattern melodi ceria santai untuk anak
    const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 523.25]; // C D E F G A C
    const melodyPattern = [
      0, 2, 4, 2,  0, 4, 3, 1,
      0, 2, 4, 5,  4, 2, 0, -1,
      4, 4, 5, 4,  3, 2, 1, 0,
      2, 3, 4, 2,  0, -1, 0, 0
    ];

    const playStep = () => {
      if (!this.isBgmPlaying || this.isMuted) return;
      
      const noteIdx = melodyPattern[this.bgmStep % melodyPattern.length];
      if (noteIdx >= 0) {
        const freq = scale[noteIdx];
        this.playTone(freq * 1.5, 'sine', 0.18, 0, 0.035);
      }
      
      // Bassline ringan
      if (this.bgmStep % 4 === 0) {
        const bassFreq = scale[Math.floor(this.bgmStep / 8) % 4] * 0.5;
        this.playTone(bassFreq, 'triangle', 0.22, 0, 0.03);
      }

      this.bgmStep++;
      this.bgmTimer = setTimeout(playStep, 280);
    };

    playStep();
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleBgm() {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }
}

window.soundEngine = new SoundEngine();
