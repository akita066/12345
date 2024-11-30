const { checkHost } = require('./pingService');
const { sendDiscordMessage } = require('./discordService');
const config = require('./config');

let lastStatus = null;

async function monitor() {
    const result = await checkHost(config.targetHost);
    const timestamp = new Date().toISOString();
    
    // Only send message if status changes or if there's an error
    if (lastStatus === null || lastStatus !== result.isAlive || !result.isAlive) {
        const status = result.isAlive ? '🟢 Online' : '🔴 Offline';
        const message = `[${timestamp}] ${config.targetHost} is ${status}\n` +
            `Response time: ${result.isAlive ? `${result.time}ms` : 'N/A'}` +
            (result.error ? `\nError: ${result.error}` : '');
            
        await sendDiscordMessage(config.webhookUrl, message);
    }
    
    lastStatus = result.isAlive;
}

// Initial check
monitor();

// Schedule regular checks
setInterval(monitor, config.checkInterval);

console.log(`Monitor started for ${config.targetHost}`);