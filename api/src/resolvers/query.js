module.exports = {
    episodes: async (parent, args, { models }) => {
        return await models.Episode.find();//.limit(100);
    },
    episode: async (parent, args, { models }) => {
        return await models.Drink.findById(args.id);
    },
    episodeFeed: async (parent, { cursor }, { models }) => {
        const limit = 12;
        let hasNextPage = false;
        let cursorQuery = {};

        if (cursor) {
            cursorQuery = { _id: { $lt: cursor } } ;
        }

        let episodes = await models.Episode.find(cursorQuery)
            .sort({ _id: -1 })
            .limit(limit + 1);

        if (episodes.length > limit) {
            hasNextPage = true;
            episodes = episodes.slice(0, -1);
        }

        if (episodes.length < 1) {
            throw new Error('No episodes found');
        } 

        const newCursor = episodes[episodes.length - 1]._id;

        return {
            episodes,
            cursor: newCursor,
            hasNextPage
        };

    },
    newEpisodes: async(parent, args, { models }) => {
        return await models.Episode.find({}).sort({ createdAt: 1 })
    },
    series: async (parent, args, { models }) => {
        return await models.Series.findOne({ kinopoisk_id: args.kinopoisk_id });
    },
    serials: async (parent, args, { models }) => {
        return await models.Series.find().limit(100);
    }
};