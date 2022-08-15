const fetch = require('node-fetch');
require('dotenv').config();

const getKinopoiskInfo = async (id) => {
    if (!id) {
        throw "Error: No series id!";
    }

    try {
        const res = await fetch(process.env.KINOPOISK_API_URL + "/movie/" + "?token=" + process.env.KINOPOISK_TOKEN + "&search=" + String(id) + "&field=id");
        const headerDate = res.headers && res.headers.get('date') ? res.headers.get('date') : 'no response date';
        console.log('Status Code:', res.status);
        console.log('Date in Response header:', headerDate);

        return await res.json();
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = getKinopoiskInfo;