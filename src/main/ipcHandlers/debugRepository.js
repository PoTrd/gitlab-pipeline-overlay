const { ipcMain } = require("electron");
const { loggerService } = require("../../shared/services/logger.service");

ipcMain.handle("LOG_INFO", (event, message) => {
    loggerService.info(message);
});

ipcMain.handle("LOG_DEBUG", (event, message) => {
    loggerService.debug(message);
});

ipcMain.handle("LOG_WARN", (event, message) => {
    loggerService.warn(message);
});

ipcMain.handle("LOG_ERROR", (event, message) => {
    loggerService.error(message);
});