/**
 * Web Audio API Sound Synthesizer for TypingFlow
 * Procedural mechanical switch sounds, spacebar thud, backspace, and finish fanfare.
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.currentSound = 'cherry-blue'; // 'cherry-blue', 'cherry-brown', 'typewriter', 'bubble-pop', 'mute'
        this.volume = 0.5;
        this.isMuted = false;
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

    setSound(soundType) {
        this.currentSound = soundType;
        if (soundType === 'mute') {
            this.isMuted = true;
        } else {
            this.isMuted = false;
        }
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
    }

    playKeyClick(isSpace = false, isBackspace = false, isError = false) {
        if (this.isMuted || this.currentSound === 'mute') return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        if (isError) {
            this._playErrorSound(now);
            return;
        }

        switch (this.currentSound) {
            case 'cherry-blue':
                this._playCherryBlue(now, isSpace, isBackspace);
                break;
            case 'cherry-brown':
                this._playCherryBrown(now, isSpace, isBackspace);
                break;
            case 'typewriter':
                this._playTypewriter(now, isSpace, isBackspace);
                break;
            case 'bubble-pop':
                this._playBubblePop(now, isSpace, isBackspace);
                break;
            default:
                this._playCherryBlue(now, isSpace, isBackspace);
                break;
        }
    }

    _playCherryBlue(t, isSpace, isBackspace) {
        const baseFreq = isSpace ? 800 : isBackspace ? 1400 : 1800 + (Math.random() * 300 - 150);
        
        // 1. High frequency click
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(baseFreq, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.02);

        gain.gain.setValueAtTime(this.volume * 0.45, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.04);

        // 2. Low tactile thock bottom-out
        const thockOsc = this.ctx.createOscillator();
        const thockGain = this.ctx.createGain();
        thockOsc.type = 'sine';
        thockOsc.frequency.setValueAtTime(isSpace ? 110 : 180, t);
        thockOsc.frequency.exponentialRampToValueAtTime(40, t + 0.04);

        thockGain.gain.setValueAtTime(this.volume * (isSpace ? 0.6 : 0.3), t);
        thockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

        thockOsc.connect(thockGain);
        thockGain.connect(this.ctx.destination);
        thockOsc.start(t);
        thockOsc.stop(t + 0.06);
    }

    _playCherryBrown(t, isSpace, isBackspace) {
        // Deep, tactile thock
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const freq = isSpace ? 140 : isBackspace ? 200 : 260 + (Math.random() * 40 - 20);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.045);

        gain.gain.setValueAtTime(this.volume * (isSpace ? 0.6 : 0.4), t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.06);
    }

    _playTypewriter(t, isSpace, isBackspace) {
        // Metallic hammer snap
        const noiseBuffer = this._createNoiseBuffer(0.03);
        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(isSpace ? 1500 : 3200, t);
        filter.Q.value = 3;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(this.volume * 0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(t);
        noise.stop(t + 0.04);
    }

    _playBubblePop(t, isSpace, isBackspace) {
        // Chill wooden/bubble pop
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const freq = isSpace ? 350 : isBackspace ? 450 : 550 + (Math.random() * 80 - 40);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.8, t + 0.015);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, t + 0.045);

        gain.gain.setValueAtTime(this.volume * 0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.055);
    }

    _playErrorSound(t) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, t);
        osc.frequency.linearRampToValueAtTime(90, t + 0.08);

        gain.gain.setValueAtTime(this.volume * 0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
    }

    playFinishFanfare() {
        if (this.isMuted || this.currentSound === 'mute') return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const t = now + idx * 0.08;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(this.volume * 0.35, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.4);
        });
    }

    _createNoiseBuffer(duration) {
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }
}

export const sound = new SoundEngine();
