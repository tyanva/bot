// pageLoader.js

export function loadPage(page) {
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(html => { 
            document.getElementById('main-content').innerHTML = html;
            setupTopNav();
            if (page === 'build') {
                initializeCanvas();
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

export function loadTabContent(tab) {
    fetch(`./sub-page/sub-${tab}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('tab-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading tab content:', error);
        });
}
