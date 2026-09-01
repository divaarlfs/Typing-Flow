/**
 * TypingFlow - Self-Contained Standalone Bundle
 * Allows direct offline execution via file:// protocol or any local/remote web server.
 */

// ==========================================
// 1. Dictionaries (Indonesian & English)
// ==========================================
const IndonesianDictionary = {
    level1: [
        "dan", "ini", "itu", "yang", "dari", "ke", "di", "ada", "pada", "untuk",
        "kita", "saya", "kamu", "dia", "mereka", "kami", "akan", "bisa", "buku", "meja",
        "kursi", "pintu", "jalan", "makan", "minum", "tidur", "pagi", "siang", "malam", "hari",
        "mata", "kaki", "tangan", "kepala", "rambut", "baju", "celana", "sepatu", "tas", "uang",
        "rumah", "kamar", "dapur", "taman", "halaman", "pohon", "bunga", "daun", "buah", "akar",
        "air", "api", "tanah", "angin", "langit", "bulan", "bintang", "matahari", "awan", "hujan",
        "laut", "sungai", "danau", "gunung", "bukit", "pantai", "ombak", "pasir", "batu", "kayu",
        "kucing", "anjing", "burung", "ikan", "ayam", "bebek", "sapi", "kuda", "gajah", "singa",
        "merah", "biru", "kuning", "hijau", "putih", "hitam", "cokelat", "abu", "emas", "perak",
        "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh",
        "besar", "kecil", "tinggi", "rendah", "panjang", "pendek", "berat", "ringan", "tebal", "tipis",
        "cepat", "lambat", "panas", "dingin", "hangat", "sejuk", "terang", "gelap", "bersih", "kotor",
        "senang", "sedih", "marah", "takut", "kaget", "bingung", "suka", "benci", "rindu", "cinta",
        "baik", "buruk", "benar", "salah", "mudah", "sukar", "sulit", "murah", "mahal", "kaya",
        "miskin", "baru", "lama", "tua", "muda", "segar", "layu", "manis", "pahit", "asam",
        "asin", "gurih", "pedas", "tawar", "wangi", "harum", "bau", "keras", "lunak", "empuk",
        "baca", "tulis", "hitung", "gambar", "nyanyi", "tari", "main", "lari", "lompat", "duduk",
        "berdiri", "jalan", "diam", "bicara", "dengar", "lihat", "pegang", "bawa", "tarik", "dorong",
        "buka", "tutup", "masuk", "keluar", "naik", "turun", "datang", "pergi", "pulang", "singgah",
        "cari", "temu", "simpan", "ambil", "beri", "minta", "tolong", "terima", "kasih", "maaf",
        "halo", "kabar", "teman", "kawan", "sahabat", "keluarga", "ayah", "ibu", "kakak", "adik",
        "paman", "bibi", "kakek", "nenek", "anak", "bayi", "orang", "warga", "tetangga", "tamu",
        "kota", "desa", "negeri", "bangsa", "pasar", "toko", "sekolah", "kantor", "kelas", "ruang",
        "waktu", "saat", "detik", "menit", "jam", "minggu", "bulan", "tahun", "zaman", "masa",
        "senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu", "kemarin", "besok", "lusa"
    ],
    level2: [
        "membaca", "menulis", "berhitung", "menggambar", "menyanyikan", "menarikan", "memainkan",
        "berlari", "melompat", "menduduki", "berdiri", "berjalan", "berbicara", "mendengarkan",
        "melihat", "memegang", "membawakan", "menarik", "mendorong", "membuka", "menutup",
        "memasuki", "mengeluarkan", "menaiki", "menurunkan", "kedatangan", "kepergian", "kepulangan",
        "mencari", "menemukan", "menyimpan", "mengambil", "memberikan", "meminta", "pertolongan",
        "menerima", "berterima", "memaafkan", "pertemanan", "persahabatan", "kekeluargaan",
        "perkembangan", "pertumbuhan", "kemajuan", "pendidikan", "kebudayaan", "pembelajaran",
        "pengalaman", "pengetahuan", "keterampilan", "kemampuan", "keberhasilan", "kegagalan",
        "perjalanan", "petualangan", "keindahan", "kebersihan", "kesehatan", "kekuatan",
        "kelemahan", "keberanian", "ketakutan", "kebahagiaan", "kesedihan", "kemarahan",
        "kecepatan", "kelambatan", "keringanan", "kehangatan", "kesejukan", "kegelapan",
        "makanan", "minuman", "pakaian", "kendaraan", "perumahan", "pekarangan", "perkebunan",
        "pemandangan", "cakrawala", "lingkungan", "masyarakat", "pemerintah", "peraturan",
        "kebijakan", "keputusan", "pendapat", "pemikiran", "perasaan", "perhatian",
        "penghargaan", "penghormatan", "kebanggaan", "keberuntungan", "kesempatan", "kemungkinan",
        "kepastian", "perbedaan", "persamaan", "kebutuhan", "keinginan", "kenyamanan",
        "keamanan", "ketertiban", "kedamaian", "persatuan", "kesatuan", "kerjasama",
        "kreativitas", "produktivitas", "efektivitas", "efisiensi", "fleksibilitas", "kapasitas",
        "organisasi", "komunikasi", "informasi", "teknologi", "komputer", "internet",
        "jaringan", "perangkat", "aplikasi", "program", "algoritma", "database",
        "layar", "keyboard", "prosesor", "memori", "sistem", "digital",
        "elektronik", "otomatis", "modern", "tradisional", "nasional", "internasional",
        "berkualitas", "profesional", "berpengalaman", "bersemangat", "bertanggung", "berkelanjutan",
        "bervariasi", "bermanfaat", "berbahaya", "berharga", "berbakat", "berwawasan",
        "menjelajahi", "mengembangkan", "menciptakan", "merancang", "membangun", "memperbaiki",
        "menyelesaikan", "memecahkan", "mengoptimalkan", "menganalisis", "mengevaluasi", "merumuskan",
        "menghubungkan", "mengintegrasikan", "mempromosikan", "mempertahankan", "meningkatkan", "mengurangi"
    ],
    level3: [
        "Implementasi", "paradigma", "komprehensif", "signifikansi", "diversifikasi", "kontinuitas",
        "optimalisasi", "transformasi", "akselerasi", "efektivitasnya,", "fundamental.", "konseptual;",
        "metodologi", "kuantitatif", "kualitatif", "proporsional!", "konsekuensi:", "eksponensial",
        "fleksibilitas", "interoperabilitas", "infrastruktur", "modernisasi...", "multidimensi",
        "restrukturisasi", "standarisasi", "sinkronisasi", "visibilitas", "vulnerabilitas",
        "kapabilitas", "determinasi", "integritas,", "akuntabilitas.", "transparansi;", "skalabilitas",
        "Pada tahun 2026,", "sebesar 85.5%", "mencapai Rp1.500.000,", "indikator (KPI)", "versi 3.0.1",
        "faktor-faktor", "undang-undang", "prinsip-prinsip", "langkah-langkah", "secara simultan;",
        "\"Kualitas", "adalah", "prioritas\",", "kata", "direktur.", "Apakah", "sudah", "efisien?",
        "Tingkat akurasi: 99.8%;", "kecepatan rata-rata: 120 WPM!", "Algoritma 'KetikCepat'",
        "hipotesis", "empiris", "sintesis", "analisis-kritis", "dialektika", "epistemologi",
        "hegemoni", "hermeneutika", "konfigurasi", "nomenklatur", "otentikasi", "kriptografi",
        "desentralisasi", "artifisial", "otomatisasi", "prototipe", "benchmark:", "parameter 100%",
        "evaluasi; perbaikan,", "fleksibel & teruji", "standar ISO-9001", "revolusi 4.0 & 5.0",
        "konsistensi,", "ketepatan,", "kecepatan,", "fokus!", "ketekunan;", "disiplin", "mentalitas",
        "produktivitas 24/7", "efisiensi > 95%", "pembaharuan berkala (v2.4)", "perspektif holistik."
    ],
    quotes: [
        { text: "Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan Anda dapat mengubah dunia.", author: "Nelson Mandela" },
        { text: "Jangan pernah berhenti belajar, karena hidup tidak pernah berhenti mengajarkan.", author: "Anonim" },
        { text: "Bermimpilah setinggi langit, jika engkau jatuh, engkau akan jatuh di antara bintang-bintang.", author: "Ir. Soekarno" },
        { text: "Hanya mereka yang berani gagal besar yang dapat mencapai keberhasilan yang luar biasa.", author: "Robert F. Kennedy" },
        { text: "Latihan terus-menerus akan mengubah hal yang sulit menjadi kebiasaan yang mudah dan menyenangkan.", author: "Pepatah Bijak" },
        { text: "Kecepatan dan ketepatan tidak datang dari keberuntungan, melainkan dari konsistensi dan ketekunan.", author: "TypingFlow Master" },
        { text: "Jadikan setiap kesalahan sebagai batu loncatan menuju kemahiran yang lebih tinggi.", author: "Motivasi Harian" },
        { text: "Buku adalah jembatan ilmu yang menghubungkan impian manusia dengan kenyataan yang gemilang.", author: "Pena Literasi" }
    ]
};

const EnglishDictionary = {
    level1: [
        "the", "be", "of", "and", "a", "to", "in", "he", "have", "it",
        "that", "for", "they", "with", "as", "not", "on", "she", "at", "by",
        "this", "we", "you", "do", "but", "his", "from", "they", "say", "her",
        "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
        "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
        "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
        "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
        "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
        "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
        "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
        "water", "long", "find", "very", "world", "still", "life", "call", "hand", "high",
        "keep", "light", "head", "story", "left", "night", "live", "game", "line", "heart",
        "hold", "bring", "large", "must", "side", "walk", "play", "run", "room", "book",
        "open", "stop", "city", "tree", "face", "door", "hope", "mind", "road", "home",
        "read", "step", "fall", "talk", "real", "late", "easy", "hard", "cool", "warm",
        "fast", "slow", "deep", "dark", "blue", "gold", "kind", "free", "best", "next",
        "care", "feel", "move", "love", "wait", "pass", "help", "show", "hear", "word"
    ],
    level2: [
        "keyboard", "accuracy", "practice", "challenge", "developer", "experience", "beautiful",
        "wonderful", "knowledge", "discovery", "mountain", "adventure", "journey", "tomorrow",
        "yesterday", "important", "community", "education", "creativity", "technology", "algorithm",
        "software", "hardware", "interface", "workspace", "efficiency", "discipline", "performance",
        "consistent", "confidence", "enthusiastic", "perspective", "intelligence", "celebration",
        "accomplish", "management", "understand", "motivation", "reflection", "imagination",
        "atmosphere", "environment", "remarkable", "extraordinary", "fascinating", "professional",
        "sustainable", "communicate", "generation", "opportunity", "possibility", "successful",
        "foundation", "revolution", "innovation", "transition", "cooperation", "flexibility",
        "leadership", "friendship", "connection", "collection", "perfection", "protection",
        "navigation", "exploration", "destination", "observation", "appreciation", "interaction",
        "celebrate", "determine", "recognize", "transform", "strengthen", "encourage",
        "illuminate", "prioritize", "synthesize", "harmonize", "synchronize", "modernize"
    ],
    level3: [
        "Algorithm (v4.2)", "systematic,", "comprehensive;", "JavaScript & CSS3,", "efficiency: 99.4%",
        "\"Speed", "is", "great,", "but", "accuracy", "is", "king!\"", "Don't", "quit;",
        "parameter_x = 100", "Object.freeze()", "hypothetical...", "asynchronous", "polymorphism,",
        "micro-architecture", "interoperability;", "cryptographic-key", "quantum-ready (2026)",
        "Is this 100% accurate?", "Dr. John's benchmark:", "result = (a + b) * c;", "#1 Ranked",
        "exponentially!", "state-of-the-art", "resilience;", "fault-tolerant.", "hyper-threaded",
        "CPU @ 4.8GHz,", "RAM: 64GB DDR5;", "ultra-responsive!", "zero-latency.", "next-gen UI/UX",
        "\"Continuous", "improvement", "over", "delayed", "perfection.\"", "Level 3 - Pro!",
        "synchronization...", "scalability:", "high-throughput", "O(log n) complexity", "ISO/IEC-27001"
    ],
    quotes: [
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
        { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Consistency is what transforms average into excellence.", author: "Tony Robbins" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
        { text: "Speed will follow precision; focus on the keystroke before the clock.", author: "Typing Wisdom" }
    ]
};

// ==========================================
// 2. Sound Effects Engine (Web Audio API)
// ==========================================
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.currentSound = 'cherry-blue';
        this.volume = 0.5;
        this.isMuted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setSound(soundType) {
        this.currentSound = soundType;
        this.isMuted = (soundType === 'mute');
    }

    playKeyClick(isSpace = false, isBackspace = false, isError = false) {
        if (this.isMuted || this.currentSound === 'mute') return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        if (isError) {
            this._playErrorSound(now);
            return;
        }

        switch (this.currentSound) {
            case 'cherry-blue':
                this._playCherryBlue(now, isSpace, isBackspace);
                break;
            case 'cherry-brown':
                this._playCherryBrown(now, isSpace, isBackspace);
                break;
            case 'typewriter':
                this._playTypewriter(now, isSpace, isBackspace);
                break;
            case 'bubble-pop':
                this._playBubblePop(now, isSpace, isBackspace);
                break;
            default:
                this._playCherryBlue(now, isSpace, isBackspace);
                break;
        }
    }

    _playCherryBlue(t, isSpace, isBackspace) {
        const baseFreq = isSpace ? 800 : isBackspace ? 1400 : 1800 + (Math.random() * 300 - 150);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(baseFreq, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.02);
        gain.gain.setValueAtTime(this.volume * 0.45, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.04);

        const thockOsc = this.ctx.createOscillator();
        const thockGain = this.ctx.createGain();
        thockOsc.type = 'sine';
        thockOsc.frequency.setValueAtTime(isSpace ? 110 : 180, t);
        thockOsc.frequency.exponentialRampToValueAtTime(40, t + 0.04);
        thockGain.gain.setValueAtTime(this.volume * (isSpace ? 0.6 : 0.3), t);
        thockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        thockOsc.connect(thockGain);
        thockGain.connect(this.ctx.destination);
        thockOsc.start(t);
        thockOsc.stop(t + 0.06);
    }

    _playCherryBrown(t, isSpace, isBackspace) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const freq = isSpace ? 140 : isBackspace ? 200 : 260 + (Math.random() * 40 - 20);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.045);
        gain.gain.setValueAtTime(this.volume * (isSpace ? 0.6 : 0.4), t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.06);
    }

    _playTypewriter(t, isSpace, isBackspace) {
        const noiseBuffer = this._createNoiseBuffer(0.03);
        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(isSpace ? 1500 : 3200, t);
        filter.Q.value = 3;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(this.volume * 0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(t);
        noise.stop(t + 0.04);
    }

    _playBubblePop(t, isSpace, isBackspace) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const freq = isSpace ? 350 : isBackspace ? 450 : 550 + (Math.random() * 80 - 40);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.8, t + 0.015);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, t + 0.045);
        gain.gain.setValueAtTime(this.volume * 0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.055);
    }

    _playErrorSound(t) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, t);
        osc.frequency.linearRampToValueAtTime(90, t + 0.08);
        gain.gain.setValueAtTime(this.volume * 0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
    }

    playFinishFanfare() {
        if (this.isMuted || this.currentSound === 'mute') return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const t = now + idx * 0.08;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(this.volume * 0.35, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.4);
        });
    }

    _createNoiseBuffer(duration) {
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }
}
const sound = new SoundEngine();

// ==========================================
// 3. High-Precision Timer
// ==========================================
class PreciseTimer {
    constructor() {
        this.duration = 60;
        this.mode = 'time';
        this.isRunning = false;
        this.isPaused = false;
        this.startTime = null;
        this.elapsedSeconds = 0;
        this.remainingSeconds = 60;
        this.intervalId = null;
        this.lastSecondMark = 0;

        this.onTick = null;
        this.onSecondPassed = null;
        this.onFinish = null;
    }

    setMode(mode, duration = 60) {
        this.mode = mode;
        this.duration = duration;
        this.reset();
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.isPaused = false;
        this.startTime = performance.now();
        this.lastSecondMark = 0;
        this.intervalId = requestAnimationFrame(this._loop.bind(this));
    }

    _loop() {
        if (!this.isRunning || this.isPaused) return;

        const now = performance.now();
        const deltaMs = now - this.startTime;
        this.elapsedSeconds = deltaMs / 1000;

        if (this.mode === 'time') {
            this.remainingSeconds = Math.max(0, this.duration - this.elapsedSeconds);
            if (this.onTick) this.onTick(this.remainingSeconds, this.elapsedSeconds);

            const currentWholeSec = Math.floor(this.elapsedSeconds);
            if (currentWholeSec > this.lastSecondMark) {
                this.lastSecondMark = currentWholeSec;
                if (this.onSecondPassed) this.onSecondPassed(currentWholeSec);
            }

            if (this.remainingSeconds <= 0) {
                this.stop();
                if (this.onFinish) this.onFinish();
                return;
            }
        } else {
            if (this.onTick) this.onTick(this.elapsedSeconds, this.elapsedSeconds);

            const currentWholeSec = Math.floor(this.elapsedSeconds);
            if (currentWholeSec > this.lastSecondMark) {
                this.lastSecondMark = currentWholeSec;
                if (this.onSecondPassed) this.onSecondPassed(currentWholeSec);
            }
        }

        this.intervalId = requestAnimationFrame(this._loop.bind(this));
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
        if (this.intervalId) {
            cancelAnimationFrame(this.intervalId);
            this.intervalId = null;
        }
    }

    reset() {
        this.stop();
        this.elapsedSeconds = 0;
        this.remainingSeconds = this.duration;
        this.lastSecondMark = 0;
    }

    getElapsed() {
        return Math.max(0.1, this.elapsedSeconds);
    }
}

// ==========================================
// 4. Typing Engine
// ==========================================
class TypingEngine {
    constructor() {
        this.language = 'id';
        this.mode = 'time';
        this.level = 'level1';
        this.timeLimit = 30;
        this.wordLimit = 25;
        this.quoteAuthor = '';
        this.isSuddenDeath = false;
        this.isBlindMode = false;

        this.words = [];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.typedHistory = [];
        this.hasStarted = false;
        this.isFinished = false;

        this.correctChars = 0;
        this.incorrectChars = 0;
        this.extraChars = 0;
        this.missedChars = 0;
        this.totalKeystrokes = 0;
        this.errorKeys = {};
        this.wpmHistory = [];

        this.timer = new PreciseTimer();
        this.timer.onTick = this._handleTimerTick.bind(this);
        this.timer.onSecondPassed = this._handleSecondPassed.bind(this);
        this.timer.onFinish = this._handleTestComplete.bind(this);

        this.onStateChange = null;
        this.onTestStart = null;
        this.onTestEnd = null;
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

        if (this.onStateChange) this.onStateChange(this);
    }

    startTest() {
        if (this.hasStarted) return;
        this.hasStarted = true;
        this.timer.start();
        if (this.onTestStart) this.onTestStart();
    }

    handleKeyDown(e) {
        if (this.isFinished) return;

        // Skip non-typing modifier keys
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
            // Advance to next word on space
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
            // Jump back to previous word if it had errors
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

        // Check if finished in Words or Quotes mode
        if (this.currentWordIndex >= this.words.length) {
            this._handleTestComplete();
            return;
        }

        if (this.currentWordIndex < this.typedHistory.length) {
            this.typedHistory[this.currentWordIndex].isCurrent = true;
        }
    }

    _handleTimerTick(remaining, elapsed) {
        if (this.onStateChange) this.onStateChange(this);
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
        if (this.onTestEnd) this.onTestEnd(results);
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

// ==========================================
// 5. Canvas Performance Chart
// ==========================================
class PerformanceChart {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    }

    render(historyData) {
        if (!this.canvas || !this.ctx || !historyData || historyData.length === 0) return;

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

        const points = historyData.length === 1 
            ? [{ second: 0, wpm: 0, rawWpm: 0, errors: 0 }, ...historyData]
            : historyData;

        const maxSec = Math.max(1, points[points.length - 1].second);
        const maxWpm = Math.max(40, ...points.map(p => Math.max(p.wpm, p.rawWpm))) * 1.15;

        const getX = (sec) => padding.left + (sec / maxSec) * chartW;
        const getY = (wpm) => padding.top + chartH - (wpm / maxWpm) * chartH;

        this.ctx.clearRect(0, 0, width, height);

        // Horizontal Grid
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

        // X-axis Ticks
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        const xStepCount = Math.min(6, maxSec);
        for (let i = 0; i <= xStepCount; i++) {
            const sec = Math.round((maxSec / xStepCount) * i);
            const x = getX(sec);
            this.ctx.fillText(`${sec}s`, x, padding.top + chartH + 10);
        }

        // Raw WPM Line
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
        this.ctx.setLineDash([]);

        // Net WPM Gradient Area
        const gradient = this.ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
        gradient.addColorStop(0, 'rgba(255, 170, 94, 0.35)');
        gradient.addColorStop(1, 'rgba(255, 170, 94, 0.0)');

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

        // Net WPM Solid Line (Pastel Orange)
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#ffaa5e';
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

        // Errors
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

                this.ctx.fillStyle = '#ef4444';
                this.ctx.font = 'bold 9px monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(`✕`, x, y - 10);
            }
            lastErrors = p.errors;
        });

        // Legend
        const legendX = width - padding.right - 180;
        const legendY = 12;
        this.ctx.font = '10px "JetBrains Mono", monospace';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';

        this.ctx.fillStyle = '#ffaa5e';
        this.ctx.fillRect(legendX, legendY, 12, 3);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.fillText('WPM', legendX + 16, legendY + 2);

        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        this.ctx.setLineDash([2, 2]);
        this.ctx.beginPath();
        this.ctx.moveTo(legendX + 60, legendY + 2);
        this.ctx.lineTo(legendX + 72, legendY + 2);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        this.ctx.fillText('Raw', legendX + 76, legendY + 2);

        this.ctx.beginPath();
        this.ctx.arc(legendX + 120, legendY + 2, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ef4444';
        this.ctx.fill();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.fillText('Errors', legendX + 128, legendY + 2);
    }
}

// ==========================================
// 6. Themes & Settings Manager
// ==========================================
const THEMES = [
    { id: 'midnight', name: 'Midnight Slate (Default)', icon: '🌙', bg: '#181a1f', accent: '#ffaa5e' },
    { id: 'warm-paper', name: 'Warm Paper (Serene)', icon: '📜', bg: '#f5f0e6', accent: '#e67e22' },
    { id: 'nordic', name: 'Nordic Frost', icon: '❄️', bg: '#242933', accent: '#ffaa5e' },
    { id: 'matrix', name: 'Emerald Cyber', icon: '💻', bg: '#0d1610', accent: '#10b981' },
    { id: 'coffee', name: 'Coffee & Caramel', icon: '☕', bg: '#201815', accent: '#ffaa5e' },
    { id: 'sunset', name: 'Sunset Ember', icon: '🌅', bg: '#1c1524', accent: '#fb7185' }
];

class ThemeManager {
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
const themeManager = new ThemeManager();

// ==========================================
// 7. Local Storage Stats
// ==========================================
class StatsStorage {
    constructor() {
        this.STORAGE_KEY = 'typingflow_history';
        this.PB_KEY = 'typingflow_personal_bests';
    }

    getHistory() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
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

            history.unshift(record);
            if (history.length > 100) history.pop();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));

            this._updatePersonalBest(record);
            return record;
        } catch (e) {
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
                return true;
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
            return { totalTests: 0, avgWpm: 0, highestWpm: 0, avgAccuracy: 0, totalTimeSeconds: 0 };
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
const statsStorage = new StatsStorage();

// ==========================================
// 8. Main Application Controller
// ==========================================
class TypingApp {
    constructor() {
        this.engine = new TypingEngine();
        this.chart = null;

        this.dom = {
            appContainer: document.getElementById('app-container'),
            wordsContainer: document.getElementById('words-container'),
            wordsWrapper: document.getElementById('words-wrapper'),
            hiddenInput: document.getElementById('hidden-input'),
            caret: document.getElementById('caret'),
            
            langBtns: document.querySelectorAll('.lang-btn'),
            modeBtns: document.querySelectorAll('.mode-btn'),
            levelBtns: document.querySelectorAll('.level-btn'),
            subOptionGroup: document.getElementById('sub-option-group'),
            liveTimer: document.getElementById('live-timer'),
            liveWpm: document.getElementById('live-wpm'),
            liveAccuracy: document.getElementById('live-accuracy'),
            liveHeader: document.getElementById('live-header'),
            configToolbar: document.getElementById('config-toolbar'),

            typingScreen: document.getElementById('typing-screen'),
            resultsScreen: document.getElementById('results-screen'),

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

            toast: document.getElementById('toast'),
            virtualKeyboard: document.getElementById('virtual-keyboard')
        };

        this.init();
    }

    init() {
        this.engine.onStateChange = this.renderWords.bind(this);
        this.engine.onTestStart = this.handleTestStart.bind(this);
        this.engine.onTestEnd = this.handleTestEnd.bind(this);

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

            // Handle space navigation prevention
            if (e.key === ' ') {
                e.preventDefault();
            }

            this.engine.handleKeyDown(e);
            this.highlightVirtualKey(e.key);
        });

        // Hidden input keeps focus ready
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

        const logoRestart = document.getElementById('btn-brand-restart');
        if (logoRestart) {
            logoRestart.addEventListener('click', () => this.restartTest());
        }

        // Sub Option Group Event Delegation (15s, 30s, 60s, 120s / 10, 25, 50, 100)
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

document.addEventListener('DOMContentLoaded', () => {
    window.typingApp = new TypingApp();
});
