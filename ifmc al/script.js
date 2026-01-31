// Language dropdown toggle
const languageSelector = document.querySelector('.language-selector');
const languageDropdown = document.querySelector('.language-dropdown');

languageSelector.addEventListener('click', function(e) {
    e.stopPropagation();
    languageDropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!languageSelector.contains(e.target)) {
        languageDropdown.classList.remove('show');
    }
});

// Language option selection
const languageOptions = document.querySelectorAll('.language-option');
languageOptions.forEach(option => {
    option.addEventListener('click', function(e) {
        e.stopPropagation();

        // Remove active class from all
        languageOptions.forEach(opt => opt.classList.remove('active'));

        // Add active to clicked
        this.classList.add('active');

        // Update displayed language
        const selectedLang = this.querySelector('span').textContent;
        const selectedFlag = this.querySelector('svg').outerHTML;
        languageSelector.querySelector('svg').outerHTML = selectedFlag;
        languageSelector.querySelector('.fw-semibold').textContent = selectedLang;

        // Close dropdown
        languageDropdown.classList.remove('show');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.dot');
    const serviceCards = [
        document.getElementById('card-1'),
        document.getElementById('card-2'),
        document.getElementById('card-3'),
        document.getElementById('card-4')
    ];
    
    // 1. Definicioni i të gjitha shërbimeve (32 gjithsej)
    const ALL_SERVICES_DATA = [
        // Indeksi 0 (Shërbimi 1) - Pika 1, 30, 31, 32
        { name: 'Laborator', img: 'images/Laborator.webp' },
        
        // Indeksi 1 (Shërbimi 2) - Pika 1, 2, 31, 32
        { name: 'Imazheri & Skanime', img: 'images/Imazheri.webp' },
        
        // Indeksi 2 (Shërbimi 3) - Pika 1, 3, 32
        { name: 'Ndërhyrje Kirurgjikale', img: 'images/Nderhyrje-Kirurgjikale.webp' },

        // Indeksi 3 (Shërbimi 4) - Pika 1, 4
        { name: 'Endoskopi', img: 'images/endoskopi.webp' },
        
        // Indeksi 4 (Shërbimi 5) - Pika 5
        { name: 'Gastroskopi', img: 'images/gastrokopi.webp' },

        // Indeksi 5 (Shërbimi 6) - Pika 6
        { name: 'Nefrologji', img: 'images/nefrologji.webp' },
        
        // Indeksi 6 (Shërbimi 7) - Pika 7
        { name: 'Urologji', img: 'images/urologji.webp' },
        
        // Indeksi 7 (Shërbimi 8) - Pika 8
        { name: 'Hematologji', img: 'images/hematologji.webp' },
        
        // Indeksi 8 (Shërbimi 9) - Pika 9
        { name: 'Reumatologji', img: 'images/reumatologji.webp' },
        
        // Indeksi 9 (Shërbimi 10) - Pika 10
        { name: 'Endokrinologji', img: 'images/endokrinologji.webp' },
        
        // Indeksi 10 - 30: VAZHDONI TË SHTONI EDHE 22 SHËRBIME TË TJERA KËTU!

        // Ju lutem sigurohuni të arrini në Indeksin 31 (Shërbimi 32)
        
        { name: 'Pneumologji', img: 'images/pneumologji.webp' },
        { name: 'Alergologji', img: 'images/alergologji.webp' },
        { name: 'Pediatri', img: 'images/pediatri.webp'},
        { name: 'Obstetrikë & Gjinekologji', img: 'images/gjinekologji.webp' },
        { name: 'Sëmundje Infektive', img: 'images/semundje-infektive.webp' },
        { name: 'Reanimacion', img: 'images/reanimacion-2.webp' },
        { name: 'Psikiatri', img: 'images/psikiatri.webp' },
        { name: 'Oftalmologji', img: 'images/oftamologji.webp' },
        { name: 'Mjekësi Familje', img: 'images/mjekesi-familje.webp' },
        { name: 'Kolonoskopi', img: 'images/kolonoskopi.webp' },
        { name: 'Histeroskopi', img: 'images/histeroskopi.webp' },
        { name: 'Cistoskopi', img: 'images/cistoskopi.webp' },
        { name: 'Biopsi', img: 'images/biopsi.webp' },
        { name: 'Anestezi', img: 'images/anestezi.webp' },
        { name: 'Gastrohepatologji', img: 'images/gastroentelogji.webp' },
        { name: 'Ortopedi', img: 'images/ortopedi.webp' },
        { name: 'Kardiologji', img: 'images/kardiologji.webp' },
        { name: 'Urgjenca', img: 'images/urgjenca.webp' },
        { name: 'ORL', img: 'images/orl.webp' },
        { name: 'Onkologji', img: 'images/onkologji.webp' },
        { name: 'Dermatologji', img: 'images/dermatologji.webp' },
        
        // Indeksi 31 (Shërbimi 32) - Pika 32
        { name: 'Neurologji', img: 'images/neurologji.webp' }, 
    ];

    // Funksion për të gjeneruar HTML-në e kartës
    function generateCardHTML(data) {
        return `
            <div class="service-image-container">
                <img src="${data.img}" class="service-image" alt="${data.name}">
            </div>
            <div class="service-text d-flex justify-content-between align-items-center mt-2 p-2">
                <span class="service-name">${data.name}</span>
                <i class="fa-solid fa-arrow-up" style="color: #25a981;"></i>
            </div>
        `;
    }

    // Funksioni kryesor për ndërrimin e kartave
    function updateCards(dotIndex) {
        let startIndex; // Indeksi i shërbimit të parë që shfaqet (0-bazë)
        let cardsToShow = 4; // Numri i kartave që shfaqen (për ciklin special)

        if (dotIndex >= 2 && dotIndex <= 29) {
            // A. LËVIZJA E VAZHDUESHME (Pikat 2 deri 29)
            // Dot 2 shfaq S2 (startIndex 1), Dot 29 shfaq S29 (startIndex 28)
            startIndex = dotIndex - 1; 
        } else if (dotIndex >= 30 && dotIndex <= 32) {
            // B. CIKLI SPECIAL (Pikat 30, 31, 32)
            // Këto pika shfaqin S1, S2, S3 në mënyrë sekuenciale.
            startIndex = 0; // Përmbajtja mbetet S1, S2, S3, S4
            cardsToShow = dotIndex - 29; // 30 -> 1 kartë, 31 -> 2 karta, 32 -> 3 karta
        } else if (dotIndex === 1) {
            // C. PIKA 1 (Fillimi dhe Rifillimi pas ciklit 32)
            // Shfaq S1, S2, S3, S4 (4 karta)
            startIndex = 0;
        }

        // 2. Vendos përmbajtjen dhe shikueshmërinë
        for (let i = 0; i < 4; i++) {
            const card = serviceCards[i];
            const serviceData = ALL_SERVICES_DATA[startIndex + i];
            
            // 2.1 Vendos përmbajtjen (Karta 1-4 merr përmbajtjen nga startIndex deri startIndex+3)
            if (serviceData) {
                // Sigurohuni që të vendosni përmbajtjen e plotë të kartës:
                card.innerHTML = generateCardHTML(serviceData);
            } else {
                // Përmbajtja bosh (nëse startIndex+i > 31)
                card.innerHTML = ''; 
            }

            // 2.2 Menaxho shikueshmërinë (Vetëm në ciklin special ndryshon cardsToShow)
            if (dotIndex >= 30 && dotIndex <= 32) {
                // Fsheh kartat që janë jashtë kufirit të ciklit (p.sh., fsheh S4 tek pika 32)
                if (i < cardsToShow) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            } else {
                // Për të gjitha pikat e tjera (1-29), shfaq gjithmonë 4 karta
                card.style.display = 'block';
            }
        }
    }

    // Funksioni për të menaxhuar aktivitetin e pikës
    function updateDotActiveState(clickedDot) {
        dots.forEach(d => d.classList.remove('active'));
        clickedDot.classList.add('active');
    }

    // Event Listener për çdo pikë
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const dotIndex = parseInt(this.getAttribute('data-dot-index'));
            
            updateDotActiveState(this);
            updateCards(dotIndex);
        });
    });

    // Inicializimi: Shfaq S1-S4 (për Dot 1)
    updateCards(1); 
});
