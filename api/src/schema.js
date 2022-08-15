const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar DateTime

    type Episode {
        id: ID!
        number_id: Int!
        series: Series!
        kinopoisk_id: Int!
        description: String!
        picture_url: String!
        url: String!
        translates: [String!]!
        episode_number: Int!
        season_number: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Series {
        id: ID!
        kinopoisk_id: Int!
        name: String!
        original_name: String!
        picture_url: String!
        episodes: [Episode!]!
        url: String!
        seasons_number: Int!
        episodes_number: Int!
        kinopoisk_rate: String
        imdb_rate: String
        status: Boolean
        years: String
        country: String
        genre: String
        tv: String
        slogan: String
        actors: [String!]
        director: String
        plot: String
        producer: String
        operator: String
        compositor: String
        artist: String
        editor: String
        release: String
    }

    type EpisodeFeed {
        episodes: [Episode!]!
        cursor: String!
        hasNextPage: Boolean!
    }

    type Query {
        episodes: [Episode!]!
        episode(id: ID!): Episode!
        episodeFeed(cursor: String): EpisodeFeed
        newEpisodes: [Episode!]!
        serials: [Series!]!
        series(kinopoisk_id: Int!): Series!
    }

    type Mutation {
        newEpisode(kinopoisk_id: Int!, 
            description: String!,  
            url: String!,
            translate: String!, 
            episode_number: Int!, 
            season_number: Int!): Episode
        deleteEpisode(id: ID!): Boolean!
        newEpisodeTranslate(kinopoisk_id: Int!, season_number: Int!, episode_number: Int!): Boolean!
        newSeriesWithId(kinopoisk_id: Int!): Series
        newSeries(kinopoisk_id: Int!,
            name: String!, 
            original_name: String!,
            picture_url: String!,
            url: String!,
            kinopoisk_rate: String,
            imdb_rate: String,
            status: Boolean,
            years: String,
            country: String,
            genre: String,
            tv: String,
            slogan: String,
            actors: [String!],
            director: String,
            plot: String,
            producer: String,
            operator: String,
            compositor: String,
            artist: String,
            editor: String,
            release: String): Series
        deleteSeries(id: ID!): Boolean!
    }
`;