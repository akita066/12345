require('dotenv').config();

const config = {
    targetHost: process.env.TARGET_HOST,
    webhookUrl: process.env.DISCORD_WEBHOOK_URL,
    checkInterval: parseInt(process.env.CHECK_INTERVAL) || 60000, // 60 seconds
};

if (!config.targetHost || !config.webhookUrl) {
    throw new Error('Missing required environment variables. Please check your .env file');
}

module.exports = config;