/* ==========================================================================
   KARAN SANKOUMBA - LANDING PAGE JAVASCRIPT
   Version: 1.0
   ========================================================================== */

/* ==========================================================================
   1. ATTENDRE CHARGEMENT DU DOM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialiser tous les modules
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initBackToTop();
    initHeaderScroll();
    initHeroParticles();
    
    console.log('✨ Karan Sankoumba - Site initialisé avec succès');
});

/* ==========================================================================
   2. MENU MOBILE BURGER
   ========================================================================== */

function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!toggle || !nav) {
        console.warn('⚠️ Menu mobile : éléments non trouvés');
        return;
    }
    
    // Toggle menu au clic sur burger
    toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Bloquer le scroll du body quand menu ouvert
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fermer menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer menu au clic en dehors
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ==========================================================================
   3. SMOOTH SCROLL
   ========================================================================== */

function initSmoothScroll() {
    // Tous les liens avec href="#..."
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens vides ou "#"
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Offset pour header fixed (80px)
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================================================
   4. FAQ ACCORDION
   ========================================================================== */

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        console.warn('⚠️ FAQ : aucune question trouvée');
        return;
    }
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Fermer toutes les autres FAQ
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherQuestion = item.querySelector('.faq-question');
                    if (otherQuestion) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                }
            });
            
            // Toggle la FAQ cliquée
            if (isActive) {
                faqItem.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
            } else {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* ==========================================================================
   5. BOUTON BACK TO TOP
   ========================================================================== */

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) {
        console.warn('⚠️ Back to top : bouton non trouvé');
        return;
    }
    
    // Afficher/masquer selon scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top au clic
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   6. HEADER SCROLL EFFECT
   ========================================================================== */

function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) {
        console.warn('⚠️ Header : élément non trouvé');
        return;
    }
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Ajouter classe scrolled si scroll > 50px
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ==========================================================================
   7. PARTICULES DORÉES HERO
   ========================================================================== */

function initHeroParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    
    if (!particlesContainer) {
        console.warn('⚠️ Particules : conteneur non trouvé');
        return;
    }
    
    // Créer 30 particules dorées
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Position aléatoire
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    // Taille aléatoire (2-6px)
    const size = Math.random() * 4 + 2;
    
    // Durée animation aléatoire (3-8s)
    const duration = Math.random() * 5 + 3;
    
    // Délai aléatoire (0-3s)
    const delay = Math.random() * 3;
    
    // Opacité aléatoire (0.3-0.8)
    const opacity = Math.random() * 0.5 + 0.3;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(212, 175, 55, ${opacity}), transparent);
        border-radius: 50%;
        left: ${startX}%;
        top: ${startY}%;
        pointer-events: none;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        box-shadow: 0 0 ${size * 2}px rgba(212, 175, 55, 0.5);
    `;
    
    container.appendChild(particle);
}

// Ajouter les keyframes pour l'animation des particules
if (!document.getElementById('particle-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'particle-animation-styles';
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                opacity: 0.8;
            }
            90% {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

/* ==========================================================================
   8. UTILITAIRES
   ========================================================================== */

// Détecter si élément est visible dans viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Détecter si élément est partiellement visible
function isPartiallyVisible(element, offset = 100) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top <= windowHeight - offset &&
        rect.bottom >= offset
    );
}

/* ==========================================================================
   9. GESTION ERREURS
   ========================================================================== */

// Capturer les erreurs JavaScript
window.addEventListener('error', function(e) {
    console.error('❌ Erreur JavaScript:', e.message, 'à la ligne', e.lineno);
});

// Log de debug (désactiver en production)
const DEBUG = false;

function log(...args) {
    if (DEBUG) {
        console.log('🔍', ...args);
    }
}

/* ==========================================================================
   10. PERFORMANCE
   ========================================================================== */

// Throttle function pour optimiser les événements scroll/resize
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ==========================================================================
   11. INITIALISATION ICONES LUCIDE
   ========================================================================== */

// Les icônes Lucide sont initialisées dans le HTML via :
// <script>lucide.createIcons();</script>

// Si besoin de réinitialiser après chargement dynamique :
function reinitLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

/* ==========================================================================
   FIN DU FICHIER
   ========================================================================== */
