const { ipcMain } = require('electron');
const { deleteConfig } = require('../../shared/services/config.service');

ipcMain.handle('DELETE_CONFIG', async () => {
    await deleteConfig();
});