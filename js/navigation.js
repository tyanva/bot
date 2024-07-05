// navigation.js

export function setupMainNav() {
    const buttons = document.querySelectorAll('.nav-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadPage(button.id.split('-')[0]);
        });
    });

    // Load default page
    loadPage('build');
}

function setupTopNav() {
    const topNavButtons = document.querySelectorAll('.top-nav-btn');
    topNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            topNavButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadTabContent(button.id.split('-')[0]);
        });
    });

    // Load default tab content
    if (topNavButtons.length > 0) {
        loadTabContent(topNavButtons[0].id.split('-')[0]);
    }
}

function loadPage(page) {
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            setupTopNav();
            if (page === 'build') {
                import('./canvas.js').then(module => {
                    module.initializeCanvas();
                });
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

function loadTabContent(tab) {
    fetch(`sub-${tab}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('tab-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading tab content:', error);
        });
}

export { loadPage, loadTabContent, setupTopNav };
