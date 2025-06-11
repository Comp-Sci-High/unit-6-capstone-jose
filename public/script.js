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

    // Create dark mode toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.innerText = '🌓 Toggle Dark Mode';
    Object.assign(toggleBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 15px',
        backgroundColor: '#228B22',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: '1000',
    });
    toggleBtn.addEventListener('click', toggleDarkMode);
    document.body.appendChild(toggleBtn);

    // Create invisible rickroll button just above dark mode button
    const rickRollBtn = document.createElement('button');
    Object.assign(rickRollBtn.style, {
        position: 'fixed',
        bottom: '60px', // above dark mode toggle
        right: '20px',
        width: '100px',
        height: '30px',
        opacity: '0', // invisible
        cursor: 'pointer',
        zIndex: '999',
    });
    rickRollBtn.addEventListener('click', () => {
        window.location.href = 'https://media.tenor.com/saW3dB7RDXsAAAAC/rickroll-rick-astley.gif'; // Rickroll gif link
    });
    document.body.appendChild(rickRollBtn);

    // Scroll animations
    const scrollElements = document.querySelectorAll('.card, .hero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.2 });

    scrollElements.forEach(el => observer.observe(el));

    // Carousel slider logic
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        let index = 0;
        const totalSlides = carousel.children.length;
        const slideWidth = carousel.children[0].getBoundingClientRect().width;

        setInterval(() => {
            index = (index + 1) % totalSlides;
            carousel.style.transform = `translateX(-${index * slideWidth}px)`;
        }, 3000); // Change every 3 seconds
    }
});