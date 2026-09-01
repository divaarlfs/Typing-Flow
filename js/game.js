/**
 * game.js - Main Game Controller and State Machine
 * Mengkoordinasikan pergerakan pion, dadu 3D, kuis matematika, giliran AI, dan modal kemenangan.
 */

class GameController {
  constructor() {
    this.gradeLevel = 'grade_1_2';
    this.theme = 'forest';
    this.isRolling = false;
    this.isProcessingMove = false;
    this.questionTimer = null;
    this.questionTimeLeft = 20;
    this.currentQuestion = null;
    this.isGameOver = false;
  }

  init() {
    this.setupEventListeners();
    this.showScreen('screen-welcome');
  }

  showScreen(screenId) {
    document.querySelectorAll('.app-screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(screenId);
    if (target) target.classList.remove('hidden');
  }

  setupEventListeners() {
    // Tombol Mulai di Layar Sambutan
    const btnPlayNow = document.getElementById('btn-play-now');
    if (btnPlayNow) {
      btnPlayNow.addEventListener('click', () => {
        window.soundEngine.init();
        window.soundEngine.playPopup();
        this.showScreen('screen-setup');
      });
    }

    // Tombol Kembali ke Menu
    const btnBackToWelcome = document.getElementById('btn-back-to-welcome');
    if (btnBackToWelcome) {
      btnBackToWelcome.addEventListener('click', () => {
        window.soundEngine.playPopup();
        this.showScreen('screen-welcome');
      });
    }

    // Setup Pemilihan Mode & Avatar
    const modeSelect = document.getElementById('select-game-mode');
    if (modeSelect) {
      modeSelect.addEventListener('change', (e) => this.handleModeChange(e.target.value));
    }

    // Tombol Start Game Utama
    const btnStartGame = document.getElementById('btn-start-game');
    if (btnStartGame) {
      btnStartGame.addEventListener('click', () => this.startGameFromSetup());
    }

    // Tombol Lempar Dadu
    const btnRollDice = document.getElementById('btn-roll-dice');
    if (btnRollDice) {
      btnRollDice.addEventListener('click', () => this.rollDice());
    }

    // Tombol Sound / Music Controls
    const btnToggleSound = document.getElementById('btn-toggle-sound');
    if (btnToggleSound) {
      btnToggleSound.addEventListener('click', () => {
        const muted = window.soundEngine.toggleMute();
        btnToggleSound.innerHTML = muted ? '🔇 Suara: Mati' : '🔊 Suara: Nyala';
        btnToggleSound.classList.toggle('btn-muted', muted);
      });
    }

    const btnToggleBgm = document.getElementById('btn-toggle-bgm');
    if (btnToggleBgm) {
      btnToggleBgm.addEventListener('click', () => {
        const playing = window.soundEngine.toggleBgm();
        btnToggleBgm.innerHTML = playing ? '🎵 Musik: Nyala' : '🎵 Musik: Mati';
        btnToggleBgm.classList.toggle('btn-active', playing);
      });
    }

    // Tombol Petunjuk Cara Bermain
    const btnHelp = document.getElementById('btn-help');
    const modalHelp = document.getElementById('modal-help');
    const btnCloseHelp = document.getElementById('btn-close-help');
    if (btnHelp && modalHelp) {
      btnHelp.addEventListener('click', () => {
        window.soundEngine.playPopup();
        modalHelp.classList.remove('hidden');
      });
    }
    if (btnCloseHelp && modalHelp) {
      btnCloseHelp.addEventListener('click', () => {
        modalHelp.classList.add('hidden');
      });
    }

    // Tombol Main Lagi di Layar Kemenangan
    const btnPlayAgain = document.getElementById('btn-play-again');
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', () => {
        window.soundEngine.playPopup();
        this.showScreen('screen-setup');
      });
    }

    // Interaksi Maskot saat diklik (reaksi sapaan lucu)
    const mascotBox = document.getElementById('mascot-companion-box');
    if (mascotBox) {
      mascotBox.addEventListener('click', () => {
        window.soundEngine.playTone(587.33, 'sine', 0.15);
        window.mascotSystem.say("Semangat terus ya! Kamu anak yang pintar! ✨", 3000);
      });
    }
  }

  handleModeChange(mode) {
    const customNamesArea = document.getElementById('custom-player-names-area');
    if (!customNamesArea) return;

    if (mode === '2p_local') {
      customNamesArea.innerHTML = `
        <div class="form-group">
          <label>Nama Pemain 2:</label>
          <input type="text" id="player2-name" class="input-cute" value="Pemain 2" maxlength="12" />
        </div>
      `;
    } else if (mode === '3p_local') {
      customNamesArea.innerHTML = `
        <div class="form-group">
          <label>Nama Pemain 2:</label>
          <input type="text" id="player2-name" class="input-cute" value="Pemain 2" maxlength="12" />
        </div>
        <div class="form-group">
          <label>Nama Pemain 3:</label>
          <input type="text" id="player3-name" class="input-cute" value="Pemain 3" maxlength="12" />
        </div>
      `;
    } else if (mode === '4p_local') {
      customNamesArea.innerHTML = `
        <div class="form-group">
          <label>Nama Pemain 2:</label>
          <input type="text" id="player2-name" class="input-cute" value="Pemain 2" maxlength="12" />
        </div>
        <div class="form-group">
          <label>Nama Pemain 3:</label>
          <input type="text" id="player3-name" class="input-cute" value="Pemain 3" maxlength="12" />
        </div>
        <div class="form-group">
          <label>Nama Pemain 4:</label>
          <input type="text" id="player4-name" class="input-cute" value="Pemain 4" maxlength="12" />
        </div>
      `;
    } else {
      customNamesArea.innerHTML = '';
    }
  }

  startGameFromSetup() {
    const mode = document.getElementById('select-game-mode').value;
    const grade = document.getElementById('select-grade-level').value;
    const theme = document.getElementById('select-board-theme').value;
    const mascot = document.getElementById('select-mascot').value;
    const p1Name = document.getElementById('player1-name').value.trim() || 'Pemain 1';
    const p1Avatar = document.querySelector('input[name="p1-avatar"]:checked')?.value || 'fox';

    const customNames = [];
    const p2Input = document.getElementById('player2-name');
    const p3Input = document.getElementById('player3-name');
    const p4Input = document.getElementById('player4-name');
    if (p2Input) customNames.push(p2Input.value.trim() || 'Pemain 2');
    if (p3Input) customNames.push(p3Input.value.trim() || 'Pemain 3');
    if (p4Input) customNames.push(p4Input.value.trim() || 'Pemain 4');

    this.gradeLevel = grade;
    this.theme = theme;
    this.isGameOver = false;

    // Set Maskot
    window.mascotSystem.setMascot(mascot);

    // Inisialisasi Pemain
    window.playerManager.initPlayers({
      mode,
      p1Name,
      p1Avatar,
      customNames
    });

    // Mulai Game
    this.startActiveGame();
  }

  startActiveGame() {
    this.showScreen('screen-game');

    // Render Papan
    window.boardEngine.renderBoard('board-grid-container', this.theme);
    window.confettiEngine.init();

    // Set Theme Class pada Board Wrapper
    const boardWrap = document.getElementById('game-board-wrapper');
    if (boardWrap) {
      boardWrap.className = `game-board-wrapper theme-${this.theme}`;
    }

    // Render Pion dan HUD Pemain
    this.updateAllPawns();
    this.renderPlayerHUD();
    this.updateTurnUI();

    // Sapaan awal dari Maskot
    const firstPlayer = window.playerManager.getCurrentPlayer();
    window.mascotSystem.say(`Halo semuanya! Selamat datang di Ular Tangga Matematika! Giliran ${firstPlayer.name} pertama ya! 🎲✨`, 4000);

    // Jika pemain pertama adalah AI, jalankan giliran AI
    if (firstPlayer.isAI) {
      setTimeout(() => this.runAITurn(), 1500);
    }
  }

  // Update posisi semua pion di kotak papan
  updateAllPawns() {
    // Bersihkan semua slot pion di setiap kotak
    for (let i = 1; i <= 100; i++) {
      const slot = document.getElementById(`pawns-slot-${i}`);
      if (slot) slot.innerHTML = '';
    }

    // Masukkan pion tiap pemain ke kotaknya
    window.playerManager.players.forEach(player => {
      const slot = document.getElementById(`pawns-slot-${player.position}`);
      if (slot) {
        const pawnEl = document.createElement('div');
        pawnEl.className = `player-pawn pawn-p${player.id}`;
        pawnEl.id = `pawn-player-${player.id}`;
        pawnEl.style.background = player.bgGradient;
        pawnEl.title = `${player.name} (Kotak ${player.position})`;
        pawnEl.innerHTML = `<span class="pawn-avatar-icon">${player.avatar}</span>`;
        slot.appendChild(pawnEl);
      }
    });
  }

  // Render Kartu Info Pemain di HUD
  renderPlayerHUD() {
    const hudContainer = document.getElementById('players-hud-list');
    if (!hudContainer) return;

    hudContainer.innerHTML = '';
    window.playerManager.players.forEach((p, idx) => {
      const isActive = idx === window.playerManager.activePlayerIndex;
      const card = document.createElement('div');
      card.className = `player-hud-card ${isActive ? 'active-player-card' : ''}`;
      card.id = `hud-player-${p.id}`;
      card.style.borderColor = p.color;

      const accuracy = p.stats.questionsTotal > 0 
        ? Math.round((p.stats.questionsCorrect / p.stats.questionsTotal) * 100) 
        : 100;

      card.innerHTML = `
        <div class="hud-avatar" style="background: ${p.bgGradient}">
          <span>${p.avatar}</span>
        </div>
        <div class="hud-info">
          <div class="hud-name">${p.name} ${p.isAI ? '<span class="bot-tag">BOT</span>' : ''}</div>
          <div class="hud-pos">📍 Kotak <strong>${p.position}</strong> / 100</div>
          <div class="hud-math-stat">⭐ Soal Benar: <strong>${p.stats.questionsCorrect}</strong> (${accuracy}%)</div>
        </div>
      `;
      hudContainer.appendChild(card);
    });
  }

  // Update Tampilan Giliran & Tombol Dadu
  updateTurnUI() {
    const current = window.playerManager.getCurrentPlayer();
    const turnIndicator = document.getElementById('turn-indicator-text');
    const btnRoll = document.getElementById('btn-roll-dice');
    const diceMessage = document.getElementById('dice-action-message');

    if (turnIndicator) {
      turnIndicator.innerHTML = `Giliran: <strong style="color:${current.color}">${current.avatar} ${current.name}</strong>`;
    }

    this.renderPlayerHUD();

    if (current.isAI) {
      if (btnRoll) {
        btnRoll.disabled = true;
        btnRoll.classList.add('btn-disabled');
        btnRoll.innerText = '🤖 AI Sedang Berpikir...';
      }
      if (diceMessage) {
        diceMessage.innerText = `${current.name} bersiap melempar dadu...`;
      }
    } else {
      if (btnRoll) {
        btnRoll.disabled = false;
        btnRoll.classList.remove('btn-disabled');
        btnRoll.innerText = '🎲 Lempar Dadu!';
      }
      if (diceMessage) {
        diceMessage.innerText = `Klik tombol untuk melempar dadu!`;
      }
    }
  }

  // Lempar Dadu dengan Animasi 3D dan Suara
  async rollDice() {
    if (this.isRolling || this.isProcessingMove || this.isGameOver) return;

    this.isRolling = true;
    const btnRoll = document.getElementById('btn-roll-dice');
    if (btnRoll) btnRoll.disabled = true;

    window.soundEngine.playDiceRoll();

    const diceBox = document.getElementById('dice-cube-element');
    const diceMessage = document.getElementById('dice-action-message');
    if (diceBox) diceBox.classList.add('rolling-animation');

    const currentPlayer = window.playerManager.getCurrentPlayer();
    window.playerManager.recordRoll(currentPlayer.id);

    // Animasi angka acak berputar cepat
    let finalDiceValue = 1;
    for (let i = 0; i < 10; i++) {
      const tempVal = Math.floor(Math.random() * 6) + 1;
      this.renderDiceFace(tempVal);
      await this.wait(60);
    }

    finalDiceValue = Math.floor(Math.random() * 6) + 1;
    this.renderDiceFace(finalDiceValue);

    if (diceBox) diceBox.classList.remove('rolling-animation');
    this.isRolling = false;

    if (diceMessage) {
      diceMessage.innerText = `${currentPlayer.name} mendapatkan angka ${finalDiceValue}! 🎲`;
    }

    // Mulai proses langkah pion
    await this.wait(400);
    await this.movePlayerSteps(currentPlayer, finalDiceValue);
  }

  // Render Titik Dadu Sesuai Nilai 1-6
  renderDiceFace(val) {
    const diceBox = document.getElementById('dice-cube-element');
    if (!diceBox) return;

    const dotPatterns = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'mid-left', 'mid-right', 'bottom-left', 'bottom-right']
    };

    const pattern = dotPatterns[val] || dotPatterns[1];
    let dotsHtml = '';
    pattern.forEach(pos => {
      dotsHtml += `<div class="dice-dot dot-${pos}"></div>`;
    });

    diceBox.innerHTML = dotsHtml;
  }

  // Gerakan Pion Melangkah Kotak demi Kotak
  async movePlayerSteps(player, steps) {
    this.isProcessingMove = true;
    let startPos = player.position;
    let targetPos = startPos + steps;

    // Periksa apakah overshooting batas 100 (memantul mundur)
    let bounceBack = false;
    let overshootTarget = 100;
    if (targetPos > 100) {
      const excess = targetPos - 100;
      overshootTarget = 100 - excess;
      bounceBack = true;
    }

    // Melangkah maju satu per satu
    for (let step = 1; step <= steps; step++) {
      let currentStepPos = startPos + step;
      if (currentStepPos > 100) {
        currentStepPos = 100 - (currentStepPos - 100);
      }

      player.position = currentStepPos;
      this.updateAllPawns();
      this.renderPlayerHUD();
      window.soundEngine.playPawnHop();
      await this.wait(260);
    }

    // Selesai langkah dasar
    const finalLandedTile = player.position;

    // Cek apakah mendarat di Kotak Matematika (Kelipatan 5 / Bintang ✨)
    const isMath = window.boardEngine.isMathTile(finalLandedTile);

    if (isMath) {
      await this.wait(300);
      const questionResult = await this.promptMathQuestion(player, finalLandedTile);
      
      if (questionResult.correct) {
        // Bonus Langkah Maju +2 kotak untuk jawaban benar!
        await this.wait(400);
        window.mascotSystem.say(`🌟 Jawaban Benar! ${player.name} dapat bonus maju 2 kotak!`, 3000);
        for (let b = 1; b <= 2; b++) {
          if (player.position < 100) {
            player.position++;
            this.updateAllPawns();
            this.renderPlayerHUD();
            window.soundEngine.playPawnHop();
            await this.wait(260);
          }
        }
      } else {
        // Mundur lembut 1 kotak jika salah
        if (player.position > 1) {
          await this.wait(300);
          player.position--;
          this.updateAllPawns();
          this.renderPlayerHUD();
          window.soundEngine.playPawnHop();
        }
      }
    }

    // Cek Tangga atau Ular di posisi sekarang
    await this.checkSnakesAndLadders(player);

    // Cek Kemenangan
    if (player.position >= 100) {
      this.handleGameVictory(player);
      this.isProcessingMove = false;
      return;
    }

    this.isProcessingMove = false;

    // Lanjut ke giliran pemain berikutnya
    const nextPlayer = window.playerManager.nextTurn();
    this.updateTurnUI();

    // Jika giliran berikutnya adalah AI Bot, jalankan otomatis
    if (nextPlayer.isAI) {
      setTimeout(() => this.runAITurn(), 1200);
    }
  }

  // Cek Interaksi Tangga atau Ular
  async checkSnakesAndLadders(player) {
    const currentTile = player.position;

    // 1. Cek Tangga
    if (window.boardEngine.ladders[currentTile]) {
      const topTile = window.boardEngine.ladders[currentTile];
      window.playerManager.recordLadder(player.id);
      window.soundEngine.playLadderClimb();
      window.mascotSystem.onLadderClimb();
      
      // Animasi naik tangga
      await this.wait(600);
      player.position = topTile;
      this.updateAllPawns();
      this.renderPlayerHUD();
      await this.wait(600);
      return;
    }

    // 2. Cek Ular
    if (window.boardEngine.snakes[currentTile]) {
      const tailTile = window.boardEngine.snakes[currentTile];
      window.playerManager.recordSnake(player.id);
      window.soundEngine.playSnakeSlide();
      window.mascotSystem.onSnakeSlide();

      // Animasi meluncur turun ular
      await this.wait(600);
      player.position = tailTile;
      this.updateAllPawns();
      this.renderPlayerHUD();
      await this.wait(600);
      return;
    }
  }

  // Menampilkan Modal Soal Matematika
  promptMathQuestion(player, tileNumber) {
    return new Promise((resolve) => {
      const qObj = window.mathEngine.generateQuestion(this.gradeLevel, tileNumber);
      this.currentQuestion = qObj;

      window.soundEngine.playPopup();
      window.mascotSystem.onQuestionStart();

      const modal = document.getElementById('modal-question');
      const questionTitle = document.getElementById('question-modal-title');
      const questionGrade = document.getElementById('question-grade-badge');
      const questionText = document.getElementById('question-text-content');
      const visualHint = document.getElementById('question-visual-hint');
      const optionsContainer = document.getElementById('question-options-grid');
      const timerBar = document.getElementById('question-timer-bar-fill');
      const timerText = document.getElementById('question-timer-countdown');

      if (questionTitle) {
        questionTitle.innerHTML = `✨ Tantangan Kotak ${tileNumber}! (${player.avatar} ${player.name})`;
      }
      if (questionGrade) {
        questionGrade.innerText = qObj.grade;
      }
      if (questionText) {
        questionText.innerText = qObj.questionText;
      }
      if (visualHint) {
        visualHint.innerHTML = qObj.visualHtml || '';
      }

      // Render 4 Opsi Jawaban
      if (optionsContainer) {
        optionsContainer.innerHTML = '';
        const optionColors = ['btn-opt-coral', 'btn-opt-sky', 'btn-opt-emerald', 'btn-opt-amber'];

        qObj.options.forEach((opt, idx) => {
          const btn = document.createElement('button');
          btn.className = `btn-option-choice ${optionColors[idx % 4]}`;
          btn.dataset.value = opt;
          btn.innerHTML = `<span class="opt-letter">${String.fromCharCode(65 + idx)}</span> <span class="opt-value">${opt}</span>`;

          btn.addEventListener('click', () => {
            if (player.isAI) return; // Ignore click jika AI
            this.handleAnswerSelected(opt, qObj, player, resolve);
          });

          optionsContainer.appendChild(btn);
        });
      }

      // Tampilkan Modal
      modal.classList.remove('hidden');

      // Mulai Timer 20 Detik
      this.questionTimeLeft = 20;
      if (timerText) timerText.innerText = '20s';
      if (timerBar) timerBar.style.width = '100%';

      if (this.questionTimer) clearInterval(this.questionTimer);

      this.questionTimer = setInterval(() => {
        this.questionTimeLeft--;
        if (timerText) timerText.innerText = `${this.questionTimeLeft}s`;
        if (timerBar) timerBar.style.width = `${(this.questionTimeLeft / 20) * 100}%`;

        if (this.questionTimeLeft <= 5 && this.questionTimeLeft > 0) {
          window.soundEngine.playTimerTick();
        }

        if (this.questionTimeLeft <= 0) {
          clearInterval(this.questionTimer);
          // Waktu Habis -> Dianggap salah
          this.handleAnswerSelected(null, qObj, player, resolve, true);
        }
      }, 1000);

      // Jika Pemain adalah AI Bot, simulasikan jawaban otomatis
      if (player.isAI) {
        const aiDelay = 2200 + Math.random() * 1800; // 2.2 - 4 detik
        setTimeout(() => {
          if (this.questionTimeLeft > 0) {
            const aiChosenAnswer = window.playerManager.getAIBotAnswer(qObj);
            this.handleAnswerSelected(aiChosenAnswer, qObj, player, resolve);
          }
        }, aiDelay);
      }
    });
  }

  // Handle Evaluasi Jawaban
  handleAnswerSelected(chosenValue, qObj, player, resolve, isTimeout = false) {
    if (this.questionTimer) {
      clearInterval(this.questionTimer);
      this.questionTimer = null;
    }

    const modal = document.getElementById('modal-question');
    const isCorrect = chosenValue === qObj.correctAnswer;
    window.playerManager.recordQuestionAnswer(player.id, isCorrect);

    // Highlight tombol opsi jawaban
    const buttons = document.querySelectorAll('.btn-option-choice');
    buttons.forEach(btn => {
      const val = parseInt(btn.dataset.value);
      if (val === qObj.correctAnswer) {
        btn.classList.add('opt-correct-highlight');
      } else if (val === chosenValue && !isCorrect) {
        btn.classList.add('opt-wrong-highlight');
      }
      btn.disabled = true;
    });

    if (isCorrect) {
      window.soundEngine.playCorrect();
      window.confettiEngine.burst();
      window.mascotSystem.onCorrectAnswer();
    } else {
      window.soundEngine.playWrong();
      window.mascotSystem.onWrongAnswer();
    }

    // Tampilkan Feedback Banner di Modal
    const feedbackBanner = document.getElementById('question-feedback-banner');
    if (feedbackBanner) {
      feedbackBanner.className = `question-feedback-banner ${isCorrect ? 'banner-correct' : 'banner-wrong'}`;
      feedbackBanner.innerHTML = isCorrect
        ? `🎉 <strong>BENAR!</strong> ${qObj.explanation}`
        : `🌱 <strong>${isTimeout ? 'WAKTU HABIS!' : 'HAMPIR BENAR!'}</strong> Jawaban tepat adalah <strong>${qObj.correctAnswer}</strong>. ${qObj.explanation}`;
      feedbackBanner.classList.remove('hidden');
    }

    // Tutup modal setelah jeda edukatif (2.2 detik)
    setTimeout(() => {
      if (feedbackBanner) feedbackBanner.classList.add('hidden');
      if (modal) modal.classList.add('hidden');
      resolve({ correct: isCorrect });
    }, 2400);
  }

  // Eksekusi Giliran Bot AI
  async runAITurn() {
    if (this.isGameOver) return;
    const current = window.playerManager.getCurrentPlayer();
    if (!current.isAI) return;

    window.mascotSystem.say(`Sekarang giliran ${current.name} melempar dadu! 🤖`, 2500);
    await this.wait(1000);
    await this.rollDice();
  }

  // Handler Saat Mencapai Kotak 100 (Kemenangan)
  handleGameVictory(winner) {
    this.isGameOver = true;
    window.soundEngine.playVictory();
    window.confettiEngine.startVictoryShower(7000);
    window.mascotSystem.onVictory(winner.name);

    const modalVictory = document.getElementById('modal-victory');
    const winnerNameEl = document.getElementById('victory-winner-name');
    const winnerAvatarEl = document.getElementById('victory-winner-avatar');
    const leaderboardEl = document.getElementById('victory-leaderboard-list');
    const mathStarAwardEl = document.getElementById('victory-math-star-award');

    if (winnerNameEl) winnerNameEl.innerText = winner.name;
    if (winnerAvatarEl) {
      winnerAvatarEl.innerHTML = winner.avatar;
      winnerAvatarEl.style.background = winner.bgGradient;
    }

    // Cari Juara Akurasi Matematika Tertinggi
    let mathChampion = window.playerManager.players[0];
    let maxCorrect = -1;
    window.playerManager.players.forEach(p => {
      if (p.stats.questionsCorrect > maxCorrect) {
        maxCorrect = p.stats.questionsCorrect;
        mathChampion = p;
      }
    });

    if (mathStarAwardEl) {
      const accuracy = mathChampion.stats.questionsTotal > 0 
        ? Math.round((mathChampion.stats.questionsCorrect / mathChampion.stats.questionsTotal) * 100) 
        : 100;
      mathStarAwardEl.innerHTML = `
        <div class="math-star-box">
          <div class="math-star-badge">🌟 BINTANG MATEMATIKA CILIK 🌟</div>
          <div class="math-star-winner">${mathChampion.avatar} <strong>${mathChampion.name}</strong></div>
          <div class="math-star-sub">Menjawab <strong>${mathChampion.stats.questionsCorrect} soal benar</strong> dari ${mathChampion.stats.questionsTotal} tantangan (Akurasi: ${accuracy}%)</div>
        </div>
      `;
    }

    // Susun Peringkat Pemain
    if (leaderboardEl) {
      // Urutkan berdasarkan posisi tertinggi, lalu jumlah soal benar
      const sorted = [...window.playerManager.players].sort((a, b) => {
        if (b.position !== a.position) return b.position - a.position;
        return b.stats.questionsCorrect - a.stats.questionsCorrect;
      });

      let listHtml = '';
      sorted.forEach((p, idx) => {
        const medal = idx === 0 ? '🥇 Juara 1' : idx === 1 ? '🥈 Juara 2' : idx === 2 ? '🥉 Juara 3' : `Peringkat ${idx + 1}`;
        listHtml += `
          <div class="leaderboard-row">
            <div class="lb-rank">${medal}</div>
            <div class="lb-player"><span class="lb-avatar">${p.avatar}</span> <strong>${p.name}</strong></div>
            <div class="lb-pos">Kotak ${p.position}</div>
            <div class="lb-score">⭐ ${p.stats.questionsCorrect} Benar</div>
          </div>
        `;
      });
      leaderboardEl.innerHTML = listHtml;
    }

    if (modalVictory) {
      setTimeout(() => {
        modalVictory.classList.remove('hidden');
      }, 800);
    }
  }

  // Utility Delay Async
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

window.gameController = new GameController();

// Inisialisasi saat window dimuat
window.addEventListener('DOMContentLoaded', () => {
  window.gameController.init();
});
