const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getPipelines: () => ipcRenderer.invoke('FETCH_PIPELINES'),
    saveConfig: (config) => ipcRenderer.invoke('SAVE_CONFIG', config),
    deleteConfig: () => ipcRenderer.invoke('DELETE_CONFIG'),
    closeWindow: () => ipcRenderer.invoke('CLOSE_WINDOW'),
});