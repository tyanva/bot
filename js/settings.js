// settings.js

export function setupSettings() {
    document.getElementById('settingsButton').addEventListener('click', function() {
        document.getElementById('settingsOverlay').classList.remove('hidden');
    });

    document.getElementById('settingsCloseButton').addEventListener('click', function() {
        document.getElementById('settingsOverlay').classList.add('hidden');
    });
}
