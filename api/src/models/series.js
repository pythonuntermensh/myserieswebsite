const { Schema, model } = require('mongoose');

const SeriesSchema = new Schema(
    {
        kinopoisk_id: {
            type: Number,
            required: true,
            unique: true,
            dropDups: true
        },
        name: {
            type: String,
            required: true
        },
        original_name: { 
            type: String, 
            required: true
        },
        picture_url: { 
            type: String, 
            required: true
        },
        url: { 
            type: String, 
            required: true
        },
        seasons_number: { 
            type: Number, 
            default: 1
        },
        episodes_number: { 
            type: Number, 
            default: 0
        },
        kinopoisk_rate: {
            type: String, 
            required: false
        },
        imdb_rate: { 
            type: String, 
            required: false
        },
        status: { 
            type: Boolean, 
            default: false
        },
        years: { 
            type: String, 
            required: false
        },
        country: { 
            type: String, 
            required: false
        },
        genre: {
            type: String, 
            required: false
        },
        tv: { 
            type: String, 
            required: false
        },
        slogan: { 
            type: String, 
            required: false
        },
        actors: [
            { 
                type: String, 
                required: false
            }
        ],
        director: { 
            type: String, 
            required: false
        },
        plot: { 
            type: String, 
            required: false
        },
        producer: { 
            type: String, 
            required: false
        },
        operator: { 
            type: String, 
            required: false
        },
        operator: { 
            type: String, 
            required: false
        },
        compositor: { 
            type: String, 
            required: false
        },
        artist: { 
            type: String, 
            required: false
        },
        editor: { 
            type: String, 
            required: false
        },
        release: { 
            type: String, 
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Series = model('Series', SeriesSchema);
module.exports = Series;