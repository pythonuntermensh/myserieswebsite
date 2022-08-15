const { ForbiddenError } = require('apollo-server-express');
const getKinopoiskInfo = require('../kinopoisk.dev');
const { getSeriesInfo } = require('../voidboost');
require('dotenv').config();


const mutations = {
    newEpisode: async (parent, args, { models }) => {
        const result = await models.Episode.find({
            kinopoisk_id: args.kinopoisk_id,
            season_number: args.season_number,
            episode_number: args.episode_number
        });

        if (result.length > 0) {
            return;
        }

        var default_picture_url;
        const model = await models.Episode.create({
            series: await models.Series.findOne({ kinopoisk_id: args.kinopoisk_id })
                .then(obj => {
                    default_picture_url = obj.picture_url;
                    return obj.id;
                })
                .catch(err => {
                    throw new ForbiddenError('Wrong kinopoisk id param!');
                }),
            description: args.description,
            picture_url: default_picture_url,
            url: args.url,
            translates: [...args.translates],
            episode_number: args.episode_number,
            season_number: args.season_number,
            kinopoisk_id: args.kinopoisk_id,
        });
    
        await models.Series.findOneAndUpdate(
            { kinopoisk_id: args.kinopoisk_id },
            {
                $addToSet: {
                    episodes: model.id
                },
                $inc : {
                    episodes_number : 1
                }
            }
        );

        return model;
    },
    deleteEpisode: async (parent, args, { models }) => {
        try {
            await models.Episode.findOneAndRemove({ _id: args.id });
    
            await models.Series.findByIdAndUpdate(
                series.id,
                {
                    $pull: {
                        episodes: args.id
                    }
                }
            );

            return true;
        } catch (err) {
            return false;
        }
    },
    newEpisodeTranslate: async (parent, args, { models }) => {
        try {
            await models.Episode.findOneAndUpdate(
                { 
                    kinopoisk_id: args.kinopoisk_id, 
                    season_number: args.season_number, 
                    episode_number: args.episode_number  
                },
                {
                    $addToSet: {
                        translates: {...args.translates}
                    }
                }
            );

            return true;
        } catch (err) {
            return false;
        }
    },
    newSeries: async (parent, args, { models }) => {
        try {
            return await models.Series.create({
                kinopoisk_id: args.kinopoisk_id,
                name: args.name,
                original_name: args.original_name,
                picture_url: args.picture_url,
                episodes: [],
                seasons_number: 0,
                episodes_number: 0,
                kinopoisk_rate: args.kinopoisk_rate,
                imdb_rate: args.imdb_rate,
                rate: args.rate,
                status: args.status,
                years: args.years,
                country: args.country,
                genre: args.genre, 
                tv: args.tv,
                slogan: args.slogan,
                actors: args.actors,
                director: args.director,
                plot: args.plot,
                producer: args.producer,
                operator: args.operator,
                compositor: args.compositor,
                artist: args.artist,
                editor: args.editor,
                release: args.release
            });
        } catch (err) {
            console.log(err);
            throw new ForbiddenError("The series is already uploaded!");
        }
    },
    newSeriesWithId: async (parent, args, { models }) => {
        try {
            models.Series.exists({ kinopoisk_id: args.kinopoisk_id })
            .then(exists => {
                if (exists) {
                    return;
                }
                getSeriesInfo(args.kinopoisk_id)
                .then(async (infoResponse) => {
                    const episodesInfo = infoResponse.results[0];
                    let info = {};
                    await models.Series.create({
                        kinopoisk_id: await getKinopoiskInfo(args.kinopoisk_id)
                            .then(res => {
                                info = res;
                                return args.kinopoisk_id;
                            }),
                        name: info.name,
                        original_name: info.alternativeName || info.name,
                        picture_url: info.poster.url,
                        episodes: [],
                        url: episodesInfo.url
                    }).then(async() => {
                        var episodes = [];
                        var seasons_number = 1;
                        episodesInfo.videos.forEach(translateInfo => {
                            translateInfo.list.forEach(seasonInfo => {
                                Object.keys(seasonInfo.episodes).forEach(episodeNumber => {
                                    episodes.push({
                                        kinopoisk_id: args.kinopoisk_id,
                                        description: episodesInfo.title + " " + seasonInfo.season + " сезон " + episodeNumber + " серия",
                                        url: episodesInfo.url + "?s=" + seasonInfo.season + "&e=" + episodeNumber,
                                        translate: translateInfo.translator_name,
                                        season_number: seasonInfo.season,
                                        episode_number: episodeNumber
                                    });
                                });
                            });
                            if (translateInfo.list.length > seasons_number) {
                                seasons_number = translateInfo.list.length;
                            }
                        });

                        var filteredEpisodes = []
                        episodes.forEach(episode => {
                            if (filteredEpisodes.find(e => {
                                return e.kinopoisk_id == episode.kinopoisk_id &&
                                e.season_number == episode.season_number &&
                                e.episode_number == episode.episode_number }) == undefined)
                                {
                                filteredEpisodes.push({
                                    description: episode.description,
                                    url: episode.url,
                                    translates: [episode.translate],
                                    episode_number: episode.episode_number,
                                    season_number: episode.season_number,
                                    kinopoisk_id: episode.kinopoisk_id
                                });
                            } else {
                                const index = filteredEpisodes.findIndex(e => {
                                    return e.kinopoisk_id == episode.kinopoisk_id &&
                                    e.season_number == episode.season_number &&
                                    e.episode_number == episode.episode_number });
                                filteredEpisodes[index].translates.push(episode.translate);
                            }
                        });

                        filteredEpisodes.forEach(episode => {
                            models.Episode.exists({
                                kinopoisk_id: episode.kinopoisk_id,
                                season_number: episode.season_number,
                                episode_number: episode.episode_number
                            }).then(episodeExists => {
                                if (episodeExists) {
                                    mutations.newEpisodeTranslate(NaN, episode, { models: models });
                                } else {
                                    mutations.newEpisode(NaN, episode, { models: models });
                                }
                            });
                        });

                        await models.Series.findOneAndUpdate(
                            { kinopoisk_id: args.kinopoisk_id },
                            {
                                seasons_number: seasons_number
                            }
                        );
                    });
                });
            });
            
        } catch (err) {
            console.log(err);
            throw new ForbiddenError("The series is already uploaded!");
        }
    },
    deleteSeries: async (parent, args, { models }) => {
        //const series = await models.Series.findById(args.id);
        try {
            await models.Series.findOneAndRemove({ _id: args.id });
    
            //сделать удаление всех серий сериала ыыы
    
            return true;
        } catch (err) {
            return false;
        }
    }
};

module.exports = mutations;