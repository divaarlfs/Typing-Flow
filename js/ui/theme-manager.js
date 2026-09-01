/**
 * Theme & User Preferences Manager for TypingFlow
 * Handles theme switching, font selection, caret styles, and persistence.
 */

import { sound } from '../engine/sound-effects.js';

export const THEMES = [
    { id: 'midnight', name: 'Midnight Slate (Default)', icon: '🌙', bg: '#181a1f', accent: '#eab308' },
    { id: 'warm-paper', name: 'Warm Paper (Serene)', icon: '📜', bg: '#f5f0e6', accent: '#92400e' },
    { id: 'nordic', name: 'Nordic Frost', icon: '❄️', bg: '#242933', accent: '#88c0d0' },
    { id: 'matrix', name: 'Emerald Cyber', icon: '💻', bg: '#0d1610', accent: '#10b981' },
    { id: 'coffee', name: 'Coffee & Caramel', icon: '☕', bg: '#201815', accent: '#d97706' },
    { id: 'sunset', name: 'Sunset Ember', icon: '🌅', bg: '#1c1524', accent: '#f43f5e' }
];

export class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('typingflow_theme') || 'midnight';
        this.currentFont = localStorage.getItem('typingflow_font') || 'jetbrains';
        this.caretStyle = localStorage.getItem('typingflow_caret') || 'smooth-line';
        this.soundType = localStorage.getItem('typingflow_sound') || 'cherry-blue';
        this.showKeyboard = localStorage.getItem('typingflow_show_kb') === 'true';

        this.applyAll();
    }

    applyAll() {
        this.setTheme(this.currentTheme);
        this.setFont(this.currentFont);
        this.setCaretStyle(this.caretStyle);
        this.setSound(this.soundType);
    }

    setTheme(themeId) {
        this.currentTheme = themeId;
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('typingflow_theme', themeId);
    }

    setFont(fontId) {
        this.currentFont = fontId;
        document.documentElement.setAttribute('data-font', fontId);
        localStorage.setItem('typingflow_font', fontId);
    }

    setCaretStyle(style) {
        this.caretStyle = style;
        document.documentElement.setAttribute('data-caret', style);
        localStorage.setItem('typingflow_caret', style);
    }

    setSound(soundId) {
        this.soundType = soundId;
        sound.setSound(soundId);
        localStorage.setItem('typingflow_sound', soundId);
    }

    toggleKeyboard(show) {
        this.showKeyboard = show;
        localStorage.setItem('typingflow_show_kb', show);
    }
}

export const themeManager = new ThemeManager();
