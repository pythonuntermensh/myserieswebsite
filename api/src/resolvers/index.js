const Query = require('./query');
const Mutation = require('./mutation');
const Series = require('./series');
const Episode = require('./episode');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
    Query,
    Mutation,
    Series,
    Episode,
    DateTime: GraphQLDateTime
};
