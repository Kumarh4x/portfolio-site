gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

gsap.to(".scroll-progress", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
    }
});

const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
    });
});

document.querySelectorAll('a, button, input, textarea, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { width: 400, height: 400, background: 'radial-gradient(circle, rgba(189,0,255,0.15) 0%, rgba(0,0,0,0) 70%)', duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,243,255,0.15) 0%, rgba(0,0,0,0) 70%)', duration: 0.3 });
    });
});

const heroTimeline = gsap.timeline();
heroTimeline.fromTo(".prompt-user", {opacity: 0}, {opacity: 1, duration: 0.5, delay: 0.5})
            .fromTo(".prompt-dir", {opacity: 0}, {opacity: 1, duration: 0.5})
            .fromTo(".typing-text", {width: 0}, {width: "180px", duration: 1, ease: "steps(18)"})
            .fromTo(".hero-title", {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1, ease: "power3.out"}, "+=0.5")
            .fromTo(".hero-subtitle", {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.8}, "-=0.5")
            .fromTo(".scroll-indicator", {opacity: 0}, {opacity: 0.7, duration: 1}, "-=0.5");

gsap.to(".hero-content", {
    y: 150,
    opacity: 0,
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Cyber Hacker Decrypt Reveal
const imgContainer = document.querySelector(".image-mask");
const imgElement = document.querySelector(".image-mask img");

if (imgContainer && imgElement) {
    ScrollTrigger.create({
        trigger: ".about-section",
        start: "top 75%",
        onEnter: () => {
            if (imgContainer.dataset.revealed) return;
            imgContainer.dataset.revealed = true;
            
            const tl = gsap.timeline();
            
            // Start with a thin horizontal laser line (CRT effect)
            tl.set(imgContainer, { opacity: 1, clipPath: "inset(49% 0 49% 0)" })
              .set(imgElement, { filter: "brightness(4) contrast(3) invert(1)", scale: 1.1 })
              
              // Snap open the mask
              .to(imgContainer, { clipPath: "inset(0% 0 0% 0)", duration: 0.3, ease: "power4.inOut" })
              
              // Rapid hacking glitch frames
              .to(imgElement, { filter: "hue-rotate(90deg) contrast(3)", x: 15, skewX: -10, duration: 0.05 })
              .to(imgElement, { filter: "hue-rotate(180deg) invert(1)", x: -15, skewX: 10, duration: 0.05 })
              .to(imgElement, { filter: "hue-rotate(270deg) brightness(2)", x: 5, skewX: -5, duration: 0.05 })
              
              // Resolve to clean image
              .to(imgElement, { x: 0, skewX: 0, scale: 1, filter: "none", duration: 0.2, clearProps: "all" });
        }
    });
}

// Terminal Type Animation for About text
document.querySelectorAll('.split-text').forEach((el, index) => {
    const text = el.innerText;
    el.innerText = "";
    ScrollTrigger.create({
        trigger: ".about-section",
        start: "top 75%",
        onEnter: () => {
            if (el.dataset.typed) return;
            el.dataset.typed = true;
            // Delay second paragraph
            setTimeout(() => {
                let i = 0;
                const interval = setInterval(() => {
                    el.innerText = text.substring(0, i) + (i % 2 === 0 ? "_" : "");
                    i++;
                    if (i > text.length) {
                        clearInterval(interval);
                        el.innerText = text;
                    }
                }, 20);
            }, index * 800);
        }
    });
});

// Hacker Glitch Reveal for Skill Cards
gsap.set(".skill-card", { opacity: 0 });

const skillCards = document.querySelectorAll('.skill-card');
const lettersSkill = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

skillCards.forEach((card, index) => {
    const title = card.querySelector('h3');
    const originalText = title.innerText;
    
    ScrollTrigger.create({
        trigger: ".skills-section",
        start: "top 75%",
        onEnter: () => {
            if (card.dataset.revealed) return;
            card.dataset.revealed = true;
            
            setTimeout(() => {
                const tl = gsap.timeline();
                
                tl.fromTo(card, 
                    { opacity: 1, scaleY: 0.02, scaleX: 0.8, filter: "brightness(4) invert(1)" },
                    { scaleY: 1.05, scaleX: 1.02, duration: 0.15, ease: "power4.out" }
                )
                .to(card, { scaleY: 1, scaleX: 1, duration: 0.1, ease: "bounce.out" })
                .to(card, { filter: "hue-rotate(180deg) brightness(2)", duration: 0.05 })
                .to(card, { filter: "hue-rotate(90deg) invert(1)", duration: 0.05 })
                .to(card, { filter: "none", duration: 0.05, clearProps: "filter,transform" });
                
                // Decode text effect for the skill name
                let iteration = 0;
                const interval = setInterval(() => {
                    title.innerText = originalText.split("").map((letter, idx) => {
                        if(idx < iteration) return originalText[idx];
                        return lettersSkill[Math.floor(Math.random() * lettersSkill.length)];
                    }).join("");
                    
                    if(iteration >= originalText.length){
                        clearInterval(interval);
                        title.innerText = originalText;
                    }
                    iteration += 1/3;
                }, 30);
                
            }, index * 150);
        }
    });
});

document.querySelectorAll('.progress-fill').forEach(bar => {
    gsap.to(bar, {
        width: bar.getAttribute('data-width'),
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".skills-section",
            start: "top 80%"
        }
    });
});

gsap.from(".profile-card", {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".profiles-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// Hacker Decode Effect for Section Titles
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
document.querySelectorAll('.section-title').forEach(title => {
    const bracketSpan1 = '<span class="bracket">[</span> ';
    const bracketSpan2 = ' <span class="bracket">]</span>';
    // Extract actual text (very basic approach since we know the structure)
    const rawText = title.innerText.replace(/\[|\]/g, '').trim();
    
    ScrollTrigger.create({
        trigger: title,
        start: "top 90%",
        onEnter: () => {
            let iteration = 0;
            const interval = setInterval(() => {
                const scrambled = rawText.split("").map((letter, index) => {
                    if(index < iteration) return rawText[index];
                    return letters[Math.floor(Math.random() * letters.length)];
                }).join("");
                
                title.innerHTML = bracketSpan1 + scrambled + bracketSpan2;
                
                if(iteration >= rawText.length){
                    clearInterval(interval);
                    title.innerHTML = bracketSpan1 + rawText + bracketSpan2;
                }
                iteration += 1 / 2;
            }, 30);
        }
    });
});

// Binary background effect
const heroBg = document.querySelector('.hero-background');
if (heroBg) {
    for (let i = 0; i < 40; i++) {
        const bin = document.createElement('div');
        bin.className = 'binary-particle';
        bin.innerText = Math.random() > 0.5 ? '1' : '0';
        heroBg.appendChild(bin);
        
        gsap.set(bin, {
            x: "random(0, " + window.innerWidth + ")",
            y: "random(0, " + window.innerHeight + ")",
            opacity: "random(0.05, 0.2)",
            fontSize: "random(10, 20)px"
        });
        
        gsap.to(bin, {
            y: "-=100",
            opacity: 0,
            duration: "random(2, 5)",
            repeat: -1,
            ease: "none",
            delay: "random(0, 2)",
            onRepeat: function() {
                bin.innerText = Math.random() > 0.5 ? '1' : '0';
                gsap.set(bin, {
                    x: "random(0, " + window.innerWidth + ")",
                    y: window.innerHeight + 20,
                    opacity: "random(0.05, 0.2)"
                });
            }
        });
    }
}

gsap.from(".contact-glass", {
    y: 100,
    opacity: 0,
    rotationX: 10,
    transformPerspective: 1000,
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%"
    }
});

document.querySelector('.terminal-easter-egg span').addEventListener('click', () => {
    alert('Terminal access granted: > sudo rm -rf /');
});

// Secure Image Handling
const secureContainers = document.querySelectorAll('.secure-image-container');
secureContainers.forEach(container => {
    // Disable right click context menu
    container.addEventListener('contextmenu', e => {
        e.preventDefault();
    });

    // Disable long press context menu on mobile
    container.addEventListener('touchstart', e => {
        // Prevent default touch actions (like long-press menu)
        e.preventDefault();
    }, { passive: false });
});
