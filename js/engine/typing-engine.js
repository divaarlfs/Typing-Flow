/**
 * Core Typing Engine for TypingFlow
 * Handles word generation, keypress processing, caret movement, WPM/Accuracy/Consistency calculation.
 */

import { IndonesianDictionary } from '../dictionaries/indonesian.js';
import { EnglishDictionary } from '../dictionaries/english.js';
import { PreciseTimer } from './timer.js';
import { sound } from './sound-effects.js';

export class TypingEngine {
    constructor() {
        this.language = 'id'; // 'id' or 'en'
        this.mode = 'time'; // 'time', 'words', 'quote', 'zen'
        this.level = 'level1'; // 'level1', 'level2', 'level3', 'quotes'
        this.timeLimit = 30; // 15, 30, 60, 120
        this.wordLimit = 25; // 10, 25, 50, 100
        this.quoteAuthor = '';
        this.isSuddenDeath = false;
        this.isBlindMode = false;

        // State
        this.words = []; // Array of string words
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.typedHistory = []; // Array of object states per word: { original: string, typed: string, chars: [] }
        this.hasStarted = false;
        this.isFinished = false;

        // Stats Counters
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.extraChars = 0;
        this.missedChars = 0;
        this.totalKeystrokes = 0;
        this.errorKeys = {}; // Key frequency of mistakes: { 'a': 3, 'e': 1 }

        // Second-by-second analytics history
        this.wpmHistory = [];

        // Subsystems
        this.timer = new PreciseTimer();
        this.timer.onTick = this._handleTimerTick.bind(this);
        this.timer.onSecondPassed = this._handleSecondPassed.bind(this);
        this.timer.onFinish = this._handleTestComplete.bind(this);

        // UI Callbacks
        this.onStateChange = null; // function(engine)
        this.onTestStart = null;
        this.onTestEnd = null; // function(results)
        this.onCaretMove = null; // function(x, y, height)
    }

    setLanguage(lang) {
        this.language = lang;
        this.resetTest();
    }

    setMode(mode, optionValue) {
        this.mode = mode;
        if (mode === 'time') {
            this.timeLimit = optionValue || this.timeLimit || 30;
        } else if (mode === 'words') {
            this.wordLimit = optionValue || this.wordLimit || 25;
        }
        this.resetTest();
    }

    setLevel(level) {
        this.level = level;
        this.resetTest();
    }

    setSuddenDeath(enabled) {
        this.isSuddenDeath = enabled;
    }

    setBlindMode(enabled) {
        this.isBlindMode = enabled;
    }

    /**
     * Generate words pool based on selected language and level
     */
    _generateWordPool() {
        const dict = this.language === 'id' ? IndonesianDictionary : EnglishDictionary;

        if (this.mode === 'quote') {
            const quotesList = dict.quotes || IndonesianDictionary.quotes;
            const quoteObj = quotesList[Math.floor(Math.random() * quotesList.length)];
            this.quoteAuthor = quoteObj.author;
            return quoteObj.text.split(/\s+/);
        }

        let sourceArray = dict[this.level] || dict.level1;
        let count = 120;

        if (this.mode === 'words') {
            count = this.wordLimit;
        } else if (this.mode === 'time') {
            count = Math.max(100, Math.ceil((this.timeLimit / 60) * 160));
        } else if (this.mode === 'zen') {
            count = 250;
        }

        const generated = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * sourceArray.length);
            generated.push(sourceArray[randomIndex]);
        }
        return generated;
    }

    resetTest() {
        this.timer.stop();
        this.hasStarted = false;
        this.isFinished = false;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.extraChars = 0;
        this.missedChars = 0;
        this.totalKeystrokes = 0;
        this.errorKeys = {};
        this.wpmHistory = [];

        this.words = this._generateWordPool();
        this.typedHistory = this.words.map(w => ({
            original: w,
            typed: '',
            isCurrent: false,
            isCompleted: false,
            hasError: false
        }));

        if (this.typedHistory.length > 0) {
            this.typedHistory[0].isCurrent = true;
        }

        if (this.mode === 'time') {
            this.timer.setMode('time', this.timeLimit);
        } else {
            this.timer.setMode('countup');
        }

        if (this.onStateChange) {
            this.onStateChange(this);
        }
    }

    startTest() {
        if (this.hasStarted) return;
        this.hasStarted = true;
        this.timer.start();
        if (this.onTestStart) {
            this.onTestStart();
        }
    }

    handleKeyDown(e) {
        if (this.isFinished) return;

        // Ignore modifier keys
        if (['Control', 'Alt', 'Meta', 'Shift', 'CapsLock', 'Tab', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
            return;
        }

        if (!this.hasStarted) {
            this.startTest();
        }

        const currentWord = this.words[this.currentWordIndex];
        const currentTypedObj = this.typedHistory[this.currentWordIndex];

        if (e.key === 'Backspace') {
            e.preventDefault();
            this._handleBackspace(e.ctrlKey);
            sound.playKeyClick(false, true, false);
            if (this.onStateChange) this.onStateChange(this);
            return;
        }

        if (e.key === ' ') {
            e.preventDefault();
            this.totalKeystrokes++;
            this._completeCurrentWord();
            sound.playKeyClick(true, false, false);
            if (this.onStateChange) this.onStateChange(this);
            return;
        }

        if (e.key.length === 1) {
            this.totalKeystrokes++;
            const expectedChar = currentWord ? currentWord[this.currentCharIndex] : undefined;
            const isCorrect = (expectedChar !== undefined && e.key === expectedChar);

            if (isCorrect) {
                this.correctChars++;
                sound.playKeyClick(false, false, false);
            } else {
                this.incorrectChars++;
                this.errorKeys[e.key] = (this.errorKeys[e.key] || 0) + 1;
                sound.playKeyClick(false, false, true);

                if (this.isSuddenDeath) {
                    this._handleTestComplete();
                    return;
                }
            }

            if (currentWord && this.currentCharIndex >= currentWord.length) {
                this.extraChars++;
            }

            currentTypedObj.typed += e.key;
            this.currentCharIndex++;

            if (this.onStateChange) this.onStateChange(this);
        }
    }

    _handleBackspace(isCtrl) {
        const currentTypedObj = this.typedHistory[this.currentWordIndex];

        if (currentTypedObj && currentTypedObj.typed.length > 0) {
            if (isCtrl) {
                currentTypedObj.typed = '';
                this.currentCharIndex = 0;
            } else {
                currentTypedObj.typed = currentTypedObj.typed.slice(0, -1);
                this.currentCharIndex = Math.max(0, this.currentCharIndex - 1);
            }
        } else if (this.currentWordIndex > 0) {
            const prevIndex = this.currentWordIndex - 1;
            const prevWord = this.words[prevIndex];
            const prevTypedObj = this.typedHistory[prevIndex];

            if (prevTypedObj && prevTypedObj.typed !== prevWord) {
                this.currentWordIndex = prevIndex;
                this.currentCharIndex = prevTypedObj.typed.length;
                prevTypedObj.isCompleted = false;
                prevTypedObj.isCurrent = true;
                if (currentTypedObj) currentTypedObj.isCurrent = false;
            }
        }
    }

    _completeCurrentWord() {
        const currentWord = this.words[this.currentWordIndex];
        const currentTypedObj = this.typedHistory[this.currentWordIndex];

        if (currentTypedObj) {
            currentTypedObj.isCompleted = true;
            currentTypedObj.isCurrent = false;

            if (currentTypedObj.typed !== currentWord) {
                currentTypedObj.hasError = true;
                if (currentWord && currentTypedObj.typed.length < currentWord.length) {
                    this.missedChars += (currentWord.length - currentTypedObj.typed.length);
                }
            }
        }

        this.currentWordIndex++;
        this.currentCharIndex = 0;

        if (this.currentWordIndex >= this.words.length) {
            this._handleTestComplete();
            return;
        }

        if (this.currentWordIndex < this.typedHistory.length) {
            this.typedHistory[this.currentWordIndex].isCurrent = true;
        }
    }

    _handleTimerTick(remaining, elapsed) {
        if (this.onStateChange) {
            this.onStateChange(this);
        }
    }

    _handleSecondPassed(elapsedSec) {
        const stats = this.getStats();
        this.wpmHistory.push({
            second: elapsedSec,
            wpm: stats.netWpm,
            rawWpm: stats.rawWpm,
            errors: this.incorrectChars
        });
    }

    _handleTestComplete() {
        if (this.isFinished) return;
        this.isFinished = true;
        this.timer.stop();

        sound.playFinishFanfare();

        const results = this.getStats();
        if (this.onTestEnd) {
            this.onTestEnd(results);
        }
    }

    getStats() {
        const elapsedMinutes = this.timer.getElapsed() / 60;
        const netWpm = Math.max(0, Math.round((this.correctChars / 5) / elapsedMinutes));
        const rawWpm = Math.max(0, Math.round((this.totalKeystrokes / 5) / elapsedMinutes));
        const cpm = Math.max(0, Math.round(this.correctChars / elapsedMinutes));

        const totalAttempts = this.correctChars + this.incorrectChars + this.extraChars;
        const accuracy = totalAttempts > 0 
            ? Math.max(0, Math.min(100, Math.round((this.correctChars / totalAttempts) * 1000) / 10))
            : 100;

        let consistency = 100;
        if (this.wpmHistory.length > 2) {
            const wpms = this.wpmHistory.map(h => h.wpm);
            const mean = wpms.reduce((a, b) => a + b, 0) / wpms.length;
            if (mean > 0) {
                const variance = wpms.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / wpms.length;
                const stdDev = Math.sqrt(variance);
                const cv = (stdDev / mean) * 100;
                consistency = Math.max(0, Math.min(100, Math.round(100 - cv)));
            }
        }

        return {
            netWpm,
            rawWpm,
            cpm,
            accuracy,
            consistency,
            elapsedSeconds: Math.round(this.timer.getElapsed() * 10) / 10,
            correctChars: this.correctChars,
            incorrectChars: this.incorrectChars,
            extraChars: this.extraChars,
            missedChars: this.missedChars,
            totalKeystrokes: this.totalKeystrokes,
            errorKeys: this.errorKeys,
            wpmHistory: this.wpmHistory,
            language: this.language,
            level: this.level,
            mode: this.mode,
            timeLimit: this.timeLimit,
            wordLimit: this.wordLimit,
            quoteAuthor: this.quoteAuthor || ''
        };
    }
}
