const axios = require('axios').default;
const list = require('./list');

for(let i = 0; i < list.length; i++) {
    sendReq(list[i]);
}

async function sendReq(link) {
    axios.get(link).then(() => {
        console.log(link);
        sendReq(link);
    }).catch(err => {});
}