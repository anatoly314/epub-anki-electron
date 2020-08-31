export function createMenuTemplate (app) {

    const mainMenuTemplate = [
        // Each object is a dropdown
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open book',
                    click() {
                        console.log('add item');
                    }
                },
                {
                    label: 'Quit',
                    accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click() {
                        app.quit();
                    }
                }
            ]
        }
    ];

    // If OSX, add empty object to menu
    if (process.platform == 'darwin') {
        mainMenuTemplate.unshift({
            label: app.getName()
        });
    }

    // Add developer tools option if in dev
    if (process.env.NODE_ENV !== 'production') {
        mainMenuTemplate.push({
            label: 'Developer Tools',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    label: 'Toggle DevTools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                }
            ]
        });
    }
    return mainMenuTemplate;
}
