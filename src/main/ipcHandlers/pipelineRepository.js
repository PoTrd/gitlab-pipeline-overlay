const { ipcMain } = require('electron');
const { getConfig } = require('../../shared/services/config.service');
const { fetchPipelines, fetchRunningPipelines, fetchPipeline } = require('../../shared/services/pipeline.service');

ipcMain.handle('FETCH_PIPELINES', async () => {
    const config = await getConfig();
    return await fetchPipelines(config);
});

ipcMain.handle('FETCH_RUNNING_PIPELINES', async () => {
    const config = await getConfig();
    return await fetchRunningPipelines(config);
});

ipcMain.handle('FETCH_PIPELINE', async (event, pipelineId) => {
    const config = await getConfig();
    return await fetchPipeline(config, pipelineId);
});