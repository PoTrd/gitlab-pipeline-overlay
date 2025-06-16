const LEVELS = {
    debug: { color: 'color: #888', label: 'DEBUG' },
    info:  { color: 'color: #66ccff', label: 'INFO' },
    warn:  { color: 'color: #ffcc00', label: 'WARN' },
    error: { color: 'color: #ff5555', label: 'ERROR' }
};

const ENABLE_DEBUG = window.env?.DEBUG === 'true';

function log(level, ...args) {
    if (level === 'debug' && !ENABLE_DEBUG) return;
    const { color, label } = LEVELS[level] || LEVELS.info;
    const timestamp = new Date().toLocaleTimeString();
    console.log(`%c[${label}] [${timestamp}]`, color, ...args);
}

export const Logger = {
    debug: (...args) => log('debug', ...args),
    info:  (...args) => log('info', ...args),
    warn:  (...args) => log('warn', ...args),
    error: (...args) => log('error', ...args)
};
