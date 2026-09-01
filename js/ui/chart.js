/**
 * Canvas Interactive Performance Chart for TypingFlow
 * Renders smooth WPM & Raw WPM curves with error markers and high-DPI scaling.
 */

export class PerformanceChart {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
    }

    render(historyData) {
        if (!this.canvas || !historyData || historyData.length === 0) return;

        // Retina / High-DPI Display support
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        const width = rect.width || 640;
        const height = rect.height || 200;

        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.ctx.scale(dpr, dpr);

        const padding = { top: 25, right: 30, bottom: 35, left: 45 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        // Data points
        const points = historyData.length === 1 
            ? [{ second: 0, wpm: 0, rawWpm: 0, errors: 0 }, ...historyData]
            : historyData;

        const maxSec = Math.max(1, points[points.length - 1].second);
        const maxWpm = Math.max(40, ...points.map(p => Math.max(p.wpm, p.rawWpm))) * 1.15;

        const getX = (sec) => padding.left + (sec / maxSec) * chartW;
        const getY = (wpm) => padding.top + chartH - (wpm / maxWpm) * chartH;

        // 1. Clear background
        this.ctx.clearRect(0, 0, width, height);

        // 2. Draw subtle horizontal grid lines & Y labels
        const ySteps = 4;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.font = '11px "JetBrains Mono", monospace';
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'middle';
        this.ctx.lineWidth = 1;

        for (let i = 0; i <= ySteps; i++) {
            const val = Math.round((maxWpm / ySteps) * i);
            const y = getY(val);

            this.ctx.beginPath();
            this.ctx.moveTo(padding.left, y);
            this.ctx.lineTo(padding.left + chartW, y);
            this.ctx.stroke();

            this.ctx.fillText(`${val}`, padding.left - 8, y);
        }

        // Draw X-axis ticks & labels
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        const xStepCount = Math.min(6, maxSec);
        for (let i = 0; i <= xStepCount; i++) {
            const sec = Math.round((maxSec / xStepCount) * i);
            const x = getX(sec);

            this.ctx.fillText(`${sec}s`, x, padding.top + chartH + 10);
        }

        // 3. Draw Raw WPM Line (Muted Gray/Dashed)
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([4, 4]);

        points.forEach((p, idx) => {
            const x = getX(p.second);
            const y = getY(p.rawWpm);
            if (idx === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        });
        this.ctx.stroke();
        this.ctx.setLineDash([]); // Reset dash

        // 4. Draw Net WPM Gradient Area
        const gradient = this.ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
        gradient.addColorStop(0, 'rgba(234, 179, 8, 0.35)'); // Golden/Yellow accent
        gradient.addColorStop(1, 'rgba(234, 179, 8, 0.0)');

        this.ctx.beginPath();
        points.forEach((p, idx) => {
            const x = getX(p.second);
            const y = getY(p.wpm);
            if (idx === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        });
        this.ctx.lineTo(getX(points[points.length - 1].second), padding.top + chartH);
        this.ctx.lineTo(getX(points[0].second), padding.top + chartH);
        this.ctx.closePath();
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // 5. Draw Net WPM Line (Solid Vibrant Yellow/Gold)
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#eab308';
        this.ctx.lineWidth = 3;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';

        points.forEach((p, idx) => {
            const x = getX(p.second);
            const y = getY(p.wpm);
            if (idx === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        });
        this.ctx.stroke();

        // 6. Draw Error Points (Red dots)
        let lastErrors = 0;
        points.forEach(p => {
            const newErrors = p.errors - lastErrors;
            if (newErrors > 0) {
                const x = getX(p.second);
                const y = getY(p.wpm);

                this.ctx.beginPath();
                this.ctx.arc(x, y, 4, 0, Math.PI * 2);
                this.ctx.fillStyle = '#ef4444';
                this.ctx.fill();
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = '#fff';
                this.ctx.stroke();

                // Draw small 'x' error badge
                this.ctx.fillStyle = '#ef4444';
                this.ctx.font = 'bold 9px monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(`✕`, x, y - 10);
            }
            lastErrors = p.errors;
        });

        // 7. Legend
        this._drawLegend(width, padding);
    }

    _drawLegend(width, padding) {
        const legendX = width - padding.right - 180;
        const legendY = 12;

        this.ctx.font = '10px "JetBrains Mono", monospace';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';

        // Net WPM
        this.ctx.fillStyle = '#eab308';
        this.ctx.fillRect(legendX, legendY, 12, 3);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.fillText('WPM', legendX + 16, legendY + 2);

        // Raw WPM
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        this.ctx.setLineDash([2, 2]);
        this.ctx.beginPath();
        this.ctx.moveTo(legendX + 60, legendY + 2);
        this.ctx.lineTo(legendX + 72, legendY + 2);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        this.ctx.fillText('Raw', legendX + 76, legendY + 2);

        // Errors
        this.ctx.beginPath();
        this.ctx.arc(legendX + 120, legendY + 2, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ef4444';
        this.ctx.fill();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.fillText('Errors', legendX + 128, legendY + 2);
    }
}
