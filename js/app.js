// app.js

import { setupBottomNav, setupTopNav } from './navigation.js';
import { loadPage } from './pageLoader.js';
import { initializeCanvas } from './canvas.js';
import { setupSettings } from './settings.js';

document.addEventListener('DOMContentLoaded', () => {
    setupBottomNav();
    setupSettings();

    // Load default page
    loadPage('upgrade');
});
