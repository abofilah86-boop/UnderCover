document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < windowHeight - 100) {
                el.classList.add('active');

                // Typing effect for paragraphs
                const paragraphs = el.querySelectorAll('p');
                paragraphs.forEach(p => {
                    if (!p.dataset.typed) {
                        const originalText = p.textContent;
                        p.dataset.typed = "true";
                        typeEffect(p, originalText);
                    }
                });

                // Dynamic Skill Fluctuations based on Date
                if (el.id === 'skills') {
                    const bars = el.querySelectorAll('.bar');
                    const date = new Date();
                    const day = date.getDate();
                    const month = date.getMonth();

                    bars.forEach((bar, index) => {
                        // Base high values (90-95%)
                        const baseValues = [95, 92, 90, 93];
                        // Variation (-3 to +3) based on date and bar index
                        const variation = Math.sin((day + month + index) * 0.5) * 3;
                        const finalValue = Math.min(100, Math.max(85, baseValues[index] + variation));

                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = finalValue + '%';
                        }, 100);
                    });
                }
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Custom cursor glow effect
    const glow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // Smooth navigation active state (optional enhancement)
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Member Modal Logic
    const modal = document.getElementById('member-modal');
    const memberCards = document.querySelectorAll('.member-card');
    const closeModal = document.querySelector('.close-modal');

    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    const modalDesc = document.getElementById('modal-desc');

    memberCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            const role = card.getAttribute('data-role');
            const desc = card.getAttribute('data-desc');

            modalName.textContent = name;
            modalRole.textContent = role;
            modalDesc.textContent = desc;

            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
        });
    });

    const closeMemberModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    };

    closeModal.addEventListener('click', closeMemberModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeMemberModal();
    });

    // Intro Sequence Logic
    const introOverlay = document.getElementById('intro-overlay');
    const bootMessages = document.getElementById('boot-messages');
    const accessGranted = document.getElementById('access-granted');

    const messages = [
        "> INITIALIZING SYSTEM...",
        "> LOADING UNDERCOVER PROTOCOLS...",
        "> CONNECTING TO HARD STATE SERVER...",
        "> BYPASSING FIREWALLS...",
        "> DECRYPTING AGENT DATABASE...",
        "> ENCRYPTING CONNECTION...",
        "> IDENTITY VERIFIED.",
        "> STATUS: ELITE AGENT"
    ];

    let msgIndex = 0;
    const showBootMessage = () => {
        if (msgIndex < messages.length) {
            const p = document.createElement('p');
            p.textContent = messages[msgIndex];
            bootMessages.appendChild(p);
            msgIndex++;
            setTimeout(showBootMessage, 150 + Math.random() * 200);
        } else {
            setTimeout(() => {
                bootMessages.style.display = 'none';
                accessGranted.style.display = 'block';
                setTimeout(() => {
                    introOverlay.style.opacity = '0';
                    setTimeout(() => introOverlay.style.display = 'none', 1000);
                }, 1500);
            }, 500);
        }
    };

    showBootMessage();

    // Terminal Typing Effect helper
    function typeEffect(element, text, speed = 30) {
        element.textContent = '';
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    }
});
