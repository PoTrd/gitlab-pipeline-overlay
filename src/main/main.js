const { app, ipcMain } = require('electron');
const path = require('path');
const { createMainWindow, getMainWindow } = require('./windowsManager');
require('./ipcHandlers/pipelineRepository');
require('./ipcHandlers/debugRepository');
require('./ipcHandlers/configRepository');

ipcMain.handle('CLOSE_WINDOW', () => {
    const win = getMainWindow();
    win?.close();
});

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
