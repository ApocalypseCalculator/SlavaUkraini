const axios = require('axios').default;
const useragent = require('user-agents');
const list = require('./list');

const userAgent = new useragent().toString();

for(let i = 0; i < list.length; i++) {
    sendReq(list[i]);
}

async function sendReq(link) {
    axios.get(link, {
        headers: {
            'User-Agent': userAgent
        }
    }).then(() => {
        process.send(link);
        sendReq(link);
    }).catch(err => {});
}
