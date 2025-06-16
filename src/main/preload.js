const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getPipelines: () => ipcRenderer.invoke('FETCH_PIPELINES'),
    logger: (message) => ipcRenderer.invoke('LOG_MESSAGE', message),
    saveConfig: (config) => ipcRenderer.invoke('SAVE_CONFIG', config),
    deleteConfig: () => ipcRenderer.invoke('DELETE_CONFIG'),
    closeWindow: () => ipcRenderer.invoke('CLOSE_WINDOW'),
});