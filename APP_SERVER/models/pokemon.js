const mongoose = require('mongoose');

//Model for stats schema
const statsSchema = new mongoose.Schema({
    hp: {
        type: Number,
        required: true
    },
    weakness: {
        type: String,
        required: true
    }
});

//Model for pokemon schema
const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stats: [statsSchema],
    owner: {
        type: String,
        required: true
    },
    season: {
        type: Number,
        required: true
    }
});

//Compiling pokemon model
mongoose.model('Pokemon', pokemonSchema);