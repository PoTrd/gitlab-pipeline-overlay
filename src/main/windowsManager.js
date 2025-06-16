const { BrowserWindow } = require('electron');
const path = require('path');
const { getConfig } = require('../shared/services/config.service');

let mainWindow = null;

const createMainWindow = async () => {
    const config = await getConfig();
    const view = config ? 'overlay/overlay.view.html' : 'config/config.view.html';

    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    await mainWindow.loadFile(path.join(__dirname, `../renderer/views/${view}`));
};

const reloadToOverlay = async () => {
    if (!mainWindow) return;
    await mainWindow.loadFile(path.join(__dirname, '../renderer/views/overlay/overlay.view.html'));
};

const reloadToConfig = async () => {
    if (!mainWindow) return;
    await mainWindow.loadFile(path.join(__dirname, '../renderer/views/config/config.view.html'));
    };

const getMainWindow = () => mainWindow;

module.exports = {
    createMainWindow,
    reloadToOverlay,
    reloadToConfig,
    getMainWindow
};
