const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
    width: 300,
    height: 150,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    webPreferences: {
        nodeIntegration: true,  // Pour accéder à require() dans renderer (dev uniquement)
        contextIsolation: false
    }
    });

    win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(createWindow);
