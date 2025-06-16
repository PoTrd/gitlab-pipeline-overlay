const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    closeWindow: () => ipcRenderer.invoke('CLOSE_WINDOW'),
});

contextBridge.exposeInMainWorld('api_pipelines', {
    fetchPipelines: () => ipcRenderer.invoke('FETCH_PIPELINES'),
    fetchRunningPipelines: () => ipcRenderer.invoke('FETCH_RUNNING_PIPELINES'),
    fetchPipeline: (pipelineId) => ipcRenderer.invoke('FETCH_PIPELINE', pipelineId),
});

contextBridge.exposeInMainWorld('api_config', {
    saveConfig: (config) => ipcRenderer.invoke('SAVE_CONFIG', config),
    deleteConfig: () => ipcRenderer.invoke('DELETE_CONFIG'),
});

contextBridge.exposeInMainWorld('api_debug', {
    info: (message) => ipcRenderer.invoke('LOG_INFO', message),
    debug: (message) => ipcRenderer.invoke('LOG_DEBUG', message),
    warn: (message) => ipcRenderer.invoke('LOG_WARN', message),
    error: (message) => ipcRenderer.invoke('LOG_ERROR', message),
});