document.addEventListener('DOMContentLoaded', () => {
    // Live IST Clock
    function updateISTClock() {
        const clockEl = document.getElementById('ist-clock');
        if (!clockEl) return;
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        clockEl.textContent = `${timeStr} IST`;
    }
    updateISTClock();
    setInterval(updateISTClock, 1000);

    // Hero Card Flip
    const flipWrapper = document.getElementById('hero-flip-wrapper');
    const globeTrigger = document.getElementById('globe-flip-trigger');
    const globeBack = document.getElementById('globe-flip-back');
    if (globeTrigger && flipWrapper) {
        globeTrigger.addEventListener('click', () => flipWrapper.classList.toggle('is-flipped'));
    }
    if (globeBack && flipWrapper) {
        globeBack.addEventListener('click', () => flipWrapper.classList.remove('is-flipped'));
    }

    // Seamless credits loop: duplicate content so scroll never gaps
    const creditsReel = document.getElementById('credits-reel');
    if (creditsReel) {
        const clone = creditsReel.innerHTML;
        creditsReel.innerHTML = clone + clone;
    }

    // Theme Toggling Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    themeToggleBtn.addEventListener('click', toggleTheme);
    document.getElementById('cmd-theme-toggle').addEventListener('click', () => {
        toggleTheme();
        cmdDialog.close();
    });

    // Command Palette Logic
    const cmdDialog = document.getElementById('command-palette');
    const searchBtn = document.getElementById('search-btn');
    const cmdInput = document.getElementById('cmd-input');

    // Open on button click
    searchBtn.addEventListener('click', () => {
        cmdDialog.showModal();
        cmdInput.focus();
    });

    // Open on Ctrl+K or Cmd+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault(); // Prevent default browser search
            if (!cmdDialog.open) {
                cmdDialog.showModal();
                cmdInput.focus();
            } else {
                cmdDialog.close();
            }
        }
    });

    // Close when clicking outside of the dialog wrapper
    cmdDialog.addEventListener('click', (e) => {
        const rect = cmdDialog.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                            rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            cmdDialog.close();
        }
    });

    // Close on ESC handled natively by <dialog>, we just listen to it to clear input optionally
    cmdDialog.addEventListener('close', () => {
        cmdInput.value = ''; // clear input on close
    });

    // Command List Navigation (Basic arrow key support)
    const cmdItems = document.querySelectorAll('.cmd-item');
    let currentIndex = -1;

    cmdInput.addEventListener('keydown', (e) => {
        if (!cmdDialog.open) return;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % cmdItems.length;
            cmdItems[currentIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + cmdItems.length) % cmdItems.length;
            cmdItems[currentIndex].focus();
        }
    });

    cmdItems.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                currentIndex = (index + 1) % cmdItems.length;
                cmdItems[currentIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentIndex = (index - 1 + cmdItems.length) % cmdItems.length;
                cmdItems[currentIndex].focus();
            }
        });
    });



    // Visitor IPv4 + Country Display
    async function fetchVisitorInfo() {
        try {
            // Force IPv4 via api4.ipify.org
            const ipRes = await fetch('https://api4.ipify.org?format=json');
            const ipData = await ipRes.json();
            const ip = ipData.ip;

            // Look up country from the IPv4
            const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
            const geoData = await geoRes.json();

            const ipEl = document.getElementById('visitor-ip');
            const countryEl = document.getElementById('visitor-country');
            if (ipEl) ipEl.textContent = ip || '--';
            if (countryEl) countryEl.textContent = `${geoData.country_name || '--'} (${geoData.country_code || '--'})`;
        } catch (e) {
            const ipEl = document.getElementById('visitor-ip');
            if (ipEl) ipEl.textContent = 'unavailable';
        }
    }

    fetchVisitorInfo();
});
