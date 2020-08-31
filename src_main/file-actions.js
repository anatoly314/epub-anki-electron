import { app, protocol, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
import fs from "fs";
import pify from 'pify';

export async function openBook(){
    const window = BrowserWindow.getFocusedWindow();

    try {
        const result = await pify(dialog.showOpenDialog(window, { properties: ['openFile'] }));
        const filename = result.filePaths[0];
        const fileData = fs.readFileSync(filename, 'binary');
        window.webContents.send('open-file-reply', {
            filename: filename,
            fileData: fileData
        });
    } catch (e) {
        console.log('ERROR: main | open-file-dialog | Could not get file path')
    }
}
