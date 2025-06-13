const { ipcMain } = require('electron');
const { fetchLatestPipelines } = require('../services/gitlabService');

ipcMain.handle('fetch-pipelines', async (_, apiKey, projectId, gitlabUrl) => {
    return fetchLatestPipelines(apiKey, projectId, gitlabUrl);
});
