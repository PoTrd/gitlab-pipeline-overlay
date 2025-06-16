const { ipcMain } = require('electron');
const { getConfig } = require('../services/config.service');
const { fetchPipelines } = require('../services/pipeline.service');

ipcMain.handle('FETCH_PIPELINES', async () => {
    const config = await getConfig();
    return await fetchPipelines(config);
});