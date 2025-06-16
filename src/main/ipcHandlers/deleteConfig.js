const { ipcMain } = require('electron');
const { deleteConfig } = require('../services/config.service');

ipcMain.handle('DELETE_CONFIG', async () => {
    await deleteConfig();
});