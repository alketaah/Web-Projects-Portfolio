document.addEventListener('DOMContentLoaded', () => {
    
    // Zgjedh elementet kryesore
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    // Përdorim 'let' sepse mund ta ndryshojmë. 
    // Sigurohemi që të marrim elementin.  
    const dotsContainer = document.getElementsByClassName('slider-dots-container')[0];
    const categoryButtons = document.querySelectorAll('.category-btn');
    let currentSlide = 0;

    // --- FUNKSIONET E KARUSELIT ---
    
    // Funksioni për Animacionin e Butonave (Kuzhina, Pastiçeria, etj.)
    function animateCategoryButtons(activate) {
        // Fsheh të gjithë butonat si fillim
        categoryButtons.forEach(button => {
            button.classList.remove('show');
            button.classList.add('hidden');
        });

        if (activate && slides[currentSlide].classList.contains('slide-type-1')) {
            // Esekuto vetëm në Sliden 1
            categoryButtons.forEach(button => {
                const delay = parseFloat(button.getAttribute('data-delay'));
                
                // Shton klasën 'show' pas vonesës specifike
                setTimeout(() => {
                    // Përsëri, kontrollon nëse jemi në Sliden 1 kur mbaron vonesa
                    if (slides[currentSlide].classList.contains('slide-type-1')) {
                        button.classList.remove('hidden');
                        button.classList.add('show');
                    }
                }, delay * 1000 + 100); // Shtojmë një vonesë të vogël 100ms
            });
        }
    }

    // Funksioni i Përditësuar: Shfaq sliden dhe përditëson pikat
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active-slide'));
        
        // Logjika e rrotullimit (looping)
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentSlide = index;
        slides[currentSlide].classList.add('active-slide');
        
        // Përditësimi i pikave (vetëm nëse kontaineri u gjet)
        if (dotsContainer) {
            const dots = document.querySelectorAll('.dot');
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        }

        // Thërrasim animacionin e butonave
        if (slides[currentSlide].classList.contains('slide-type-1')) {
            animateCategoryButtons(true);
        } else {
            animateCategoryButtons(false); // Fsheh në slidet e tjera
        }
    }

    // --- LOGJIKA E KARUSELIT (KRIJIMI I PIKAVE) ---
    
    // Ky funksion do të ekzekutohet vetëm nëse dotsContainer u gjet.
    function createDots() {
        if (!dotsContainer) return; // Sigurohet që të ketë kontainer

        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.setAttribute('data-index', index);
            
            // Shtojmë funksionin për të rinisur kohëmatësin (resetTimer) në eventin 'click'
            dot.addEventListener('click', () => {
                showSlide(index);
                resetTimer(); 
            });
            
    const tabLinks = document.querySelectorAll('.tab-link');
    const productContents = document.querySelectorAll('.product-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const tabId = this.getAttribute('data-tab');

            // Hiq klasën 'active' nga të gjitha lidhjet
            tabLinks.forEach(innerLink => innerLink.classList.remove('active'));
            // Shto klasën 'active' te lidhja e klikuar
            this.classList.add('active');

            // Shfaq ose fshih përmbajtjen e produkteve
            productContents.forEach(content => {
                if (content.id === tabId) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
    
            dotsContainer.appendChild(dot);
        });
    }

    // Funksioni për të kaluar në slajdin tjetër (përdoret nga Autoplay)
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // ==========================================
    // NDËRRIMI AUTOMATIK DHE KONTROLLI I KOHËMATËSIT
    // ==========================================
    const autoplayInterval = 8000; // 10 sekonda
    let slideTimer = setInterval(nextSlide, autoplayInterval);

    // Funksioni që rinis kohëmatësin (përdoret pas ndërveprimit të përdoruesit)
    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, autoplayInterval);
    }

    // Inicializimi i Kodit
    
    // 1. Krijimi i Pikave
    createDots(); 

    // 2. Shfaqja e slajdit fillestar
    showSlide(currentSlide);
    
    // 3. Lidhim eventet me funksionin resetTimer()
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        resetTimer(); 
    });
    
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        resetTimer();
    });
});
// ===== PRODUCT IMAGE SLIDER FUNCTIONS =====

// Funksioni për të ndryshuar imazhin me shigjetat
function changeImage(event, button, direction) {
    event.preventDefault();
    event.stopPropagation();
    
    const wrapper = button.closest('.product-image-wrapper');
    const images = wrapper.querySelectorAll('.product-image');
    const dots = wrapper.querySelectorAll('.dot');
    let currentIndex = 0;
    
    // Gjej index-in aktual
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Largo active class nga imazhi aktual
    images[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    // Llogarit index-in e ri
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % images.length;
    } else {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
    
    // Shto active class te imazhi i ri
    images[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Funksioni për të shkuar direkt te një imazh me klikimin e dot-it
function goToImage(event, dot, index) {
    event.preventDefault();
    event.stopPropagation();
    
    const wrapper = dot.closest('.product-image-wrapper');
    const images = wrapper.querySelectorAll('.product-image');
    const dots = wrapper.querySelectorAll('.dot');
    
    // Largo active class nga të gjitha
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    // Shto active class te elementi i zgjedhur
    images[index].classList.add('active');
    dots[index].classList.add('active');
}

// OPSIONALE: Auto-slide kur vendoset mouse mbi produktin
let autoSlideInterval;

document.querySelectorAll('.product-card').forEach(card => {
    // Nis auto-slide kur mouse hyn
    card.addEventListener('mouseenter', () => {
        const wrapper = card.querySelector('.product-image-wrapper');
        const nextBtn = wrapper.querySelector('.next-arrow');
        
        // Ndryshon imazhin çdo 3 sekonda
        autoSlideInterval = setInterval(() => {
            changeImage(new Event('click'), nextBtn, 'next');
        }, 3000);
    });
    
    // Ndal auto-slide kur mouse del
    card.addEventListener('mouseleave', () => {
        clearInterval(autoSlideInterval);
    });
});
function openSearch() {
    document.getElementById('searchModal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Block scroll
}

function closeSearch() {
    document.getElementById('searchModal').classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scroll
}

// Add click event to search button
document.querySelector('.search-btn').addEventListener('click', openSearch);

// Close modal when clicking outside
document.getElementById('searchModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSearch();
    }
});

// Close with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
    }
});
