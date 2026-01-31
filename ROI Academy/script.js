// Select the button
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button when scrolling down
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
};

// Scroll to top when clicked
scrollTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.team-row');
    const cardMoveTime = 2500; // Koha (në ms) mes çdo lëvizjeje (pauza)
    const transitionTime = 500; // Koha (në ms) që i duhet një kartelete për të lëvizur (0.5 sekonda)
    const delayBetweenRows = 1500; // Vonesa (në ms) mes fillimit të lëvizjes së rreshtave

    // 1. Përgatitja e Strukturës (Përshtatja e rreshtave në slider-content)
    rows.forEach(row => {
        const originalMembers = Array.from(row.children);
        
        // Krijojmë një kontainer të brendshëm 'slider-content'
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('slider-content');
        
        // Shtojmë dyfishin e kartelave
        [...originalMembers, ...originalMembers].forEach(member => {
             contentDiv.appendChild(member.cloneNode(true));
        });
        
        row.innerHTML = '';
        row.appendChild(contentDiv);
        
        // Vlera e re e zhvendosjes: 300px (gjerësia e kartelës) + 20px (gap) = 320px
        row.dataset.moveDistance = 320; 
        row.dataset.cardCount = originalMembers.length; // 4
    });

    // Funksioni kryesor për lëvizjen: Më e thjeshtë dhe seamless
    function moveRow(row) {
        const sliderContent = row.querySelector('.slider-content');
        const moveDistance = parseInt(row.dataset.moveDistance);
        
        // A. KLASA PËR ANIMACIONIN
        sliderContent.classList.add('animate');
        
        // B. LËVIZ NJË HAP MAJTAS
        sliderContent.style.transform = `translateX(-${moveDistance}px)`;

        // C. RIVENDOSJA PAS LËVIZJES (Krijon iluzionin e pafund)
        setTimeout(() => {
            // 1. Hiq klasën e animacionit
            sliderContent.classList.remove('animate'); 
            
            // 2. Kthe pozicionin në 0px (snap-back)
            sliderContent.style.transform = `translateX(0px)`;
            
            // 3. Merr kartelën e parë dhe vendose në fund
            const firstCard = sliderContent.firstElementChild;
            sliderContent.appendChild(firstCard); 

        }, transitionTime); // Pasi tranzicioni (lëvizja) ka përfunduar
    }

    // 2. Menaxhimi i Animacionit Sekuencial dhe Loop-it
    function startSequentialSlide() {
        rows.forEach((row, index) => {
            const initialDelay = index * delayBetweenRows;

            setTimeout(() => {
                // Thirr funksionin e lëvizjes menjëherë
                moveRow(row); 

                // Vendos intervalin e përsëritur për secilin rresht
                setInterval(() => moveRow(row), cardMoveTime); 

            }, initialDelay);
        });
    }

    // Fillon procesi
    startSequentialSlide();
});




const slider = document.getElementById('gallerySlider');

 // Set initial position to middle set after load
 window.addEventListener('load', () => {
 const items = slider.querySelectorAll('.gallery-item');
 if (items.length > 0) {
 const itemWidth = items[0].offsetWidth;
 const gap = 20;
 // Start at set 3 (middle): 14 photos × 2 sets
 slider.scrollLeft = (itemWidth + gap) * 28;
 }
 });

 // Infinite scroll handler
 let isScrolling = false;

 function handleInfiniteScroll() {
 if (isScrolling) return;

 const items = slider.querySelectorAll('.gallery-item');
 if (items.length === 0) return;

 const itemWidth = items[0].offsetWidth;
 const gap = 20;
 const setWidth = (itemWidth + gap) * 14;
 const scrollPos = slider.scrollLeft;

 // If scrolled near end (set 5), jump back to set 3
 if (scrollPos >= setWidth * 4 - 200) {
 isScrolling = true;
 slider.scrollLeft = setWidth * 2;
 setTimeout(() => { isScrolling = false; }, 50);
 }

 // If scrolled near beginning (set 1), jump to set 3
 if (scrollPos <= setWidth + 200) {
 isScrolling = true;
 slider.scrollLeft = setWidth * 3;
 setTimeout(() => { isScrolling = false; }, 50);
 }
 }

 slider.addEventListener('scroll', handleInfiniteScroll);

 // Drag to scroll functionality
 let isDragging = false;
 let startX;
 let scrollLeft;

 slider.addEventListener('mousedown', (e) => {
 isDragging = true;
 slider.style.cursor = 'grabbing';
 startX = e.pageX - slider.offsetLeft;
 scrollLeft = slider.scrollLeft;
 e.preventDefault();
 });

 document.addEventListener('mouseup', () => {
 isDragging = false;
 slider.style.cursor = 'grab';
 });

 slider.addEventListener('mouseleave', () => {
 isDragging = false;
 slider.style.cursor = 'grab';
 });

 slider.addEventListener('mousemove', (e) => {
 if (!isDragging) return;
 e.preventDefault();
 const x = e.pageX - slider.offsetLeft;
 const walk = (x - startX) * 2;
 slider.scrollLeft = scrollLeft - walk;
 });

 // Touch support for mobile
 let touchStartX = 0;
 let touchScrollLeft = 0;

 slider.addEventListener('touchstart', (e) => {
 touchStartX = e.touches[0].pageX;
 touchScrollLeft = slider.scrollLeft;
 });

 slider.addEventListener('touchmove', (e) => {
 const x = e.touches[0].pageX;
 const walk = (touchStartX - x) * 2;
 slider.scrollLeft = touchScrollLeft + walk;
 });