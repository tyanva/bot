// createCanvasMenu.js
export function createCanvasMenu(canvas, menuID, menuURL) {
    // Создаем элемент скрипта
    const script = document.createElement('script');
    
    // Устанавливаем URL скрипта меню
    script.src = menuURL;

    // Когда скрипт загружен, выполняем вставку меню
    script.onload = () => {
        // Проверяем, что меню было экспортировано из скрипта
        if (window.menuHTML) {
            // Находим элемент с указанным ID
            const menuElement = document.getElementById(menuID);

            if (menuElement) {
                // Вставляем HTML меню в элемент
                menuElement.innerHTML = window.menuHTML;
            } else {
                console.error(`Element with ID ${menuID} not found.`);
            }
        } else {
            console.error('Menu script does not export menuHTML.');
        }
    };

    // Обрабатываем ошибку загрузки скрипта
    script.onerror = () => {
        console.error(`Failed to load script from ${menuURL}`);
    };

    // Добавляем скрипт в документ
    document.head.appendChild(script);
}
