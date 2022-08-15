const fetch= require('node-fetch');
require('dotenv').config();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getUpdates = async () => {
  try {
    const res = await fetch(process.env.API_URL + "?apikey=" + process.env.VOIDBOOST_TOKEN);
    const headerDate = res.headers && res.headers.get('date') ? res.headers.get('date') : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);

    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

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

var cash = [];

const main = async () => {
    while (true) {
        var updates = getUpdates();

        updates.then((updates) => {
            const filteredUpdates = updates.results.list.filter(e => e.category === 'tv');
            console.log(filteredUpdates);
            const difference = filteredUpdates.filter(({ id: _id1 }) => !cash.some(({ id: _id2 }) => _id2 === _id1));
            cash.push(...difference);
            console.log(difference);
        });
        await sleep(30000);
    }
};

main();

