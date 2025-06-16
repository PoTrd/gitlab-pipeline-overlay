const { ipcMain } = require('electron');
const { saveConfig } = require('../services/config.service');

ipcMain.handle('SAVE_CONFIG', async (_event, config) => {
    saveConfig(config);
    await reloadToOverlay();
});