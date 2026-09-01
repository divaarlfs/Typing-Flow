/**
 * math_engine.js - Adaptive Question Generator for SD Kelas 1-6
 * Menghasilkan soal matematika berjenjang (monoton naik sesuai posisi kotak papan 1-100).
 */

class MathEngine {
  constructor() {
    this.visualIcons = ['🍎', '⭐', '🎈', '🍬', '🍓', '🧁', '🍪'];
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Shuffle array util
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Generate 3 clever distractors for a correct numeric answer
  generateDistractors(correct, min = 0, max = 999) {
    const distractors = new Set();
    
    // Distractor tipe 1: off-by-one (+1 atau -1)
    if (correct + 1 <= max) distractors.add(correct + 1);
    if (correct - 1 >= min && correct - 1 !== correct) distractors.add(correct - 1);

    // Distractor tipe 2: off-by-two (+2 atau -2) atau off-by-ten (+10 atau -10)
    if (correct + 2 <= max) distractors.add(correct + 2);
    if (correct - 2 >= min && correct - 2 !== correct) distractors.add(correct - 2);
    if (correct >= 10 && correct + 10 <= max) distractors.add(correct + 10);
    if (correct >= 10 && correct - 10 >= min) distractors.add(correct - 10);

    // Isi acak jika belum cukup 3
    let attempts = 0;
    while (distractors.size < 3 && attempts < 30) {
      attempts++;
      const offset = this.getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
      const val = correct + offset;
      if (val >= min && val <= max && val !== correct) {
        distractors.add(val);
      }
    }

    // fallback jika masih kurang
    let fallback = 1;
    while (distractors.size < 3) {
      if (correct + fallback <= max) distractors.add(correct + fallback);
      else distractors.add(Math.max(0, correct - fallback));
      fallback++;
    }

    const distList = Array.from(distractors).slice(0, 3);
    const allOptions = this.shuffle([correct, ...distList]);
    return allOptions;
  }

  /**
   * Main Generator
   * @param {string} gradeLevel - 'grade_1_2' | 'grade_3_4' | 'grade_5_6'
   * @param {number} tile - 1 to 100
   */
  generateQuestion(gradeLevel, tile = 1) {
    // Normalisasi posisi kotak (1-30: awal, 31-70: tengah, 71-100: puncak)
    const difficultyTier = tile <= 30 ? 1 : tile <= 70 ? 2 : 3;

    switch (gradeLevel) {
      case 'grade_1_2':
        return this.generateGrade12(difficultyTier, tile);
      case 'grade_3_4':
        return this.generateGrade34(difficultyTier, tile);
      case 'grade_5_6':
      default:
        return this.generateGrade56(difficultyTier, tile);
    }
  }

  // --- KELAS 1 - 2 (Mudah: Tambah & Kurang 1 - 20) ---
  generateGrade12(tier, tile) {
    const isAddition = Math.random() > 0.4;
    let a, b, answer, questionText, visualHtml = '', explanation;
    const icon = this.getRandomItem(this.visualIcons);

    if (tier === 1) {
      // Kotak 1-30: Angka 1-10 (Sangat ramah + visual counter)
      if (isAddition) {
        a = this.getRandomInt(1, 5);
        b = this.getRandomInt(1, 5);
        answer = a + b;
        questionText = `Berapakah hasil dari ${a} + ${b}?`;
        visualHtml = `<div class="visual-math-hint"><span class="icon-group">${icon.repeat(a)}</span> <span class="op">+</span> <span class="icon-group">${icon.repeat(b)}</span></div>`;
        explanation = `${a} ditambah ${b} hasilnya adalah ${answer}.`;
      } else {
        answer = this.getRandomInt(1, 5);
        b = this.getRandomInt(1, 4);
        a = answer + b;
        questionText = `Berapakah hasil dari ${a} - ${b}?`;
        visualHtml = `<div class="visual-math-hint"><span class="icon-group">${icon.repeat(a)}</span> <span class="op">-</span> <span class="icon-group">${icon.repeat(b)}</span></div>`;
        explanation = `${a} dikurang ${b} sisa ${answer}.`;
      }
    } else if (tier === 2) {
      // Kotak 31-70: Angka 5-15
      if (isAddition) {
        a = this.getRandomInt(3, 8);
        b = this.getRandomInt(3, 7);
        answer = a + b;
        questionText = `Berapakah hasil dari ${a} + ${b}?`;
        explanation = `${a} + ${b} = ${answer}`;
      } else {
        a = this.getRandomInt(8, 15);
        b = this.getRandomInt(2, 7);
        answer = a - b;
        questionText = `Berapakah hasil dari ${a} - ${b}?`;
        explanation = `${a} - ${b} = ${answer}`;
      }
    } else {
      // Kotak 71-100: Angka 10-20
      if (isAddition) {
        a = this.getRandomInt(6, 12);
        b = this.getRandomInt(5, 9);
        answer = a + b;
        questionText = `Berapakah hasil dari ${a} + ${b}?`;
        explanation = `${a} + ${b} = ${answer}`;
      } else {
        a = this.getRandomInt(12, 20);
        b = this.getRandomInt(5, 11);
        answer = a - b;
        questionText = `Berapakah hasil dari ${a} - ${b}?`;
        explanation = `${a} - ${b} = ${answer}`;
      }
    }

    const options = this.generateDistractors(answer, 1, 25);
    return {
      grade: 'Kelas 1 - 2 SD',
      tile: tile,
      questionText,
      visualHtml,
      correctAnswer: answer,
      options,
      explanation
    };
  }

  // --- KELAS 3 - 4 (Sedang: Penjumlahan/Pengurangan s.d 100, Perkalian & Pembagian Dasar) ---
  generateGrade34(tier, tile) {
    const opType = this.getRandomInt(1, tier === 1 ? 3 : 4);
    let a, b, answer, questionText, explanation;

    if (opType === 1) {
      // Penjumlahan Puluhan
      if (tier === 1) {
        a = this.getRandomInt(12, 45);
        b = this.getRandomInt(10, 35);
      } else if (tier === 2) {
        a = this.getRandomInt(25, 55);
        b = this.getRandomInt(25, 45);
      } else {
        a = this.getRandomInt(45, 68);
        b = this.getRandomInt(35, 75);
      }
      answer = a + b;
      questionText = `Hitunglah: ${a} + ${b} = ...`;
      explanation = `${a} + ${b} = ${answer}`;
    } else if (opType === 2) {
      // Pengurangan Puluhan
      if (tier === 1) {
        a = this.getRandomInt(30, 60);
        b = this.getRandomInt(10, 25);
      } else if (tier === 2) {
        a = this.getRandomInt(50, 90);
        b = this.getRandomInt(22, 48);
      } else {
        a = this.getRandomInt(70, 120);
        b = this.getRandomInt(35, 69);
      }
      answer = a - b;
      questionText = `Hitunglah: ${a} - ${b} = ...`;
      explanation = `${a} - ${b} = ${answer}`;
    } else if (opType === 3) {
      // Perkalian Dasar (Tabel 1-10)
      if (tier === 1) {
        a = this.getRandomInt(2, 5);
        b = this.getRandomInt(2, 6);
      } else if (tier === 2) {
        a = this.getRandomInt(4, 9);
        b = this.getRandomInt(4, 8);
      } else {
        a = this.getRandomInt(6, 9);
        b = this.getRandomInt(6, 9);
      }
      answer = a * b;
      questionText = `Berapakah hasil dari ${a} × ${b}?`;
      explanation = `${a} × ${b} = ${answer}`;
    } else {
      // Pembagian Pas
      let divisor, quotient;
      if (tier === 2) {
        divisor = this.getRandomInt(2, 6);
        quotient = this.getRandomInt(3, 8);
      } else {
        divisor = this.getRandomInt(4, 9);
        quotient = this.getRandomInt(4, 10);
      }
      a = divisor * quotient;
      b = divisor;
      answer = quotient;
      questionText = `Berapakah hasil dari ${a} ÷ ${b}?`;
      explanation = `${a} dibagi ${b} adalah ${answer} (karena ${answer} × ${b} = ${a})`;
    }

    const options = this.generateDistractors(answer, 1, 200);
    return {
      grade: 'Kelas 3 - 4 SD',
      tile: tile,
      questionText,
      visualHtml: '',
      correctAnswer: answer,
      options,
      explanation
    };
  }

  // --- KELAS 5 - 6 (Tantangan: Operasi Campuran, Perkalian/Pembagian Dua Digit, Kuadrat/Pola) ---
  generateGrade56(tier, tile) {
    const opType = this.getRandomInt(1, tier === 1 ? 3 : 5);
    let answer, questionText, explanation;

    if (opType === 1) {
      // Operasi Campuran (a × b) + c atau (a × b) - c
      const a = this.getRandomInt(4, 9);
      const b = this.getRandomInt(3, 8);
      const c = this.getRandomInt(5, 25);
      const isPlus = Math.random() > 0.4;
      
      if (isPlus) {
        answer = (a * b) + c;
        questionText = `Hitunglah: (${a} × ${b}) + ${c} = ...`;
        explanation = `(${a} × ${b}) = ${a * b}, lalu ditambah ${c} = ${answer}`;
      } else {
        answer = (a * b) - c;
        if (answer < 0) answer = (a * b) + c;
        questionText = `Hitunglah: (${a} × ${b}) - ${c} = ...`;
        explanation = `(${a} × ${b}) = ${a * b}, lalu dikurang ${c} = ${answer}`;
      }
    } else if (opType === 2) {
      // Perkalian Dua Digit
      const a = this.getRandomInt(11, 25);
      const b = this.getRandomInt(3, 9);
      answer = a * b;
      questionText = `Berapakah hasil dari ${a} × ${b}?`;
      explanation = `${a} × ${b} = ${answer}`;
    } else if (opType === 3) {
      // Pembagian Ratusan
      const divisor = this.getRandomInt(4, 12);
      const quotient = this.getRandomInt(11, 25);
      const dividend = divisor * quotient;
      answer = quotient;
      questionText = `Berapakah hasil dari ${dividend} ÷ ${divisor}?`;
      explanation = `${dividend} ÷ ${divisor} = ${answer}`;
    } else if (opType === 4) {
      // Bilangan Kuadrat / Pangkat Dua
      const a = this.getRandomInt(4, 12);
      answer = a * a;
      questionText = `Berapakah nilai dari ${a}² (${a} pangkat 2)?`;
      explanation = `${a}² = ${a} × ${a} = ${answer}`;
    } else {
      // Soal Logika / Persentase Sederhana
      const percentOpts = [
        { p: '50%', factor: 0.5, text: 'setengah (50%)' },
        { p: '25%', factor: 0.25, text: 'seperempat (25%)' },
        { p: '10%', factor: 0.1, text: '10%' }
      ];
      const selected = this.getRandomItem(percentOpts);
      const base = this.getRandomInt(2, 10) * (selected.p === '25%' ? 40 : 20);
      answer = Math.round(base * selected.factor);
      questionText = `Berapakah ${selected.p} dari ${base}?`;
      explanation = `${selected.p} dari ${base} adalah ${answer}`;
    }

    const options = this.generateDistractors(answer, 1, 400);
    return {
      grade: 'Kelas 5 - 6 SD',
      tile: tile,
      questionText,
      visualHtml: '',
      correctAnswer: answer,
      options,
      explanation
    };
  }
}

window.mathEngine = new MathEngine();
