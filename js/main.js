// main.js

import { setupMainNav, setupTopNav, loadPage, loadTabContent } from './navigation.js';
import { setupSettings } from './settings.js';

document.addEventListener('DOMContentLoaded', () => {
    setupMainNav();
    setupSettings();
});
