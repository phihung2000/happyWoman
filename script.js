// Floating hearts in background
function createFloatingHearts() {
    const heartsBackground = document.querySelector('.hearts-background');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        heartsBackground.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

// Fireworks effect
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
        const particleCount = 50;
        const colors = ['#ff006e', '#ff4d94', '#ffd700', '#ff69b4', '#ff1493'];
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
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
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= 0.01;
        });
        
        this.particles = this.particles.filter(p => p.life > 0);
    }
    
    draw() {
        this.particles.forEach(particle => {
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }
    
    isDead() {
        return this.particles.length === 0;
    }
}

// Fireworks manager
const canvas = document.getElementById('fireworks');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let fireworks = [];
let isFireworksActive = false;
let animationFrameId = null;

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        
        if (firework.isDead()) {
            fireworks.splice(index, 1);
        }
    });
    
    // Continue animation loop as long as there are fireworks or it's active
    if (isFireworksActive || fireworks.length > 0) {
        animationFrameId = requestAnimationFrame(animateFireworks);
    } else {
        animationFrameId = null;
    }
}

function launchFireworks() {
    isFireworksActive = true;
    
    // Start animation loop if not already running
    if (!animationFrameId) {
        animateFireworks();
    }
    
    const launchInterval = setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        fireworks.push(new Firework(canvas, x, y));
    }, 200);
    
    setTimeout(() => {
        clearInterval(launchInterval);
        setTimeout(() => {
            isFireworksActive = false;
        }, 3000);
    }, 5000);
}

// Heart button click event
const heartButton = document.getElementById('heartButton');
let clickCount = 0;

heartButton.addEventListener('click', () => {
    clickCount++;
    
    // Create explosion of hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '💖';
            heart.style.left = heartButton.offsetLeft + heartButton.offsetWidth / 2 + 'px';
            heart.style.top = heartButton.offsetTop + 'px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 100;
            heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 50);
    }
    
    // Launch fireworks
    launchFireworks();
    
    // Change button text
    const messages = [
        'Yêu baby! 💖✨',
        'Baby xinh quá đi! 😍',
        'Anh nghiện baby rồi! 🔥',
        'My Queen! ��💕',
        'Baby của anh thôi! 💖',
        'Yêu em vô cùng! ❤️🌟',
        'Forever baby nha! 💕✨',
        'Em là tất cả! 🌹💖'
    ];
    
    heartButton.querySelector('.button-text').textContent = messages[clickCount % messages.length];
    
    // Animate button
    heartButton.style.transform = 'scale(0.8)';
    setTimeout(() => {
        heartButton.style.transform = 'scale(1)';
    }, 200);
});

// Window resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start floating hearts
createFloatingHearts();

// Welcome animation
window.addEventListener('load', () => {
    setTimeout(() => {
        // Auto-launch some fireworks on load
        isFireworksActive = true;
        
        if (!animationFrameId) {
            animateFireworks();
        }
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height * 0.5;
                fireworks.push(new Firework(canvas, x, y));
            }, i * 500);
        }
        
        setTimeout(() => {
            isFireworksActive = false;
        }, 4000);
    }, 1000);
});

// Add sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.style.fontSize = '15px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '999';
        sparkle.textContent = '✨';
        sparkle.style.animation = 'float 1s ease-in forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
});
