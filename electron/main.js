require('dotenv').config();
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');

// let mainWindow;
const configPath = path.join(os.homedir(), 'gitlab-pipeline-overlay-config.json');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        x: 20,
        y: 20,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: true,
        movable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // contextIsolation: true,
            // nodeIntegration: false
        }
    });

    const indexPath = path.resolve(__dirname, '../src/renderer/index.html');
    mainWindow.loadFile(indexPath);

    // Open dev tools if in development mode
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
}

function isConfigExists() {
    return fs.existsSync(configPath);
}

function createConfigWindow() {
    let configWindow = new BrowserWindow({
        width: 400,
        height: 300,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // contextIsolation: true,
            // nodeIntegration: false
        }
    });
    configWindow.loadFile(path.join(__dirname, 'config-page/config.html'));
    return configWindow;
}

ipcMain.on('close-window', () => {
    if (mainWindow) mainWindow.close();
});

ipcMain.handle('delete-config', async () => {
    if (fs.existsSync(configPath)) {
        fs.unlinkSync(configPath);
    }
    app.quit();
});

function encrypt(text, password) {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, 'salt', 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

function decrypt(encrypted, password) {
    const [ivHex, encryptedText] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const key = crypto.scryptSync(password, 'salt', 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Init app
app.whenReady().then(() => {
    if (!isConfigExists()) {
        const configWindow = createConfigWindow();
        // Listen for config save event from renderer
        ipcMain.on('save-config', (event, config) => {
            if (config.apiKey && config.secret) {
                config.apiKey = encrypt(config.apiKey, config.secret);
                delete config.secret;
            }
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            configWindow.close();
            createWindow();
        });
    } else {
        createWindow();
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});