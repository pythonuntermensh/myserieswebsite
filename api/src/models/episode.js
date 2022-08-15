const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const EpisodeSchema = new mongoose.Schema(
    {
        series: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Series',
            required: true
        },
        description: {
            type: String,
            required: true
        },
        picture_url: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
        },
        translates: [
            {
                type: String,
                required: true
            }
        ],
        episode_number: {
            type: Number,
            required: true
        },
        season_number: {
            type: Number, 
            required: true
        },
        kinopoisk_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

EpisodeSchema.plugin(AutoIncrement, {inc_field: 'number_id'});

const Episode = mongoose.model('Episode', EpisodeSchema);
module.exports = Episode;