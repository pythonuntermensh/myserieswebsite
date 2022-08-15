module.exports = {
    series: async (episode, args, { models }) => {
        return await models.Series.findById(episode.series);
    }
} 