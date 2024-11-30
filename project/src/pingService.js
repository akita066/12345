const ping = require('ping');

async function checkHost(host) {
    try {
        const result = await ping.promise.probe(host, {
            timeout: 10,
        });
        
        return {
            isAlive: result.alive,
            time: result.time,
            error: result.error
        };
    } catch (error) {
        return {
            isAlive: false,
            time: null,
            error: error.message
        };
    }
}

module.exports = { checkHost };