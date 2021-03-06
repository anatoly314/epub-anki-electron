'use strict'
import { app, protocol, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import path from 'path';
import { initSqlite } from "./sqlite";
initSqlite();

import { createMenuTemplate } from "./menu";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let menu;

function __changeModeCallback(mode) {
  const navigationRequest = {
    name: mode.__route
  };

  menu.getMenuItemById('file-open-epub').enabled = mode.__route === 'epub';
  win.webContents.send('route-change-request', navigationRequest);
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app', privileges: {
    secure: true,
      standard: true
    }
  }
])

function registerMdFileProtocol(){
  console.log('registered');
  protocol.registerBufferProtocol("md-file", function (request, callback){
    console.log("md-file", request);
  })
}


async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools()
    }
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  });

  const menuTemplate = createMenuTemplate(__changeModeCallback);
  menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    await createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  registerMdFileProtocol();
  await createWindow();
})

ipcMain.on('open-file-dialog', (event) => {
  const window = BrowserWindow.getFocusedWindow();
  console.log('open-file-dialog');
  dialog.showOpenDialog(window, { properties: ['openFile'] })
      .then(result => {
        // Send the path back to the renderer
        const filename = result.filePaths[0];
        event.sender.send('open-file-dialog-reply', { file: filename })
      })
      .catch(error => {
        console.log('ERROR: main | open-file-dialog | Could not get file path')
      })
});


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
