const { ipcMain } = require('electron');
const { getConfig } = require('../../shared/services/config.service');
const { fetchPipelines } = require('../../shared/services/pipeline.service');

ipcMain.handle('FETCH_PIPELINES', async () => {
    const config = await getConfig();
    return await fetchPipelines(config);
});