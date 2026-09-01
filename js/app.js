/**
 * TypingFlow Main Application Controller
 * Coordinates UI rendering, smooth caret positioning, input binding, and modals.
 */

import { TypingEngine } from './engine/typing-engine.js';
import { PerformanceChart } from './ui/chart.js';
import { themeManager, THEMES } from './ui/theme-manager.js';
import { statsStorage } from './ui/storage.js';

class TypingApp {
    constructor() {
        this.engine = new TypingEngine();
        this.chart = null;

        // DOM Cache
        this.dom = {
            appContainer: document.getElementById('app-container'),
            wordsContainer: document.getElementById('words-container'),
            wordsWrapper: document.getElementById('words-wrapper'),
            hiddenInput: document.getElementById('hidden-input'),
            caret: document.getElementById('caret'),
            
            // Header / Config Toolbar
            langBtns: document.querySelectorAll('.lang-btn'),
            modeBtns: document.querySelectorAll('.mode-btn'),
            levelBtns: document.querySelectorAll('.level-btn'),
            subOptionGroup: document.getElementById('sub-option-group'),
            liveTimer: document.getElementById('live-timer'),
            liveWpm: document.getElementById('live-wpm'),
            liveAccuracy: document.getElementById('live-accuracy'),
            liveHeader: document.getElementById('live-header'),
            configToolbar: document.getElementById('config-toolbar'),

            // Screens
            typingScreen: document.getElementById('typing-screen'),
            resultsScreen: document.getElementById('results-screen'),

            // Results UI
            resWpm: document.getElementById('res-wpm'),
            resAcc: document.getElementById('res-acc'),
            resRaw: document.getElementById('res-raw'),
            resConsistency: document.getElementById('res-consistency'),
            resChars: document.getElementById('res-chars'),
            resTime: document.getElementById('res-time'),
            resTestType: document.getElementById('res-test-type'),
            resPbBadge: document.getElementById('res-pb-badge'),
            chartCanvas: document.getElementById('performance-chart'),
            btnRestartResult: document.getElementById('btn-restart-result'),
            btnCopyResult: document.getElementById('btn-copy-result'),
            btnNextTest: document.getElementById('btn-next-test'),

            // Modals & Navigation
            btnSettings: document.getElementById('btn-settings'),
            btnHistory: document.getElementById('btn-history'),
            btnReset: document.getElementById('btn-reset'),
            modalSettings: document.getElementById('modal-settings'),
            modalHistory: document.getElementById('modal-history'),
            closeModalBtns: document.querySelectorAll('.btn-close-modal'),
            themeOptionsGrid: document.getElementById('theme-options-grid'),
            fontSelect: document.getElementById('font-select'),
            caretSelect: document.getElementById('caret-select'),
            soundSelect: document.getElementById('sound-select'),
            kbToggle: document.getElementById('kb-toggle'),
            historyList: document.getElementById('history-list'),
            totalTestsStat: document.getElementById('stat-total-tests'),
            avgWpmStat: document.getElementById('stat-avg-wpm'),
            highestWpmStat: document.getElementById('stat-highest-wpm'),
            avgAccStat: document.getElementById('stat-avg-acc'),
            btnClearHistory: document.getElementById('btn-clear-history'),

            // Toast notification
            toast: document.getElementById('toast'),
            
            // Visual on-screen keyboard
            virtualKeyboard: document.getElementById('virtual-keyboard')
        };

        this.init();
    }

    init() {
        // Bind engine callbacks
        this.engine.onStateChange = this.renderWords.bind(this);
        this.engine.onTestStart = this.handleTestStart.bind(this);
        this.engine.onTestEnd = this.handleTestEnd.bind(this);

        // Chart init
        if (this.dom.chartCanvas) {
            this.chart = new PerformanceChart(this.dom.chartCanvas);
        }

        this.initThemeSettingsUI();
        this.bindEvents();
        this.updateSubOptions('time');
        this.engine.resetTest();
        this.focusInput();
    }

    bindEvents() {
        // Clear focus from any button after click so Space is never trapped
        document.addEventListener('mouseup', (e) => {
            if (e.target.closest('button')) {
                setTimeout(() => {
                    const btn = e.target.closest('button');
                    if (btn) btn.blur();
                    this.focusInput();
                }, 50);
            }
        });

        // Global Keyboard Input
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isModalOpen()) {
                    this.closeAllModals();
                    return;
                }
                this.restartTest();
                return;
            }

            if (e.key === 'Tab') {
                e.preventDefault();
                this.restartTest();
                return;
            }

            if (this.isModalOpen()) return;

            if (e.key === ' ') {
                e.preventDefault();
            }

            this.engine.handleKeyDown(e);
            this.highlightVirtualKey(e.key);
        });

        if (this.dom.hiddenInput) {
            this.dom.hiddenInput.addEventListener('input', () => {
                this.dom.hiddenInput.value = '';
            });
        }

        this.dom.wordsWrapper.addEventListener('click', () => {
            this.focusInput();
        });

        // Language Buttons
        this.dom.langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                this.dom.langBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                e.currentTarget.blur();
                this.engine.setLanguage(lang);
                this.focusInput();
            });
        });

        // Mode Buttons (Time, Words, Quote, Zen)
        this.dom.modeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.dom.modeBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                e.currentTarget.blur();
                this.updateSubOptions(mode);
                this.focusInput();
            });
        });

        // Level Buttons (Level 1, Level 2, Level 3)
        this.dom.levelBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const level = e.currentTarget.dataset.level;
                this.dom.levelBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                e.currentTarget.blur();
                this.engine.setLevel(level);
                this.focusInput();
            });
        });

        // Sub Option Group (15s, 30s, 60s, 120s / 10, 25, 50, 100)
        this.dom.subOptionGroup.addEventListener('click', (e) => {
            const btn = e.target.closest('.sub-btn');
            if (!btn) return;
            const val = parseInt(btn.dataset.val, 10);
            this.dom.subOptionGroup.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            btn.blur();

            if (this.engine.mode === 'time') {
                this.engine.setMode('time', val);
            } else if (this.engine.mode === 'words') {
                this.engine.setMode('words', val);
            }
            this.restartTest();
            this.focusInput();
        });

        // Reset Button
        this.dom.btnReset.addEventListener('click', (e) => {
            e.currentTarget.blur();
            this.restartTest();
        });

        // Results Buttons
        this.dom.btnRestartResult.addEventListener('click', (e) => {
            e.currentTarget.blur();
            this.restartTest();
        });
        this.dom.btnNextTest.addEventListener('click', (e) => {
            e.currentTarget.blur();
            this.restartTest();
        });
        this.dom.btnCopyResult.addEventListener('click', (e) => {
            e.currentTarget.blur();
            this.copyResultToClipboard();
        });

        // Settings Modal
        this.dom.btnSettings.addEventListener('click', (e) => {
            e.currentTarget.blur();
            this.openModal(this.dom.modalSettings);
        });

        // History Modal
        this.dom.btnHistory.addEventListener('click', (e) => {
            e.currentTarget.blur();
            this.renderHistoryModal();
            this.openModal(this.dom.modalHistory);
        });

        // Close Modals
        this.dom.closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.closeAllModals();
            }
        });

        this.dom.btnClearHistory.addEventListener('click', () => {
            if (confirm('Hapus seluruh riwayat latihan?')) {
                statsStorage.clearHistory();
                this.renderHistoryModal();
                this.showToast('Riwayat berhasil dibersihkan');
            }
        });

        window.addEventListener('resize', () => {
            this.updateCaretPosition();
        });
    }

    initThemeSettingsUI() {
        this.dom.themeOptionsGrid.innerHTML = '';
        THEMES.forEach(t => {
            const btn = document.createElement('button');
            btn.className = `theme-choice-btn ${themeManager.currentTheme === t.id ? 'active' : ''}`;
            btn.innerHTML = `
                <span class="theme-icon">${t.icon}</span>
                <span class="theme-name">${t.name}</span>
                <span class="theme-preview" style="background: ${t.bg}; border: 2px solid ${t.accent};"></span>
            `;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.theme-choice-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                btn.blur();
                themeManager.setTheme(t.id);
            });
            this.dom.themeOptionsGrid.appendChild(btn);
        });

        this.dom.fontSelect.value = themeManager.currentFont;
        this.dom.fontSelect.addEventListener('change', (e) => {
            themeManager.setFont(e.target.value);
            this.updateCaretPosition();
            this.focusInput();
        });

        this.dom.caretSelect.value = themeManager.caretStyle;
        this.dom.caretSelect.addEventListener('change', (e) => {
            themeManager.setCaretStyle(e.target.value);
            this.focusInput();
        });

        this.dom.soundSelect.value = themeManager.soundType;
        this.dom.soundSelect.addEventListener('change', (e) => {
            themeManager.setSound(e.target.value);
            this.focusInput();
        });

        this.dom.kbToggle.checked = themeManager.showKeyboard;
        this.toggleVirtualKeyboard(themeManager.showKeyboard);
        this.dom.kbToggle.addEventListener('change', (e) => {
            themeManager.toggleKeyboard(e.target.checked);
            this.toggleVirtualKeyboard(e.target.checked);
            this.focusInput();
        });
    }

    toggleVirtualKeyboard(show) {
        if (show) {
            this.dom.virtualKeyboard.classList.remove('hidden');
        } else {
            this.dom.virtualKeyboard.classList.add('hidden');
        }
    }

    highlightVirtualKey(key) {
        if (!themeManager.showKeyboard) return;
        const normalized = key === ' ' ? 'space' : key.toLowerCase();
        const keyEl = document.querySelector(`.kb-key[data-key="${normalized}"]`);
        if (keyEl) {
            keyEl.classList.add('pressed');
            setTimeout(() => keyEl.classList.remove('pressed'), 120);
        }
    }

    updateSubOptions(mode) {
        this.dom.subOptionGroup.innerHTML = '';

        if (mode === 'time') {
            const timeOptions = [15, 30, 60, 120];
            timeOptions.forEach(sec => {
                const btn = document.createElement('button');
                btn.className = `sub-btn ${this.engine.timeLimit === sec ? 'active' : ''}`;
                btn.dataset.val = sec;
                btn.textContent = `${sec}s`;
                this.dom.subOptionGroup.appendChild(btn);
            });
            this.engine.setMode('time', this.engine.timeLimit);
            this.dom.liveTimer.textContent = `${this.engine.timeLimit}`;
        } else if (mode === 'words') {
            const wordOptions = [10, 25, 50, 100];
            wordOptions.forEach(count => {
                const btn = document.createElement('button');
                btn.className = `sub-btn ${this.engine.wordLimit === count ? 'active' : ''}`;
                btn.dataset.val = count;
                btn.textContent = `${count}`;
                this.dom.subOptionGroup.appendChild(btn);
            });
            this.engine.setMode('words', this.engine.wordLimit);
            this.dom.liveTimer.textContent = `0/${this.engine.wordLimit}`;
        } else if (mode === 'quote') {
            const label = document.createElement('span');
            label.className = 'sub-label';
            label.textContent = 'Kutipan Pilihan';
            this.dom.subOptionGroup.appendChild(label);
            this.engine.setMode('quote');
            this.dom.liveTimer.textContent = '0s';
        } else if (mode === 'zen') {
            const label = document.createElement('span');
            label.className = 'sub-label';
            label.textContent = 'Zen (Tanpa Batas)';
            this.dom.subOptionGroup.appendChild(label);
            this.engine.setMode('zen');
            this.dom.liveTimer.textContent = '0s';
        }
    }

    focusInput() {
        if (this.dom.hiddenInput) {
            this.dom.hiddenInput.focus({ preventScroll: true });
        }
    }

    handleTestStart() {
        document.body.classList.add('is-typing');
    }

    handleTestEnd(results) {
        document.body.classList.remove('is-typing');

        const isPb = statsStorage.isPersonalBest(results);
        statsStorage.saveResult(results);

        this.dom.typingScreen.classList.add('hidden');
        this.dom.resultsScreen.classList.remove('hidden');

        this.animateCounter(this.dom.resWpm, 0, results.netWpm, 800);
        this.animateCounter(this.dom.resAcc, 0, results.accuracy, 800, '%');
        this.dom.resRaw.textContent = `${results.rawWpm} WPM`;
        this.dom.resConsistency.textContent = `${results.consistency}%`;
        this.dom.resChars.textContent = `${results.correctChars}/${results.incorrectChars}/${results.extraChars}/${results.missedChars}`;
        this.dom.resTime.textContent = `${results.elapsedSeconds}s`;

        const langName = results.language === 'id' ? 'Bahasa Indonesia' : 'English';
        const levelName = results.level === 'level1' ? 'Level 1 (Mudah)' : results.level === 'level2' ? 'Level 2 (Sedang)' : 'Level 3 (Mahir)';
        this.dom.resTestType.textContent = `${langName} • ${results.mode.toUpperCase()} • ${levelName}`;

        if (isPb && results.netWpm > 0) {
            this.dom.resPbBadge.classList.remove('hidden');
        } else {
            this.dom.resPbBadge.classList.add('hidden');
        }

        setTimeout(() => {
            if (this.chart) {
                this.chart.render(results.wpmHistory);
            }
        }, 50);
    }

    restartTest() {
        document.body.classList.remove('is-typing');
        this.dom.resultsScreen.classList.add('hidden');
        this.dom.typingScreen.classList.remove('hidden');
        this.dom.wordsWrapper.style.transform = 'translateY(0px)';

        this.engine.resetTest();
        this.focusInput();
    }

    renderWords(engine) {
        if (engine.mode === 'time') {
            this.dom.liveTimer.textContent = `${Math.ceil(engine.timer.remainingSeconds)}`;
        } else if (engine.mode === 'words') {
            this.dom.liveTimer.textContent = `${engine.currentWordIndex}/${engine.words.length}`;
        } else {
            this.dom.liveTimer.textContent = `${Math.floor(engine.timer.getElapsed())}s`;
        }

        const stats = engine.getStats();
        this.dom.liveWpm.textContent = `${stats.netWpm} WPM`;
        this.dom.liveAccuracy.textContent = `${stats.accuracy}%`;

        const fragment = document.createDocumentFragment();

        engine.typedHistory.forEach((wordObj) => {
            const wordEl = document.createElement('div');
            wordEl.className = 'word';
            if (wordObj.isCurrent) wordEl.classList.add('current');
            if (wordObj.hasError) wordEl.classList.add('error');

            const targetWord = wordObj.original;
            const typedText = wordObj.typed;

            const maxLen = Math.max(targetWord.length, typedText.length);
            for (let cIdx = 0; cIdx < maxLen; cIdx++) {
                const letterEl = document.createElement('span');
                letterEl.className = 'letter';

                if (cIdx < typedText.length) {
                    if (cIdx < targetWord.length) {
                        if (typedText[cIdx] === targetWord[cIdx]) {
                            letterEl.classList.add('correct');
                            letterEl.textContent = targetWord[cIdx];
                        } else {
                            letterEl.classList.add('incorrect');
                            letterEl.textContent = targetWord[cIdx];
                        }
                    } else {
                        letterEl.classList.add('extra');
                        letterEl.textContent = typedText[cIdx];
                    }
                } else {
                    letterEl.classList.add('untyped');
                    letterEl.textContent = targetWord[cIdx];
                }

                wordEl.appendChild(letterEl);
            }

            fragment.appendChild(wordEl);
        });

        this.dom.wordsContainer.innerHTML = '';
        this.dom.wordsContainer.appendChild(fragment);

        this.updateCaretPosition();
    }

    updateCaretPosition() {
        const currentWordEl = this.dom.wordsContainer.querySelector('.word.current');
        if (!currentWordEl) return;

        const currentTyped = this.engine.typedHistory[this.engine.currentWordIndex]?.typed || '';
        const letters = currentWordEl.querySelectorAll('.letter');

        let targetX = 0;
        let targetY = currentWordEl.offsetTop;
        let caretHeight = currentWordEl.offsetHeight || 32;

        if (currentTyped.length === 0) {
            targetX = currentWordEl.offsetLeft;
        } else if (currentTyped.length <= letters.length) {
            const activeLetter = letters[currentTyped.length - 1];
            if (activeLetter) {
                targetX = activeLetter.offsetLeft + activeLetter.offsetWidth;
            } else {
                targetX = currentWordEl.offsetLeft + currentWordEl.offsetWidth;
            }
        } else {
            targetX = currentWordEl.offsetLeft + currentWordEl.offsetWidth;
        }

        this.dom.caret.style.transform = `translate(${targetX}px, ${targetY}px)`;
        this.dom.caret.style.height = `${caretHeight}px`;

        const currentLineTop = currentWordEl.offsetTop;
        const initialLineTop = this.dom.wordsContainer.firstElementChild ? this.dom.wordsContainer.firstElementChild.offsetTop : 0;
        const lineOffset = currentLineTop - initialLineTop;

        if (lineOffset > 45) {
            this.dom.wordsWrapper.style.transform = `translateY(-${lineOffset - 45}px)`;
        } else {
            this.dom.wordsWrapper.style.transform = `translateY(0px)`;
        }
    }

    animateCounter(el, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const update = (now) => {
            const progress = Math.min(1, (now - startTime) / duration);
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            const currentVal = Math.round(start + (end - start) * easeOutQuad);
            el.textContent = `${currentVal}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = `${end}${suffix}`;
            }
        };
        requestAnimationFrame(update);
    }

    copyResultToClipboard() {
        const stats = this.engine.getStats();
        const text = `⚡ TypingFlow Result ⚡\n` +
                     `🏆 Speed: ${stats.netWpm} WPM (Raw: ${stats.rawWpm})\n` +
                     `🎯 Accuracy: ${stats.accuracy}%\n` +
                     `📊 Consistency: ${stats.consistency}%\n` +
                     `🌐 Mode: ${stats.language.toUpperCase()} • ${stats.mode} (${stats.level})`;

        navigator.clipboard.writeText(text).then(() => {
            this.showToast('✅ Hasil berhasil disalin ke clipboard!');
        }).catch(() => {
            this.showToast('Gagal menyalin hasil');
        });
    }

    showToast(msg) {
        if (!this.dom.toast) return;
        this.dom.toast.textContent = msg;
        this.dom.toast.classList.add('show');
        setTimeout(() => {
            this.dom.toast.classList.remove('show');
        }, 2500);
    }

    renderHistoryModal() {
        const agg = statsStorage.getAggregateStats();
        const history = statsStorage.getHistory();

        this.dom.totalTestsStat.textContent = agg.totalTests;
        this.dom.avgWpmStat.textContent = agg.avgWpm;
        this.dom.highestWpmStat.textContent = agg.highestWpm;
        this.dom.avgAccStat.textContent = `${agg.avgAccuracy}%`;

        this.dom.historyList.innerHTML = '';
        if (history.length === 0) {
            this.dom.historyList.innerHTML = `<div class="history-empty">Belum ada riwayat pengujian. Mulailah mengetik!</div>`;
            return;
        }

        history.slice(0, 15).forEach(item => {
            const date = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const row = document.createElement('div');
            row.className = 'history-item';
            row.innerHTML = `
                <div class="hist-wpm"><strong>${item.wpm}</strong> <span class="unit">WPM</span></div>
                <div class="hist-acc">${item.accuracy}%</div>
                <div class="hist-mode">${item.language.toUpperCase()} • ${item.mode} • ${item.level}</div>
                <div class="hist-time">${date}</div>
            `;
            this.dom.historyList.appendChild(row);
        });
    }

    openModal(modal) {
        modal.classList.add('active');
    }

    closeAllModals() {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
        this.focusInput();
    }

    isModalOpen() {
        return document.querySelector('.modal-backdrop.active') !== null;
    }
}

// Instantiate application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.typingApp = new TypingApp();
});
