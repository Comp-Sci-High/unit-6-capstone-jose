const toggleDarkMode = () => {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

document.addEventListener('DOMContentLoaded', () => {
    // Load theme from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Create dark mode button
    const toggleBtn = document.createElement('button');
    toggleBtn.innerText = '🌓 Toggle Dark Mode';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '20px';
    toggleBtn.style.right = '20px';
    toggleBtn.style.padding = '10px 15px';
    toggleBtn.style.backgroundColor = '#228B22';
    toggleBtn.style.color = 'white';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '5px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.zIndex = '1000';

    toggleBtn.addEventListener('click', toggleDarkMode);
    document.body.appendChild(toggleBtn);

    // ======== SCROLL ANIMATIONS ========
    const scrollElements = document.querySelectorAll('.card, .hero');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.2,
    });

    scrollElements.forEach(el => observer.observe(el));
});

const rickRollBtn = document.createElement('button');
    rickRollBtn.style.position = 'fixed';
    rickRollBtn.style.bottom = '60px'; // slightly above the dark mode toggle
    rickRollBtn.style.right = '20px';
    rickRollBtn.style.width = '100px';
    rickRollBtn.style.height = '30px';
    rickRollBtn.style.opacity = '0'; // Makes it invisible
    rickRollBtn.style.cursor = 'pointer';
    rickRollBtn.style.zIndex = '999';

    rickRollBtn.addEventListener('click', () => {
        window.location.href = ' https://media.tenor.com/saW3dB7RDXsAAAAC/rickroll-rick-astley.gif'; // Rickroll gif link
    });

    document.body.appendChild(rickRollBtn);


        let index = 0;
        const totalSlides = 3;
        const carousel = document.getElementById('carouselContainer');

        setInterval(() => {
            index = (index + 1) % totalSlides;
            carousel.style.transform = `translateX(-${index * 800}px)`;
        }, 3000); // Change every 3 seconds

