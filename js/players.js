/**
 * players.js - Player and AI Bot State Management
 * Mengelola data pemain, warna, avatar, statistik, dan kecerdasan buatan (Bot AI).
 */

class PlayerManager {
  constructor() {
    this.players = [];
    this.activePlayerIndex = 0;

    this.availableAvatars = [
      { id: 'fox', name: 'Rubah Riko', icon: '🦊', color: '#f97316', bgGradient: 'linear-gradient(135deg, #fb923c, #ea580c)' },
      { id: 'bunny', name: 'Kelinci Cici', icon: '🐰', color: '#ec4899', bgGradient: 'linear-gradient(135deg, #f472b6, #db2777)' },
      { id: 'bear', name: 'Beruang Boni', icon: '🐻', color: '#8b5cf6', bgGradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)' },
      { id: 'frog', name: 'Kodok Kero', icon: '🐸', color: '#10b981', bgGradient: 'linear-gradient(135deg, #34d399, #059669)' },
      { id: 'penguin', name: 'Penguin Piko', icon: '🐧', color: '#0ea5e9', bgGradient: 'linear-gradient(135deg, #38bdf8, #0284c7)' },
      { id: 'lion', name: 'Singa Leo', icon: '🦁', color: '#f59e0b', bgGradient: 'linear-gradient(135deg, #fbbf24, #d97706)' }
    ];
  }

  // Setup list pemain berdasarkan mode pilihan
  initPlayers(config) {
    // config: { mode: '1p_1ai' | '1p_2ai' | '1p_3ai' | '2p_local' | '3p_local' | '4p_local', p1Name, p1Avatar, otherNames }
    this.players = [];

    let totalPlayers = 2;
    let numBots = 0;

    switch (config.mode) {
      case '1p_1ai':
        totalPlayers = 2;
        numBots = 1;
        break;
      case '1p_2ai':
        totalPlayers = 3;
        numBots = 2;
        break;
      case '1p_3ai':
        totalPlayers = 4;
        numBots = 3;
        break;
      case '2p_local':
        totalPlayers = 2;
        numBots = 0;
        break;
      case '3p_local':
        totalPlayers = 3;
        numBots = 0;
        break;
      case '4p_local':
        totalPlayers = 4;
        numBots = 0;
        break;
      default:
        totalPlayers = 2;
        numBots = 1;
    }

    const usedAvatarIds = new Set();

    // Pemain 1 (Human)
    const p1AvatarObj = this.availableAvatars.find(a => a.id === config.p1Avatar) || this.availableAvatars[0];
    usedAvatarIds.add(p1AvatarObj.id);

    this.players.push({
      id: 1,
      name: config.p1Name || 'Pemain 1',
      isAI: false,
      position: 1,
      avatar: p1AvatarObj.icon,
      avatarId: p1AvatarObj.id,
      color: p1AvatarObj.color,
      bgGradient: p1AvatarObj.bgGradient,
      stats: {
        rolls: 0,
        questionsTotal: 0,
        questionsCorrect: 0,
        ladders: 0,
        snakes: 0
      }
    });

    // Sisa pemain (Human atau AI Bot)
    const remainingAvatars = this.availableAvatars.filter(a => !usedAvatarIds.has(a.id));

    for (let i = 2; i <= totalPlayers; i++) {
      const isBot = (i > (totalPlayers - numBots));
      const avatarObj = remainingAvatars[(i - 2) % remainingAvatars.length];
      
      let defaultName = isBot 
        ? (avatarObj.name + ' (Bot)') 
        : `Pemain ${i}`;

      if (config.customNames && config.customNames[i - 1]) {
        defaultName = config.customNames[i - 1];
      }

      this.players.push({
        id: i,
        name: defaultName,
        isAI: isBot,
        position: 1,
        avatar: avatarObj.icon,
        avatarId: avatarObj.id,
        color: avatarObj.color,
        bgGradient: avatarObj.bgGradient,
        stats: {
          rolls: 0,
          questionsTotal: 0,
          questionsCorrect: 0,
          ladders: 0,
          snakes: 0
        }
      });
    }

    this.activePlayerIndex = 0;
    return this.players;
  }

  getCurrentPlayer() {
    return this.players[this.activePlayerIndex];
  }

  nextTurn() {
    this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    return this.getCurrentPlayer();
  }

  // Update posisi pemain
  setPlayerPosition(playerId, newPos) {
    const player = this.players.find(p => p.id === playerId);
    if (player) {
      player.position = Math.min(100, Math.max(1, newPos));
    }
  }

  // Rekam statistik soal
  recordQuestionAnswer(playerId, isCorrect) {
    const player = this.players.find(p => p.id === playerId);
    if (player) {
      player.stats.questionsTotal++;
      if (isCorrect) player.stats.questionsCorrect++;
    }
  }

  // Rekam naik tangga / kena ular / lempar dadu
  recordLadder(playerId) {
    const player = this.players.find(p => p.id === playerId);
    if (player) player.stats.ladders++;
  }

  recordSnake(playerId) {
    const player = this.players.find(p => p.id === playerId);
    if (player) player.stats.snakes++;
  }

  recordRoll(playerId) {
    const player = this.players.find(p => p.id === playerId);
    if (player) player.stats.rolls++;
  }

  // Simulasi keputusan jawaban AI (dengan tingkat akurasi cerdas ~80%)
  getAIBotAnswer(questionObj) {
    // 80% kemungkinan memilih jawaban yang benar, 20% memilih distractor yang masuk akal
    const isClever = Math.random() < 0.82;
    if (isClever) {
      return questionObj.correctAnswer;
    } else {
      const wrongOpts = questionObj.options.filter(o => o !== questionObj.correctAnswer);
      return wrongOpts[Math.floor(Math.random() * wrongOpts.length)];
    }
  }
}

window.playerManager = new PlayerManager();
