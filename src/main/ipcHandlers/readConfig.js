const { ipcMain } = require('electron');
const configService = require('../services/config.service');
const { IPC_CHANNELS } = require('../../shared/ipcChannels');

ipcMain.handle(IPC_CHANNELS.READ_CONFIG, async () => {
    try {
        const config = await configService.getConfig();
        return { success: true, data: config };
    } catch (err) {
        return { success: false, error: err.message };
    }
});
