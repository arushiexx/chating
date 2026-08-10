/* ============================================================
   EXCLUSIVE CONNECT — Script
   ============================================================ */

// ─── State ───
let currentSelectedPlan = '';
let currentAmount = 0;
let currentLightboxIndex = 0;
const galleryImages = ['assets/pic2.jpeg', 'assets/pic3.jpeg'];

// ─── Lightbox ───
function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = galleryImages[index];
    updateLightboxCounter();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    if (e) e.stopPropagation();
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage(e) {
    e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    document.getElementById('lightboxImg').src = galleryImages[currentLightboxIndex];
    updateLightboxCounter();
}

function prevImage(e) {
    e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('lightboxImg').src = galleryImages[currentLightboxIndex];
    updateLightboxCounter();
}

function updateLightboxCounter() {
    document.getElementById('lightboxCounter').textContent = 
        `${currentLightboxIndex + 1} / ${galleryImages.length}`;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox(e);
    if (e.key === 'ArrowRight') nextImage(e);
    if (e.key === 'ArrowLeft') prevImage(e);
});
(function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.hue = Math.random() > 0.5 ? 270 : 330; // purple or pink
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
            ctx.fill();
        }
    }

    const count = Math.min(60, Math.floor(w * h / 15000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
})();




// ─── Modal ───
const planIcons = {
    'Chat & Gossip': '💬',
    'Voice Call': '📞',
    'Video Call': '🎥'
};

function openModal(planName, price) {
    currentSelectedPlan = planName;
    currentAmount = price;

    // Reset upload state
    document.getElementById('paymentScreenshot').value = '';
    document.getElementById('uploadPreview').style.display = 'none';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('whatsappBtn').style.display = 'none';

    const modal = document.getElementById('paymentModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Push state so back button closes modal instead of leaving site
    history.pushState({ modal: true }, '');
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('uploadArea').style.display = 'none';
        document.getElementById('whatsappBtn').style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('paymentModal');
    if (!modal.classList.contains('show')) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Back button closes modal
window.addEventListener('popstate', function(e) {
    const modal = document.getElementById('paymentModal');
    if (modal.classList.contains('show')) {
        closeModal();
    }
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

function handleOverlayClick(event) {
    if (event.target === document.getElementById('paymentModal')) {
        closeModal();
    }
}


function sendToWhatsApp() {
    const phoneNumber = "918826028193";
    const message = `Hi! I have made the payment of ₹${currentAmount} for the "${currentSelectedPlan}" plan.\n\nHere is my payment screenshot:`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// ─── Escape key closes modals ───
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('paymentModal');
        if (modal.classList.contains('show')) {
            closeModal();
        }
    }
});
