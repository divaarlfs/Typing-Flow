/**
 * mascot.js - Interactive Kids-Friendly Mascot System
 * Menghandle ekspresi SVG, animasi, dan kalimat afirmasi positif ramah anak.
 */

class MascotSystem {
  constructor() {
    this.currentMascot = 'panda'; // 'panda' | 'cat' | 'hamster' | 'shiba'
    this.currentState = 'idle';  // 'idle' | 'thinking' | 'happy' | 'cheerup' | 'dance'
    this.speechTimeout = null;
    this.stateResetTimeout = null;

    this.quotes = {
      correct: [
        "🌟 Luar biasa! Kamu pintar sekali!",
        "🎉 Hebat! Jawabanmu tepat 100%!",
        "🚀 Keren banget, ayo lanjut melompat!",
        "✨ Wow, kamu calon juara matematika!",
        "🎈 Mantap! Langkahmu makin jauh!",
        "🏆 Pintar banget, aku bangga padamu!"
      ],
      wrong: [
        "🌱 Hampir benar! Jangan menyerah ya!",
        "💪 Ayo semangat, kamu pasti bisa!",
        "😊 Tidak apa-apa, yuk kita coba lagi!",
        "⭐ Belajar itu seru, tetap fokus ya!",
        "🌈 Sedikit lagi tepat, kamu hebat kok!"
      ],
      idle: [
        "🎲 Giliran siapa melempar dadu ya?",
        "✨ Ayo kita berpetualang ke kotak 100!",
        "🪜 Semoga kita dapat tangga pelangi!",
        "🐍 Hati-hati jangan sampai tergelincir naga ya!",
        "⭐ Kotak matematika bikin kita makin cerdas!"
      ],
      ladder: [
        "🌈 Yeay! Tangga ajaib membawa kita naik tinggi!",
        "🚀 Wush! Naik tangga pelangi secepat kilat!"
      ],
      snake: [
        "🎈 Ups, meluncur santai dulu ya! Kita bisa naik lagi!",
        "🐾 Jangan berkecil hati, ayo kejar lagi!"
      ],
      victory: [
        "👑 Horeee! Kamu berhasil mencapai Kotak 100!",
        "🏆 Selamat! Kamu adalah Juara Bintang Matematika!"
      ]
    };
  }

  setMascot(mascotType) {
    this.currentMascot = mascotType;
    this.renderMascot();
  }

  // Render SVG Maskot sesuai tipe dan ekspresi saat ini
  getMascotSvg(type, state) {
    switch (type) {
      case 'cat':
        return this.getCatSvg(state);
      case 'hamster':
        return this.getHamsterSvg(state);
      case 'shiba':
        return this.getShibaSvg(state);
      case 'panda':
      default:
        return this.getPandaSvg(state);
    }
  }

  // --- SVG PANDA POBI ---
  getPandaSvg(state) {
    const isHappy = state === 'happy' || state === 'dance';
    const isCheerup = state === 'cheerup';
    const isThinking = state === 'thinking';

    const eyeLeft = isHappy 
      ? `<path d="M38 52 Q45 42 52 52" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : isCheerup 
        ? `<circle cx="45" cy="52" r="5" fill="#1e293b"/><circle cx="46" cy="50" r="1.5" fill="#ffffff"/><path d="M36 58 Q40 62 44 60" stroke="#38bdf8" stroke-width="2.5" fill="none"/>`
        : `<circle cx="45" cy="50" r="6" fill="#1e293b"/><circle cx="47" cy="48" r="2.5" fill="#ffffff"/>`;

    const eyeRight = isHappy 
      ? `<path d="M68 52 Q75 42 82 52" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : isCheerup 
        ? `<circle cx="75" cy="52" r="5" fill="#1e293b"/><circle cx="76" cy="50" r="1.5" fill="#ffffff"/>`
        : `<circle cx="75" cy="50" r="6" fill="#1e293b"/><circle cx="77" cy="48" r="2.5" fill="#ffffff"/>`;

    const mouth = isHappy
      ? `<path d="M50 64 Q60 76 70 64" fill="#fb7185" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>`
      : isCheerup
        ? `<path d="M52 68 Q60 62 68 68" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round"/>`
        : isThinking
          ? `<ellipse cx="60" cy="65" rx="3" ry="4" fill="#1e293b"/>`
          : `<path d="M54 62 Q60 68 66 62" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round"/>`;

    const cheeks = `<circle cx="34" cy="58" r="7" fill="#fda4af" opacity="0.8"/><circle cx="86" cy="58" r="7" fill="#fda4af" opacity="0.8"/>`;
    
    // Starry sparkles if happy
    const sparkles = isHappy ? `
      <g class="sparkle-group">
        <polygon points="20,25 23,32 30,35 23,38 20,45 17,38 10,35 17,32" fill="#fbbf24"/>
        <polygon points="100,20 102,26 108,28 102,30 100,36 98,30 92,28 98,26" fill="#f43f5e"/>
      </g>` : '';

    const crown = state === 'dance' ? `
      <polygon points="45,22 52,10 60,18 68,10 75,22" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
      <circle cx="52" cy="10" r="2.5" fill="#ef4444"/>
      <circle cx="68" cy="10" r="2.5" fill="#3b82f6"/>` : '';

    return `
      <svg viewBox="0 0 120 120" class="mascot-svg mascot-panda mascot-${state}">
        ${sparkles}
        ${crown}
        <!-- Telinga Panda Hitam -->
        <circle cx="28" cy="32" r="15" fill="#1e293b"/>
        <circle cx="28" cy="32" r="8" fill="#475569"/>
        <circle cx="92" cy="32" r="15" fill="#1e293b"/>
        <circle cx="92" cy="32" r="8" fill="#475569"/>

        <!-- Badan Panda -->
        <ellipse cx="60" cy="85" rx="36" ry="30" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
        <!-- Lengan Panda -->
        <ellipse cx="${isHappy ? 25 : 28}" cy="${isHappy ? 62 : 82}" rx="11" ry="16" fill="#1e293b" transform="${isHappy ? 'rotate(-35 25 62)' : ''}"/>
        <ellipse cx="${isHappy ? 95 : 92}" cy="${isHappy ? 62 : 82}" rx="11" ry="16" fill="#1e293b" transform="${isHappy ? 'rotate(35 95 62)' : ''}"/>
        <!-- Perut Panda -->
        <ellipse cx="60" cy="88" rx="22" ry="18" fill="#f1f5f9"/>

        <!-- Kepala Panda Putih -->
        <circle cx="60" cy="55" r="34" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
        
        <!-- Bercak Mata Hitam Khas Panda -->
        <ellipse cx="45" cy="51" rx="12" ry="10" fill="#1e293b" transform="rotate(-15 45 51)"/>
        <ellipse cx="75" cy="51" rx="12" ry="10" fill="#1e293b" transform="rotate(15 75 51)"/>

        <!-- Mata -->
        ${eyeLeft}
        ${eyeRight}

        <!-- Hidung Lucu -->
        <ellipse cx="60" cy="58" rx="5" ry="3.5" fill="#0f172a"/>
        <!-- Pipi Merona -->
        ${cheeks}
        <!-- Mulut -->
        ${mouth}

        <!-- Hiasan Daun Bambu Hijau di Kepala -->
        <path d="M60 20 Q66 12 76 16 Q70 24 60 20 Z" fill="#22c55e"/>
        <path d="M60 20 Q54 10 46 14 Q52 22 60 20 Z" fill="#16a34a"/>
      </svg>
    `;
  }

  // --- SVG KUCING OREN MIMI ---
  getCatSvg(state) {
    const isHappy = state === 'happy' || state === 'dance';
    const isCheerup = state === 'cheerup';

    const eyeLeft = isHappy 
      ? `<path d="M38 52 Q45 42 52 52" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : `<circle cx="45" cy="50" r="6" fill="#451a03"/><circle cx="47" cy="48" r="2.5" fill="#ffffff"/>`;

    const eyeRight = isHappy 
      ? `<path d="M68 52 Q75 42 82 52" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : `<circle cx="75" cy="50" r="6" fill="#451a03"/><circle cx="77" cy="48" r="2.5" fill="#ffffff"/>`;

    const mouth = isHappy
      ? `<path d="M50 63 Q60 74 70 63" fill="#f43f5e" stroke="#451a03" stroke-width="3" stroke-linecap="round"/>`
      : isCheerup
        ? `<path d="M52 66 Q60 60 68 66" stroke="#451a03" stroke-width="3" fill="none" stroke-linecap="round"/>`
        : `<path d="M52 61 Q56 65 60 61 Q64 65 68 61" stroke="#451a03" stroke-width="3" fill="none" stroke-linecap="round"/>`;

    return `
      <svg viewBox="0 0 120 120" class="mascot-svg mascot-cat mascot-${state}">
        <!-- Telinga Kucing Segitiga -->
        <polygon points="26,45 36,15 54,35" fill="#fb923c" stroke="#ea580c" stroke-width="2"/>
        <polygon points="30,42 38,20 50,35" fill="#fbcfe8"/>
        <polygon points="94,45 84,15 66,35" fill="#fb923c" stroke="#ea580c" stroke-width="2"/>
        <polygon points="90,42 82,20 70,35" fill="#fbcfe8"/>

        <!-- Badan Kucing -->
        <ellipse cx="60" cy="85" rx="35" ry="28" fill="#fb923c" stroke="#ea580c" stroke-width="2.5"/>
        <ellipse cx="60" cy="88" rx="20" ry="18" fill="#fff7ed"/>

        <!-- Kepala Kucing -->
        <circle cx="60" cy="55" r="33" fill="#fdba74" stroke="#ea580c" stroke-width="2.5"/>
        
        <!-- Garis Belang Kucing di Dahi -->
        <path d="M60 26 L60 36 M52 30 L55 38 M68 30 L65 38" stroke="#c2410c" stroke-width="3" stroke-linecap="round"/>

        <!-- Mata -->
        ${eyeLeft}
        ${eyeRight}

        <!-- Hidung & Pipi Pink -->
        <polygon points="57,57 63,57 60,61" fill="#f43f5e"/>
        <circle cx="35" cy="58" r="6" fill="#f472b6" opacity="0.8"/>
        <circle cx="85" cy="58" r="6" fill="#f472b6" opacity="0.8"/>

        <!-- Kumis Kucing Lucu -->
        <line x1="22" y1="56" x2="36" y2="58" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
        <line x1="22" y1="64" x2="36" y2="62" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
        <line x1="98" y1="56" x2="84" y2="58" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
        <line x1="98" y1="64" x2="84" y2="62" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>

        <!-- Mulut -->
        ${mouth}

        <!-- Pita Lucu -->
        <path d="M80 32 Q88 26 90 34 Q84 36 80 32 Z" fill="#ec4899"/>
        <path d="M80 32 Q84 40 76 40 Q76 34 80 32 Z" fill="#ec4899"/>
        <circle cx="80" cy="34" r="3" fill="#fde047"/>
      </svg>
    `;
  }

  // --- SVG HAMSTER HAMI ---
  getHamsterSvg(state) {
    const isHappy = state === 'happy' || state === 'dance';
    const isCheerup = state === 'cheerup';

    const eyeLeft = isHappy 
      ? `<path d="M40 52 Q46 44 52 52" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : `<circle cx="46" cy="50" r="5.5" fill="#451a03"/><circle cx="48" cy="48" r="2" fill="#ffffff"/>`;

    const eyeRight = isHappy 
      ? `<path d="M68 52 Q74 44 80 52" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : `<circle cx="74" cy="50" r="5.5" fill="#451a03"/><circle cx="76" cy="48" r="2" fill="#ffffff"/>`;

    const mouth = isHappy
      ? `<path d="M52 64 Q60 74 68 64" fill="#fb7185" stroke="#451a03" stroke-width="2.5" stroke-linecap="round"/>`
      : isCheerup
        ? `<path d="M54 66 Q60 62 66 66" stroke="#451a03" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
        : `<path d="M55 62 Q60 66 65 62" stroke="#451a03" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;

    return `
      <svg viewBox="0 0 120 120" class="mascot-svg mascot-hamster mascot-${state}">
        <!-- Telinga Bundar -->
        <circle cx="32" cy="30" r="14" fill="#d97706"/>
        <circle cx="32" cy="30" r="8" fill="#fed7aa"/>
        <circle cx="88" cy="30" r="14" fill="#d97706"/>
        <circle cx="88" cy="30" r="8" fill="#fed7aa"/>

        <!-- Badan & Pipi Tembem Hamster -->
        <ellipse cx="60" cy="80" rx="38" ry="32" fill="#f59e0b" stroke="#d97706" stroke-width="2.5"/>
        <ellipse cx="60" cy="84" rx="24" ry="22" fill="#fef3c7"/>

        <!-- Kepala Hamster Bundar -->
        <circle cx="60" cy="56" r="32" fill="#fbbf24" stroke="#d97706" stroke-width="2.5"/>
        <!-- Pipi Gembul Kiri & Kanan -->
        <circle cx="36" cy="62" r="12" fill="#fbbf24"/>
        <circle cx="84" cy="62" r="12" fill="#fbbf24"/>
        <circle cx="34" cy="62" r="8" fill="#fca5a5" opacity="0.85"/>
        <circle cx="86" cy="62" r="8" fill="#fca5a5" opacity="0.85"/>

        <!-- Gigi Hamster Imut -->
        <rect x="57" y="60" width="6" height="5" rx="1.5" fill="#ffffff" stroke="#451a03" stroke-width="1.5"/>

        <!-- Mata -->
        ${eyeLeft}
        ${eyeRight}

        <!-- Hidung Kecil -->
        <ellipse cx="60" cy="57" rx="3.5" ry="2.5" fill="#e11d48"/>
        <!-- Mulut -->
        ${mouth}

        <!-- Hamster Memegang Biji Bunga Matahari -->
        <ellipse cx="60" cy="85" rx="7" ry="11" fill="#78350f" transform="rotate(20 60 85)"/>
        <path d="M58 76 L62 94" stroke="#d97706" stroke-width="1.5"/>
      </svg>
    `;
  }

  // --- SVG SHIBA DOGO ---
  getShibaSvg(state) {
    const isHappy = state === 'happy' || state === 'dance';
    const isCheerup = state === 'cheerup';

    const eyeLeft = isHappy 
      ? `<path d="M38 52 Q45 42 52 52" stroke="#292524" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : `<circle cx="45" cy="50" r="5.5" fill="#292524"/><circle cx="47" cy="48" r="2" fill="#ffffff"/>`;

    const eyeRight = isHappy 
      ? `<path d="M68 52 Q75 42 82 52" stroke="#292524" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : `<circle cx="75" cy="50" r="5.5" fill="#292524"/><circle cx="77" cy="48" r="2" fill="#ffffff"/>`;

    const mouth = isHappy
      ? `<path d="M50 62 Q60 76 70 62" fill="#f43f5e" stroke="#292524" stroke-width="3" stroke-linecap="round"/>
         <ellipse cx="60" cy="68" rx="5" ry="4" fill="#fb7185"/>`
      : isCheerup
        ? `<path d="M52 66 Q60 60 68 66" stroke="#292524" stroke-width="3" fill="none" stroke-linecap="round"/>`
        : `<path d="M52 62 Q56 66 60 62 Q64 66 68 62" stroke="#292524" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;

    return `
      <svg viewBox="0 0 120 120" class="mascot-svg mascot-shiba mascot-${state}">
        <!-- Telinga Shiba Tegak -->
        <polygon points="26,42 38,16 54,34" fill="#d97706" stroke="#b45309" stroke-width="2"/>
        <polygon points="32,38 40,22 50,34" fill="#fef3c7"/>
        <polygon points="94,42 82,16 66,34" fill="#d97706" stroke="#b45309" stroke-width="2"/>
        <polygon points="88,38 80,22 70,34" fill="#fef3c7"/>

        <!-- Badan Shiba -->
        <ellipse cx="60" cy="85" rx="36" ry="28" fill="#d97706" stroke="#b45309" stroke-width="2"/>
        <ellipse cx="60" cy="88" rx="22" ry="18" fill="#ffffff"/>

        <!-- Kepala Shiba Ceria -->
        <circle cx="60" cy="54" r="33" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
        <!-- Alis Putih Khas Shiba -->
        <ellipse cx="44" cy="40" rx="4" ry="3" fill="#ffffff"/>
        <ellipse cx="76" cy="40" rx="4" ry="3" fill="#ffffff"/>

        <!-- Moncong Putih -->
        <ellipse cx="60" cy="62" rx="16" ry="12" fill="#ffffff"/>

        <!-- Mata -->
        ${eyeLeft}
        ${eyeRight}

        <!-- Hidung Hitam -->
        <ellipse cx="60" cy="57" rx="5" ry="3.5" fill="#18181b"/>
        <!-- Pipi Pink -->
        <circle cx="35" cy="58" r="6" fill="#fb7185" opacity="0.8"/>
        <circle cx="85" cy="58" r="6" fill="#fb7185" opacity="0.8"/>

        <!-- Mulut Lidah Menjulur -->
        ${mouth}

        <!-- Bandana Hijau Lucu -->
        <path d="M38 78 Q60 88 82 78 L60 96 Z" fill="#10b981" stroke="#047857" stroke-width="1.5"/>
        <circle cx="60" cy="84" r="3" fill="#ffffff"/>
      </svg>
    `;
  }

  // Update kontainer HTML maskot
  renderMascot() {
    const mascotContainer = document.getElementById('mascot-avatar-container');
    if (!mascotContainer) return;
    mascotContainer.innerHTML = this.getMascotSvg(this.currentMascot, this.currentState);
  }

  // Tampilkan balon ucapan afirmasi teks
  say(text, duration = 4000) {
    const bubble = document.getElementById('mascot-speech-bubble');
    if (!bubble) return;

    bubble.innerHTML = `<span class="bubble-text">${text}</span>`;
    bubble.classList.remove('hidden');
    bubble.classList.add('bubble-pop');

    if (this.speechTimeout) clearTimeout(this.speechTimeout);
    this.speechTimeout = setTimeout(() => {
      bubble.classList.remove('bubble-pop');
      bubble.classList.add('bubble-fade');
      setTimeout(() => {
        bubble.classList.add('hidden');
        bubble.classList.remove('bubble-fade');
      }, 400);
    }, duration);
  }

  // Reaksi saat Jawaban BENAR
  onCorrectAnswer() {
    this.setState('happy');
    const randomQuote = this.quotes.correct[Math.floor(Math.random() * this.quotes.correct.length)];
    this.say(randomQuote, 4500);

    if (this.stateResetTimeout) clearTimeout(this.stateResetTimeout);
    this.stateResetTimeout = setTimeout(() => {
      this.setState('idle');
    }, 4500);
  }

  // Reaksi saat Jawaban SALAH (Murung lembut sejenak -> langsung pose semangat)
  onWrongAnswer() {
    this.setState('cheerup');
    const randomQuote = this.quotes.wrong[Math.floor(Math.random() * this.quotes.wrong.length)];
    this.say(randomQuote, 4500);

    if (this.stateResetTimeout) clearTimeout(this.stateResetTimeout);
    this.stateResetTimeout = setTimeout(() => {
      this.setState('idle');
    }, 4500);
  }

  // Reaksi saat berfikir (modal soal terbuka)
  onQuestionStart() {
    this.setState('thinking');
    this.say("Ayo hitung pelan-pelan, kamu pasti bisa! ⏳", 3500);
  }

  // Reaksi saat naik tangga
  onLadderClimb() {
    this.setState('happy');
    const randomQuote = this.quotes.ladder[Math.floor(Math.random() * this.quotes.ladder.length)];
    this.say(randomQuote, 3500);
    setTimeout(() => this.setState('idle'), 3500);
  }

  // Reaksi saat terkena ular
  onSnakeSlide() {
    this.setState('cheerup');
    const randomQuote = this.quotes.snake[Math.floor(Math.random() * this.quotes.snake.length)];
    this.say(randomQuote, 3500);
    setTimeout(() => this.setState('idle'), 3500);
  }

  // Reaksi saat ada pemenang
  onVictory(winnerName) {
    this.setState('dance');
    this.say(`🎉 HOREEE! Selamat ${winnerName}! Kamu Juara Bintang Matematika! 🏆👑`, 8000);
  }

  // Reaksi idle / giliran pemain
  onIdleTurn(playerName) {
    if (this.currentState === 'idle') {
      this.say(`Ayo ${playerName}, saatnya lempar dadu! 🎲`, 3000);
    }
  }

  setState(newState) {
    this.currentState = newState;
    this.renderMascot();
  }
}

window.mascotSystem = new MascotSystem();
