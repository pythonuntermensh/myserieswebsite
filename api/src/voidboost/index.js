const fetch = require('node-fetch');
require('dotenv').config();

const { serials, episodes } = require("../resolvers/query");
const { newEpisode, newEpisodeTranslate } = require("../resolvers/mutation");


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getUpdates = async (page=1) => {
  try {
    const res = await fetch(process.env.API_URL + "/updates" + "?apikey=" + process.env.VOIDBOOST_TOKEN + "&page=" + page);
    //const headerDate = res.headers && res.headers.get('date') ? res.headers.get('date') : 'no response date';
    //console.log('Status Code:', res.status);
    //console.log('Date in Response header:', headerDate);

    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};

const getSeriesInfo = async (kinopoisk_id) => {
    try {
        const res = await fetch(process.env.API_URL + "/info" + "?apikey=" + process.env.VOIDBOOST_TOKEN + "&kp_id=" + kinopoisk_id);
        //const headerDate = res.headers && res.headers.get('date') ? res.headers.get('date') : 'no response date';
        //console.log('Status Code:', res.status);
        //console.log('Date in Response header:', headerDate);

        return await res.json();
      } catch (err) {
        console.log(err.message);
      }
};

const main = async (models, func) => {
    func();
    cash = []
    while (true) {
        try {
            var updates = getUpdates();

            updates.then((updates) => {
                const filteredUpdates = updates.results.list.filter(e => e.category === 'tv');
                const difference = filteredUpdates.filter(({ id: _id1 }) => !cash.some(({ id: _id2 }) => _id2 === _id1));
                cash.push(...difference);

                const serialsAccepted = serials(NaN, NaN, { models: models });
                serialsAccepted.then(serialsAccepted => {
                    const newEpisodes = difference.filter(({ kinopoisk_id: _id1 }) => serialsAccepted.some(({ kinopoisk_id: _id2 }) => _id2 == _id1));
                    
                    var newFilteredEpisodes = []
                    newEpisodes.forEach(episode => {
                        if (newFilteredEpisodes.find(e => {
                            return e.kinopoisk_id == episode.kinopoisk_id &&
                            e.season_number == episode.season &&
                            e.episode_number == episode.episode }) == undefined)
                            {
                            newFilteredEpisodes.push({
                                description: episode.season + " сезон " + episode.episode + " серия",
                                url: episode.url,
                                translates: [episode.translator_name],
                                episode_number: episode.episode,
                                season_number: episode.season,
                                kinopoisk_id: episode.kinopoisk_id
                            });
                        } else {
                            const index = newFilteredEpisodes.findIndex(e => {
                                return e.kinopoisk_id == episode.kinopoisk_id &&
                                e.season_number == episode.season &&
                                e.episode_number == episode.episode });
                            newFilteredEpisodes[index].translates.push(episode.translator_name);
                        }
                    });

                    newFilteredEpisodes.forEach(episode => {
                        models.Episode.exists({
                            kinopoisk_id: episode.kinopoisk_id,
                            season_number: episode.season_number,
                            episode_number: episode.episode_number
                        }).then(episodeExists => {
                            if (episodeExists) {
                                newEpisodeTranslate(NaN, episode, { models: models });
                            } else {
                                newEpisode(NaN, episode, { models: models });
                            }
                        });
                    });
                });
            });
        } catch (err) {
            console.log("[ERROR] " + err.message);
        }
        
        await sleep(300000);
    }
};

module.exports = { main, getSeriesInfo };
