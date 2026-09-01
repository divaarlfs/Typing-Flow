/**
 * Local Storage & Stats History Manager for TypingFlow
 * Stores personal bests, test history logs, and calculates aggregate metrics.
 */

export class StatsStorage {
    constructor() {
        this.STORAGE_KEY = 'typingflow_history';
        this.PB_KEY = 'typingflow_personal_bests';
    }

    getHistory() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error reading stats history', e);
            return [];
        }
    }

    saveResult(result) {
        try {
            const history = this.getHistory();
            const record = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                wpm: result.netWpm,
                rawWpm: result.rawWpm,
                accuracy: result.accuracy,
                consistency: result.consistency,
                mode: result.mode,
                level: result.level,
                language: result.language,
                timeLimit: result.timeLimit,
                wordLimit: result.wordLimit,
                elapsed: result.elapsedSeconds
            };

            // Prepend new record (max 100 entries)
            history.unshift(record);
            if (history.length > 100) {
                history.pop();
            }
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));

            // Check and update Personal Best
            this._updatePersonalBest(record);

            return record;
        } catch (e) {
            console.error('Error saving result', e);
            return null;
        }
    }

    _updatePersonalBest(record) {
        try {
            const pbs = this.getPersonalBests();
            const key = `${record.language}_${record.mode}_${record.level}_${record.mode === 'time' ? record.timeLimit : record.wordLimit}`;

            if (!pbs[key] || record.wpm > pbs[key].wpm) {
                pbs[key] = {
                    wpm: record.wpm,
                    accuracy: record.accuracy,
                    date: record.timestamp
                };
                localStorage.setItem(this.PB_KEY, JSON.stringify(pbs));
                return true; // New Personal Best!
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    getPersonalBests() {
        try {
            const data = localStorage.getItem(this.PB_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            return {};
        }
    }

    isPersonalBest(result) {
        const pbs = this.getPersonalBests();
        const key = `${result.language}_${result.mode}_${result.level}_${result.mode === 'time' ? result.timeLimit : result.wordLimit}`;
        return !pbs[key] || result.netWpm > pbs[key].wpm;
    }

    getAggregateStats() {
        const history = this.getHistory();
        if (history.length === 0) {
            return {
                totalTests: 0,
                avgWpm: 0,
                highestWpm: 0,
                avgAccuracy: 0,
                totalTimeSeconds: 0
            };
        }

        const totalTests = history.length;
        const sumWpm = history.reduce((sum, item) => sum + item.wpm, 0);
        const highestWpm = Math.max(...history.map(item => item.wpm));
        const sumAccuracy = history.reduce((sum, item) => sum + item.accuracy, 0);
        const totalTime = history.reduce((sum, item) => sum + (item.elapsed || 0), 0);

        return {
            totalTests,
            avgWpm: Math.round(sumWpm / totalTests),
            highestWpm,
            avgAccuracy: Math.round((sumAccuracy / totalTests) * 10) / 10,
            totalTimeSeconds: Math.round(totalTime)
        };
    }

    clearHistory() {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.PB_KEY);
    }
}

export const statsStorage = new StatsStorage();
