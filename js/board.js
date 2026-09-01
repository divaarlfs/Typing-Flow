/**
 * board.js - 10x10 Snakes and Ladders Board Engine & SVG Renderer
 * Mengatur koordinat zigzag (boustrophedon), tangga, ular, dan kotak khusus.
 */

class BoardEngine {
  constructor() {
    this.size = 10;
    this.totalTiles = 100;

    // Definisi Tangga: start -> end (end > start)
    this.ladders = {
      4: 14,
      9: 31,
      21: 42,
      28: 84,
      51: 67,
      72: 91,
      80: 99
    };

    // Definisi Ular: start -> end (start > end)
    this.snakes = {
      17: 7,
      54: 34,
      62: 19,
      64: 60,
      87: 36,
      93: 73,
      95: 75,
      98: 79
    };

    // Kotak bintang khusus
    this.starTiles = new Set([12, 33, 48, 77, 88]);

    // Palet warna ceria untuk kotak papan
    this.tileThemes = {
      forest: {
        bg1: '#dcfce7', // light mint
        bg2: '#fef08a', // light sunshine
        bg3: '#ffedd5', // light peach
        bg4: '#e0f2fe', // light sky
        mathBg: '#fbcfe8',
        starBg: '#fef08a'
      },
      space: {
        bg1: '#e0e7ff',
        bg2: '#ede9fe',
        bg3: '#fae8ff',
        bg4: '#dbeafe',
        mathBg: '#fbcfe8',
        starBg: '#fef9c3'
      },
      ocean: {
        bg1: '#ccfbf1',
        bg2: '#e0f2fe',
        bg3: '#dbeafe',
        bg4: '#f1f5f9',
        mathBg: '#fed7aa',
        starBg: '#fef08a'
      }
    };
  }

  /**
   * Mengembalikan baris dan kolom 0-indexed untuk nomor kotak 1-100
   * Baris 0 = bawah (1-10), Baris 9 = atas (91-100)
   * Kolom 0 = kiri, Kolom 9 = kanan
   */
  getTileCoordinates(tileNumber) {
    if (tileNumber < 1) tileNumber = 1;
    if (tileNumber > 100) tileNumber = 100;

    const rowFromBottom = Math.floor((tileNumber - 1) / 10);
    const indexInRow = (tileNumber - 1) % 10;
    
    let col;
    if (rowFromBottom % 2 === 0) {
      // Baris genap dari bawah (1-10, 21-30, ...): Kiri ke Kanan
      col = indexInRow;
    } else {
      // Baris ganjil dari bawah (11-20, 31-40, ...): Kanan ke Kiri
      col = 9 - indexInRow;
    }

    const row = 9 - rowFromBottom; // CSS grid row: 0 paling atas, 9 paling bawah
    return { row, col, rowFromBottom };
  }

  // Apakah kotak memicu kuis matematika?
  isMathTile(tileNumber) {
    if (tileNumber <= 1 || tileNumber >= 100) return false;
    // Kelipatan 5 atau kotak bintang ✨
    return (tileNumber % 5 === 0) || this.starTiles.has(tileNumber);
  }

  // Render Grid HTML 10x10 ke container
  renderBoard(containerId, theme = 'forest') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const themeColors = this.tileThemes[theme] || this.tileThemes.forest;

    // Buat 100 kotak (dari baris atas ke baris bawah untuk CSS Grid)
    for (let r = 0; r < 10; r++) {
      const rowFromBottom = 9 - r;
      for (let c = 0; c < 10; c++) {
        let tileNum;
        if (rowFromBottom % 2 === 0) {
          tileNum = (rowFromBottom * 10) + c + 1;
        } else {
          tileNum = (rowFromBottom * 10) + (9 - c) + 1;
        }

        const tileEl = document.createElement('div');
        tileEl.className = 'board-tile';
        tileEl.id = `tile-${tileNum}`;
        tileEl.dataset.tile = tileNum;

        // Tentukan warna dan ikon kotak
        const isMath = this.isMathTile(tileNum);
        const isStar = this.starTiles.has(tileNum);
        const isLadderStart = this.ladders[tileNum];
        const isLadderEnd = Object.values(this.ladders).includes(tileNum);
        const isSnakeHead = this.snakes[tileNum];
        const isSnakeTail = Object.values(this.snakes).includes(tileNum);

        let badgeHtml = '';
        let specialClass = '';

        if (tileNum === 1) {
          badgeHtml = '<span class="tile-badge start-badge">🚀 START</span>';
          specialClass = 'tile-start';
        } else if (tileNum === 100) {
          badgeHtml = '<span class="tile-badge finish-badge">🏆 FINISH</span>';
          specialClass = 'tile-finish';
        } else if (isLadderStart) {
          badgeHtml = `<span class="tile-badge ladder-badge">🪜 Naik ke ${this.ladders[tileNum]}</span>`;
          specialClass = 'tile-ladder-base';
        } else if (isSnakeHead) {
          badgeHtml = `<span class="tile-badge snake-badge">🐍 Awas ke ${this.snakes[tileNum]}</span>`;
          specialClass = 'tile-snake-head';
        } else if (isStar) {
          badgeHtml = '<span class="tile-badge star-badge">✨ Soal Bintang</span>';
          specialClass = 'tile-star-special';
        } else if (tileNum % 5 === 0) {
          badgeHtml = '<span class="tile-badge math-badge">🔢 Matematika</span>';
          specialClass = 'tile-math-special';
        }

        tileEl.className += ` ${specialClass}`;

        tileEl.innerHTML = `
          <div class="tile-number">${tileNum}</div>
          <div class="tile-badge-wrapper">${badgeHtml}</div>
          <div class="tile-pawns-slot" id="pawns-slot-${tileNum}"></div>
        `;

        container.appendChild(tileEl);
      }
    }

    // Render Overlay Ular & Tangga setelah DOM terpasang
    setTimeout(() => this.drawSnakesAndLadders('snakes-ladders-svg'), 50);
  }

  // Hitung titik tengah persen (0% - 100%) untuk kotak nomor tertentu
  getTileCenterPercent(tileNumber) {
    const { row, col } = this.getTileCoordinates(tileNumber);
    // col: 0..9 -> center = (col + 0.5) * 10
    // row: 0..9 -> center = (row + 0.5) * 10
    return {
      x: (col + 0.5) * 10,
      y: (row + 0.5) * 10
    };
  }

  // Gambar semua Ular dan Tangga pada SVG Canvas Overlay
  drawSnakesAndLadders(svgId) {
    const svg = document.getElementById(svgId);
    if (!svg) return;

    svg.setAttribute('viewBox', '0 0 1000 1000');
    svg.innerHTML = `
      <defs>
        <!-- Filter Bayangan Halus 3D -->
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="6" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.25"/>
        </filter>
        
        <!-- Gradient Pelangi untuk Tangga -->
        <linearGradient id="rainbow-ladder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e" />
          <stop offset="25%" stop-color="#fb923c" />
          <stop offset="50%" stop-color="#facc15" />
          <stop offset="75%" stop-color="#4ade80" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>

        <linearGradient id="golden-wood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fde047" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>

        <!-- Gradient Ular Kartun Lucu -->
        <linearGradient id="snake-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4ade80" />
          <stop offset="100%" stop-color="#15803d" />
        </linearGradient>

        <linearGradient id="snake-orange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fb923c" />
          <stop offset="100%" stop-color="#c2410c" />
        </linearGradient>

        <linearGradient id="snake-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c084fc" />
          <stop offset="100%" stop-color="#7e22ce" />
        </linearGradient>

        <linearGradient id="snake-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#0369a1" />
        </linearGradient>
      </defs>
    `;

    let laddersSvgGroup = '<g class="ladders-group" filter="url(#soft-shadow)">';
    let snakesSvgGroup = '<g class="snakes-group" filter="url(#soft-shadow)">';

    // 1. Gambar Tangga
    let ladderIdx = 0;
    for (const [startStr, end] of Object.entries(this.ladders)) {
      const start = parseInt(startStr);
      const p1 = this.getTileCenterPercent(start);
      const p2 = this.getTileCenterPercent(end);

      const x1 = p1.x * 10;
      const y1 = p1.y * 10;
      const x2 = p2.x * 10;
      const y2 = p2.y * 10;

      const isRainbow = ladderIdx % 2 === 0;
      laddersSvgGroup += this.createLadderSvg(x1, y1, x2, y2, isRainbow);
      ladderIdx++;
    }
    laddersSvgGroup += '</g>';

    // 2. Gambar Ular Kartun Ceria
    const snakeColors = ['snake-green', 'snake-orange', 'snake-purple', 'snake-cyan'];
    let snakeIdx = 0;
    for (const [startStr, end] of Object.entries(this.snakes)) {
      const start = parseInt(startStr); // Kepala (angka lebih tinggi)
      const headPos = this.getTileCenterPercent(start);
      const tailPos = this.getTileCenterPercent(end);

      const hx = headPos.x * 10;
      const hy = headPos.y * 10;
      const tx = tailPos.x * 10;
      const ty = tailPos.y * 10;

      const colorId = snakeColors[snakeIdx % snakeColors.length];
      snakesSvgGroup += this.createCuteSnakeSvg(hx, hy, tx, ty, colorId, snakeIdx);
      snakeIdx++;
    }
    snakesSvgGroup += '</g>';

    svg.innerHTML += laddersSvgGroup + snakesSvgGroup;
  }

  // Listener resize otomatis
  initResizeListener() {
    window.addEventListener('resize', () => {
      this.drawSnakesAndLadders('snakes-ladders-svg');
    });
  }

  // Buat tangga dengan anak tangga presisi
  createLadderSvg(x1, y1, x2, y2, isRainbow) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy);
    
    // Sudut normal tegak lurus
    const perpX = (-dy / dist) * 14;
    const perpY = (dx / dist) * 14;

    const lx1 = x1 + perpX;
    const ly1 = y1 + perpY;
    const lx2 = x2 + perpX;
    const ly2 = y2 + perpY;

    const rx1 = x1 - perpX;
    const ry1 = y1 - perpY;
    const rx2 = x2 - perpX;
    const ry2 = y2 - perpY;

    const railColor = isRainbow ? 'url(#rainbow-ladder)' : 'url(#golden-wood)';
    const rungColor = isRainbow ? '#facc15' : '#fef08a';

    let rungs = '';
    const numRungs = Math.max(3, Math.floor(dist / 38));
    for (let i = 1; i <= numRungs; i++) {
      const t = i / (numRungs + 1);
      const rx_l = lx1 + (lx2 - lx1) * t;
      const ry_l = ly1 + (ly2 - ly1) * t;
      const rx_r = rx1 + (rx2 - rx1) * t;
      const ry_r = ry1 + (ry2 - ry1) * t;

      rungs += `<line x1="${rx_l}" y1="${ry_l}" x2="${rx_r}" y2="${ry_r}" stroke="${rungColor}" stroke-width="7" stroke-linecap="round"/>`;
    }

    // Bintang hiasan di ujung atas tangga
    const starDecor = `
      <circle cx="${x2}" cy="${y2}" r="12" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="${x2},${y2-8} ${x2+3},${y2-3} ${x2+8},${y2-3} ${x2+4},${y2+1} ${x2+6},${y2+6} ${x2},${y2+3} ${x2-6},${y2+6} ${x2-4},${y2+1} ${x2-8},${y2-3} ${x2-3},${y2-3}" fill="#ffffff"/>
    `;

    return `
      <g class="ladder-item">
        <!-- Rel Kiri & Kanan Tangga -->
        <line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="${railColor}" stroke-width="10" stroke-linecap="round"/>
        <line x1="${rx1}" y1="${ry1}" x2="${rx2}" y2="${ry2}" stroke="${railColor}" stroke-width="10" stroke-linecap="round"/>
        <!-- Anak Tangga -->
        ${rungs}
        ${starDecor}
      </g>
    `;
  }

  // Buat ular kartun bergelombang lucu dengan kepala, topi, mata ramah, dan pola belang
  createCuteSnakeSvg(hx, hy, tx, ty, colorId, idx) {
    const dx = tx - hx;
    const dy = ty - hy;
    const dist = Math.hypot(dx, dy);

    // Titik kontrol lengkungan bergelombang (bezier curve)
    const sign = idx % 2 === 0 ? 1 : -1;
    const perpX = (-dy / dist) * Math.min(100, dist * 0.35) * sign;
    const perpY = (dx / dist) * Math.min(100, dist * 0.35) * sign;

    const cx1 = hx + dx * 0.33 + perpX;
    const cy1 = hy + dy * 0.33 + perpY;
    const cx2 = hx + dx * 0.66 - perpX;
    const cy2 = hy + dy * 0.66 - perpY;

    // Topi pesta lucu di kepala ular
    const hat = `
      <polygon points="${hx},${hy-28} ${hx-9},${hy-14} ${hx+9},${hy-14}" fill="#f43f5e"/>
      <circle cx="${hx}" cy="${hy-28}" r="3" fill="#fde047"/>
    `;

    return `
      <g class="snake-item">
        <!-- Badan Ular Bergelombang -->
        <path d="M ${hx} ${hy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}"
              fill="none" stroke="url(#${colorId})" stroke-width="24" stroke-linecap="round"/>
        
        <!-- Garis Belang/Perut Ular -->
        <path d="M ${hx} ${hy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}"
              fill="none" stroke="#fef08a" stroke-width="8" stroke-dasharray="14,14" stroke-linecap="round" opacity="0.85"/>

        <!-- Ekor Ular Mungil -->
        <circle cx="${tx}" cy="${ty}" r="9" fill="#facc15"/>

        <!-- Kepala Ular Lucu -->
        <circle cx="${hx}" cy="${hy}" r="20" fill="url(#${colorId})"/>
        
        <!-- Mata Kartun Ramah -->
        <circle cx="${hx - 7}" cy="${hy - 4}" r="5.5" fill="#ffffff"/>
        <circle cx="${hx - 6}" cy="${hy - 4}" r="3" fill="#0f172a"/>
        <circle cx="${hx - 5}" cy="${hy - 5}" r="1" fill="#ffffff"/>

        <circle cx="${hx + 7}" cy="${hy - 4}" r="5.5" fill="#ffffff"/>
        <circle cx="${hx + 6}" cy="${hy - 4}" r="3" fill="#0f172a"/>
        <circle cx="${hx + 7}" cy="${hy - 5}" r="1" fill="#ffffff"/>

        <!-- Senyum Ramah Ular (Bukan Menakutkan) -->
        <path d="M ${hx - 6} ${hy + 7} Q ${hx} ${hy + 14} ${hx + 6} ${hy + 7}" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
        
        <!-- Pipi Pink Merona -->
        <circle cx="${hx - 12}" cy="${hy + 5}" r="3.5" fill="#fb7185" opacity="0.8"/>
        <circle cx="${hx + 12}" cy="${hy + 5}" r="3.5" fill="#fb7185" opacity="0.8"/>

        <!-- Topi Pesta -->
        ${hat}
      </g>
    `;
  }
}

window.boardEngine = new BoardEngine();
window.boardEngine.initResizeListener();

