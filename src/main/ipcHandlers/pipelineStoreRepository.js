const { ipcMain } = require("electron");
const pipelineStore = require("../../renderer/store/pipeline.store");

ipcMain.handle("GET_LST_PIPELINES", async () => {
    return pipelineStore.getPipelines();
});

ipcMain.handle("GET_PIPELINE", async (event, pipelineId) => {
    return pipelineStore.getPipelinebyId(pipelineId);
});

ipcMain.handle("SET_LST_PIPELINES", async (event, pipelines) => {
    return pipelineStore.setPipelines(pipelines);
});

ipcMain.handle("REMOVE_PIPELINE", async (event, pipelineId) => {
    return pipelineStore.removePipeline(pipelineId);
});

