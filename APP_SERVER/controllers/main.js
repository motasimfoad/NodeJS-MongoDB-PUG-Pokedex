/* array of Pokemons named pokemon */

require('../models/db');

const { response } = require('express');
const request = require('request');

const apiOptions = {
    server: 'http://localhost:3001'
};

/* for home page */
const index = (req, res) => {
    res.render('index', {title: 'PokeDex', author: 'Motasim Foad'});
};

/* for about page */
const about = (req, res) => {
    res.render('about', {title: 'About PokeDex'});
};

/* for list page */
const list = (req, res) => {
    const path = '/api/pokemons';
    const requestOptions = {
        url : apiOptions.server + path,
        method : 'GET',
        json : {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderPokeList(req, res, body);
        }
    );
};

const _renderPokeList = function (req, res, responseBody) {
    console.log(responseBody);
    res.render('list-display', {pokemon: responseBody})
}

/* for display page */
const display = (req, res) => {
    const path = `/api/pokemons/${req.params.pokemonid}`;
    const requestOptions = {
        url : apiOptions.server + path,
        method: 'GET',
        json : {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderDetailPage(req, res, body);
        }
    );
};

const _renderDetailPage = function (req, res, responseBody) {
    res.render('display', {currentPokemon: responseBody});
    console.log(responseBody);
};

/* for index page */
const _renderCreatePage = function (req, res) {
    res.render('add_pokemon', {
        title: "PokeDex"
    });
};

const addNewPokemon = function(req, res){
    _renderCreatePage(req, res)
};

const doAddNewPokemon = function (req, res) {
    const path = '/api/pokemons';
    const postdata = {
        name: req.body.name,
        type: req.body.type,
        image: req.body.image,
        owner: req.body.owner,
        season: req.body.season,
        hp: req.body.hp,
        weakness: req.body.weakness
        // stats: {
        //         hp: req.body.hp,
        //         weakness: req.body.weakness
        //     }
    };

    const requestOptions = {
        url: apiOptions.server+path,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions,
        (err, response, body) => {
            console.log(err);
            if (response.statusCode === 201) {
                res.render('index');
            }
        }
    );
};

/* exporting all the pages using module.export */
module.exports = {
    index,
    about,
    list,
    display,
    doAddNewPokemon,
    addNewPokemon
}