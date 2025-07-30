class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameState = 'menu'; // menu, playing, gameOver
        this.selectedCharacter = 'rabbit';
        this.soundEnabled = true;
        
        // Game variables
        this.player = null;
        this.obstacles = [];
        this.particles = [];
        this.camera = { x: 0, y: 0 };
        this.gameSpeed = 2;
        this.lastObstacleX = 0;
        
        // Counters
        this.letterCount = 0;
        this.numberCount = 0;
        this.fruitCount = 0;
        this.collectedItems = [];
        
        // Background layers
        this.backgrounds = [];
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.initializeBackgrounds();
        this.gameLoop();
    }
    
    setupCanvas() {
        const resize = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        };
        
        resize();
        window.addEventListener('resize', resize);
    }
    
    setupEventListeners() {
        // Character selection
        document.querySelectorAll('.character-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.character-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedCharacter = btn.dataset.character;
            });
        });
        
        // Sound toggle
        document.getElementById('soundToggle').addEventListener('click', () => {
            this.soundEnabled = !this.soundEnabled;
            const btn = document.getElementById('soundToggle');
            btn.textContent = this.soundEnabled ? '🔊' : '🔇';
            btn.classList.toggle('muted');
        });
        
        // Play button
        document.getElementById('playBtn').addEventListener('click', () => {
            this.startGame();
        });
        
        // Play again button
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.resetGame();
            this.startGame();
        });
        
        // Jump controls
        const jump = () => {
            if (this.gameState === 'playing' && this.player) {
                this.player.jump();
                this.playSound('jump');
            }
        };
        
        // Keyboard control
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                jump();
            }
        });
        
        // Touch control
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            jump();
        });
        
        this.canvas.addEventListener('click', jump);
    }
    
    initializeBackgrounds() {
        this.backgrounds = [
            { layer: 'sky', speed: 0.2, color: '#87CEEB' },
            { layer: 'mountains', speed: 0.5, color: '#98FB98' },
            { layer: 'ground', speed: 1, color: '#8FBC8F' }
        ];
    }
    
    startGame() {
        this.gameState = 'playing';
        this.showScreen('gameScreen');
        this.resetGame();
        this.createPlayer();
        
        // Update jump instruction based on device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        document.getElementById('jumpText').textContent = isMobile ? 
            'Zıplamak için ekrana dokun!' : 'Zıplamak için boşluk tuşuna bas!';
    }
    
    resetGame() {
        this.camera = { x: 0, y: 0 };
        this.gameSpeed = 2;
        this.obstacles = [];
        this.particles = [];
        this.lastObstacleX = 0;
        this.letterCount = 0;
        this.numberCount = 0;
        this.fruitCount = 0;
        this.collectedItems = [];
        
        this.updateCounters();
    }
    
    endGame() {
        this.gameState = 'gameOver';
        this.showScreen('gameOverScreen');
        
        this.playSound('gameOver');
    }
    
    createPlayer() {
        const characterEmojis = {
            rabbit: '🐰',
            cat: '🐱',
            panda: '🐼'
        };
        
        this.player = new Player(
            100,
            this.canvas.height - 150,
            characterEmojis[this.selectedCharacter]
        );
    }
    
    spawnObstacle() {
        // Ensure minimum distance between obstacles
        const minDistance = 300;
        const currentX = this.canvas.width + 50;
        
        if (currentX - this.lastObstacleX >= minDistance && Math.random() < 0.02) {
            const obstacles = ['🪨'];
            const obstacle = new Obstacle(
                currentX,
                this.canvas.height - 120,
                obstacles[0]
            );
            this.obstacles.push(obstacle);
            this.lastObstacleX = currentX;
        }
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        // Update camera
        this.camera.x += this.gameSpeed;
        
        // Update player
        if (this.player) {
            this.player.update();
            
            // Check ground collision
            if (this.player.y > this.canvas.height - 150) {
                this.player.y = this.canvas.height - 150;
                this.player.grounded = true;
                this.player.velocityY = 0;
            }
        }
        
        // Spawn obstacles and collectibles
        this.spawnObstacle();
        
        // Update obstacles
        this.obstacles.forEach(obstacle => {
            obstacle.update(this.gameSpeed);
        });
        
        // Update particles
        this.particles.forEach(particle => {
            particle.update();
        });
        
        // Check collisions
        this.checkCollisions();
        
        // Remove off-screen objects
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x > -100);
        this.particles = this.particles.filter(particle => particle.life > 0);
        
        // Update lastObstacleX for off-screen obstacles
        if (this.obstacles.length === 0) {
            this.lastObstacleX = 0;
        }
    }
    
    checkCollisions() {
        if (!this.player) return;
        
        // Check obstacle collisions
        this.obstacles.forEach((obstacle, index) => {
            if (this.player.collidesWith(obstacle)) {
                this.endGame();
            }
        });
    }
    
    updateCounters() {
        // No counters to update since we removed collectibles
    }
    
    createParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.gameState !== 'playing') return;
        
        // Draw parallax backgrounds
        this.drawBackgrounds();
        
        // Draw ground
        this.ctx.fillStyle = '#8FBC8F';
        this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);
        
        // Draw grass
        this.drawGrass();
        
        // Draw game objects
        this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
        
        if (this.player) {
            this.player.draw(this.ctx);
        }
        
        // Draw particles
        this.particles.forEach(particle => particle.draw(this.ctx));
    }
    
    drawBackgrounds() {
        this.backgrounds.forEach((bg, index) => {
            const offset = (this.camera.x * bg.speed) % this.canvas.width;
            
            if (bg.layer === 'mountains') {
                this.drawMountains(-offset);
                this.drawMountains(-offset + this.canvas.width);
            }
        });
    }
    
    drawMountains(offsetX) {
        this.ctx.fillStyle = '#98FB98';
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const x = offsetX + (i * this.canvas.width / 4);
            const height = 100 + Math.sin(i) * 50;
            this.ctx.lineTo(x, this.canvas.height - 100 - height);
            this.ctx.lineTo(x + this.canvas.width / 8, this.canvas.height - 100);
        }
        this.ctx.lineTo(this.canvas.width, this.canvas.height - 100);
        this.ctx.lineTo(0, this.canvas.height - 100);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawGrass() {
        this.ctx.fillStyle = '#90EE90';
        const grassOffset = (this.camera.x * 0.8) % 20;
        
        for (let x = -grassOffset; x < this.canvas.width + 20; x += 20) {
            this.ctx.fillRect(x, this.canvas.height - 105, 2, 10);
            this.ctx.fillRect(x + 5, this.canvas.height - 108, 2, 8);
            this.ctx.fillRect(x + 10, this.canvas.height - 107, 2, 9);
            this.ctx.fillRect(x + 15, this.canvas.height - 106, 2, 8);
        }
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    playSound(type, text = '') {
        if (!this.soundEnabled) return;
        
        // Create audio context for sound effects
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            switch (type) {
                case 'jump':
                    this.createTone(audioContext, 440, 0.1, 'sine');
                    break;
                case 'hit':
                    this.createTone(audioContext, 220, 0.3, 'square');
                    break;
                case 'gameOver':
                    // this.speak('Oyun bitti! Engelleri başarıyla aştın!');
                    break;
            }
        } catch (e) {
            console.log('Audio context not supported');
        }
    }
    
    createTone(audioContext, frequency, duration, type = 'sine') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'tr-TR';
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            speechSynthesis.speak(utterance);
        }
    }
}

class Player {
    constructor(x, y, emoji) {
        this.x = x;
        this.y = y;
        this.emoji = emoji;
        this.width = 60;
        this.height = 60;
        this.velocityY = 0;
        this.velocityX = 0;
        this.jumpPower = -12;
        this.gravity = 0.4;
        this.grounded = true;
        this.animationFrame = 0;
        this.isHit = false;
        this.hitTimer = 0;
    }
    
    update() {
        // Animation
        this.animationFrame += 0.2;
        
        // Hit recovery
        if (this.isHit) {
            this.hitTimer--;
            if (this.hitTimer <= 0) {
                this.isHit = false;
            }
        }
        
        // Physics
        if (!this.grounded) {
            this.velocityY += this.gravity;
            this.y += this.velocityY;
            
            // Forward movement during jump
            this.x += this.velocityX;
            this.velocityX *= 0.98; // Slight air resistance
        }
        
        // Ground check
        if (this.y > window.innerHeight - 150) {
            this.y = window.innerHeight - 150;
            this.grounded = true;
            this.velocityY = 0;
            this.velocityX = 0;
        }
    }
    
    jump() {
        if (this.grounded) {
            this.velocityY = this.jumpPower;
            this.velocityX = 2; // Forward momentum during jump
            this.grounded = false;
        }
    }
    
    hit() {
        this.isHit = true;
        this.hitTimer = 60; // 1 second at 60fps
        this.velocityY = -8; // Small bounce
        this.grounded = false;
    }
    
    collidesWith(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }
    
    draw(ctx) {
        ctx.save();
        
        // Hit effect
        if (this.isHit) {
            ctx.globalAlpha = Math.sin(this.hitTimer * 0.5) * 0.5 + 0.5;
        }
        
        // Character bounce animation
        const bounceOffset = this.grounded ? Math.sin(this.animationFrame) * 2 : 0;
        
        ctx.font = `${this.width}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, this.x + this.width/2, this.y + this.height/2 + bounceOffset);
        
        ctx.restore();
    }
}

class Obstacle {
    constructor(x, y, emoji) {
        this.x = x;
        this.y = y;
        this.emoji = emoji;
        this.width = 50;
        this.height = 50;
        this.animationFrame = 0;
    }
    
    update(speed) {
        this.x -= speed;
        this.animationFrame += 0.1;
    }
    
    draw(ctx) {
        ctx.font = `${this.width}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add slight wobble animation
        const wobble = Math.sin(this.animationFrame) * 2;
        ctx.fillText(this.emoji, this.x + this.width/2, this.y + this.height/2 + wobble);
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocityX = (Math.random() - 0.5) * 10;
        this.velocityY = (Math.random() - 0.5) * 10 - 5;
        this.life = 60;
        this.maxLife = 60;
        this.size = Math.random() * 6 + 2;
    }
    
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY += 0.3; // gravity
        this.life--;
    }
    
    draw(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Start the game
window.addEventListener('load', () => {
    new Game();
});

export default Game;