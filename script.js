// Floating hearts background
function createFloatingHearts() {
    const container = document.querySelector('.background-hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 300);
}

// Fireworks
class Firework {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.particles = [];
        this.createParticles();
    }
    
    createParticles() {
        const colors = ['#ff006e', '#ff4d94', '#ffd700', '#ff69b4', '#ff1493'];
        for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = Math.random() * 5 + 2;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }
    
    update() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1;
            p.life -= 0.01;
        });
        this.particles = this.particles.filter(p => p.life > 0);
    }
    
    draw() {
        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }
    
    isDead() {
        return this.particles.length === 0;
    }
}

const canvas = document.getElementById('fireworks');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let fireworks = [];
let isActive = false;
let animationId = null;

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((fw, i) => {
        fw.update();
        fw.draw();
        if (fw.isDead()) fireworks.splice(i, 1);
    });
    if (isActive || fireworks.length > 0) {
        animationId = requestAnimationFrame(animateFireworks);
    } else {
        animationId = null;
    }
}

function launchFireworks() {
    isActive = true;
    if (!animationId) animateFireworks();
    const interval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        fireworks.push(new Firework(canvas, x, y));
    }, 200);
    setTimeout(() => {
        clearInterval(interval);
        setTimeout(() => isActive = false, 3000);
    }, 5000);
}

const btn = document.getElementById('loveBtn');
let clickCount = 0;

btn.addEventListener('click', () => {
    clickCount++;
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '💖';
            heart.style.left = btn.offsetLeft + btn.offsetWidth / 2 + 'px';
            heart.style.top = btn.offsetTop + 'px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }, i * 50);
    }
    launchFireworks();
    const messages = [
        'Yêu baby! 💖✨',
        'Baby xinh quá! 😍',
        'Anh nghiện baby rồi! 🔥',
        'My Queen! 👑💕',
        'Baby của anh thôi! 💖',
        'Yêu em vô cùng! ❤️🌟',
        'Forever baby! 💕✨',
        'Em là tất cả! 🌹💖'
    ];
    btn.querySelector('span').textContent = messages[clickCount % messages.length];
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

createFloatingHearts();

window.addEventListener('load', () => {
    setTimeout(() => {
        isActive = true;
        if (!animationId) animateFireworks();
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height * 0.5;
                fireworks.push(new Firework(canvas, x, y));
            }, i * 500);
        }
        setTimeout(() => isActive = false, 4000);
    }, 1000);
});

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.style.fontSize = '15px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '999';
        sparkle.textContent = '✨';
        sparkle.className = 'heart';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
});
