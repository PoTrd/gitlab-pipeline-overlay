const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    fetchPipelines: (apiKey, projectId, gitlabUrl) => ipcRenderer.invoke('fetch-pipelines', apiKey, projectId, gitlabUrl),
    closeWindow: () => ipcRenderer.send('close-window'),
    saveConfig: (config) => ipcRenderer.send('save-config', config),
    deleteConfig: () => ipcRenderer.invoke('delete-config'),
    unlockToken: (secret) => ipcRenderer.send('unlock-token', secret),
});

contextBridge.exposeInMainWorld('env', {
    GITLAB_URL: process.env.GITLAB_URL,
    GITLAB_TOKEN: process.env.GITLAB_TOKEN,
    GITLAB_PROJECT_ID: process.env.GITLAB_PROJECT_ID,
    USE_MOCK: process.env.USE_MOCK || 'false',
    DEBUG: process.env.DEBUG || 'false'
});
