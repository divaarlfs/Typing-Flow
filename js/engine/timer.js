/**
 * High-Precision Timer for TypingFlow
 * Supports countdown (Time mode) and count-up (Words / Quotes / Zen modes).
 * Dispatches periodic tick events for live metric calculation and chart tracking.
 */

export class PreciseTimer {
    constructor() {
        this.duration = 60; // in seconds (for countdown)
        this.mode = 'time'; // 'time' or 'countup'
        this.isRunning = false;
        this.isPaused = false;
        this.startTime = null;
        this.elapsedSeconds = 0;
        this.remainingSeconds = 60;
        this.intervalId = null;
        this.secondIntervalId = null;

        this.onTick = null; // function(remaining, elapsed)
        this.onSecondPassed = null; // function(elapsedWholeSeconds)
        this.onFinish = null; // function()
    }

    setMode(mode, duration = 60) {
        this.mode = mode;
        this.duration = duration;
        this.reset();
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.isPaused = false;
        this.startTime = performance.now();
        this.lastSecondMark = 0;

        this.intervalId = requestAnimationFrame(this._loop.bind(this));
    }

    _loop() {
        if (!this.isRunning || this.isPaused) return;

        const now = performance.now();
        const deltaMs = now - this.startTime;
        this.elapsedSeconds = deltaMs / 1000;

        if (this.mode === 'time') {
            this.remainingSeconds = Math.max(0, this.duration - this.elapsedSeconds);

            if (this.onTick) {
                this.onTick(this.remainingSeconds, this.elapsedSeconds);
            }

            // Check whole second passed for WPM snapshot logging
            const currentWholeSec = Math.floor(this.elapsedSeconds);
            if (currentWholeSec > this.lastSecondMark) {
                this.lastSecondMark = currentWholeSec;
                if (this.onSecondPassed) {
                    this.onSecondPassed(currentWholeSec);
                }
            }

            if (this.remainingSeconds <= 0) {
                this.stop();
                if (this.onFinish) {
                    this.onFinish();
                }
                return;
            }
        } else {
            // Count-up mode (words / quotes / zen)
            if (this.onTick) {
                this.onTick(this.elapsedSeconds, this.elapsedSeconds);
            }

            const currentWholeSec = Math.floor(this.elapsedSeconds);
            if (currentWholeSec > this.lastSecondMark) {
                this.lastSecondMark = currentWholeSec;
                if (this.onSecondPassed) {
                    this.onSecondPassed(currentWholeSec);
                }
            }
        }

        this.intervalId = requestAnimationFrame(this._loop.bind(this));
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.startTime = performance.now() - (this.elapsedSeconds * 1000);
            this.intervalId = requestAnimationFrame(this._loop.bind(this));
        }
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
        if (this.intervalId) {
            cancelAnimationFrame(this.intervalId);
            this.intervalId = null;
        }
    }

    reset() {
        this.stop();
        this.elapsedSeconds = 0;
        this.remainingSeconds = this.duration;
        this.lastSecondMark = 0;
    }

    getElapsed() {
        return Math.max(0.1, this.elapsedSeconds);
    }
}
