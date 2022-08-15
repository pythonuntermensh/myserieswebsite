module.exports = {
    episodes: async (series, args, { models }) => {
        return await models.Episode.find({ series: series._id }).sort({ _id: -1 });
    }
};