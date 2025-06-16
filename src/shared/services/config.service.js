const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const crypto = require('crypto');

const configDir = app.getPath('userData');
const configFile = path.join(configDir, 'secureConfig.json');

const algorithm = 'aes-256-cbc';
const secret = 'a-strong-secret-key';
const key = crypto.scryptSync(secret, 'salt', 32);
const iv = Buffer.alloc(16, 0);

function encrypt(data) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]).toString('hex');
}

function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encrypted, 'hex')),
        decipher.final()
    ]);
    return JSON.parse(decrypted.toString());
}

function saveConfig(data) {
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }
    fs.writeFileSync(configFile, encrypt(data), 'utf-8');
    console.log('Configuration saved successfully in secureConfig.json, path:', configDir);
}

function getConfig() {
    if (!fs.existsSync(configFile)) return null;
    try {
        const content = fs.readFileSync(configFile, 'utf-8');
        return decrypt(content);
    } catch (e) {
        return null;
    }
}

function deleteConfig() {
    if (fs.existsSync(configFile)) fs.unlinkSync(configFile);
}

module.exports = {
    saveConfig,
    getConfig,
    deleteConfig,
};
