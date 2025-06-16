const { ipcMain } = require('electron');
const configService = require('../../shared/services/config.service');
const windowsManager = require('../windowsManager');

ipcMain.handle('SAVE_CONFIG', async (_event, config) => {
    configService.saveConfig(config);
    await windowsManager.navigateTo('overlay');
});

ipcMain.handle('READ_CONFIG', async () => {
    try {
        const config = await configService.getConfig();
        return { success: true, data: config };
    } catch (err) {
        return { success: false, error: err.message };
    }
});

ipcMain.handle('DELETE_CONFIG', async () => {
    await configService.deleteConfig();
    const win = windowsManager.getMainWindow();
    if (win) {
        await win.close();
    }
});