import { app, protocol, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
import fs from "fs";

export function openBook(){
    const window = BrowserWindow.getFocusedWindow();
    dialog.showOpenDialog(window, { properties: ['openFile'] })
        .then(result => {
            // Send the path back to the renderer
            const filename = result.filePaths[0];
            const fileData = fs.readFileSync(filename, 'binary');
            window.webContents.send('open-file-reply', {
                filename: filename,
                fileData: fileData
            });
        })
        .catch(error => {
            console.log('ERROR: main | open-file-dialog | Could not get file path')
        })
}
