import { app } from 'electron'

import { openBook } from "./file-actions";

export function createMenuTemplate (changeModeCallback) {

    const mainMenuTemplate = [
        // Each object is a dropdown
        {
            label: 'File',
            submenu: [
                {
                    id: 'file-open-epub',
                    label: 'Open epub',
                    async click() {
                        console.log('add item');
                        await openBook();
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
        },{
            label: 'Mode',
            submenu: [{
                label: 'Epub',
                checked: true,
                type: 'radio',
                click: changeModeCallback,
                __route: 'epub'
            },{
                label: 'Markdown',
                type: 'radio',
                click: changeModeCallback,
                __route: 'markdown'

            }]
        }, {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
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
