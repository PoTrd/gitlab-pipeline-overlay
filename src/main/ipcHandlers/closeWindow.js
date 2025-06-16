const { ipcMain } = require('electron');

ipcMain.handle('CLOSE_WINDOW', () => {
    require('electron').BrowserWindow.getFocusedWindow()?.close();
});