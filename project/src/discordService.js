const fetch = require('node-fetch');

async function sendDiscordMessage(webhookUrl, message) {
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: message
            }),
        });

        if (!response.ok) {
            throw new Error(`Discord API responded with status ${response.status}`);
        }
    } catch (error) {
        console.error('Failed to send Discord message:', error);
    }
}

module.exports = { sendDiscordMessage };