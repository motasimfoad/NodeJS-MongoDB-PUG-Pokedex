const mongoose = require('mongoose');
const Pokemon = mongoose.model('Pokemon');

//Function to get pokemons
const getPokemons = function (req, res) {
    Pokemon.find().exec(function(err, pokemondata){
        if (err) {
            res
                .status(404)
                .json(err);
        return;
        }
        res
            .status(200)
            .json(pokemondata);
    });
};

//Function to get single pokemon
const getSinglePokemon = function (req, res) {
    Pokemon
    .findById(req.params.pokemonid)
    .exec((err, pokedata) => {
      if (!pokedata) {
        return res
          .status(404)
          .json({
            "message": "pokedata not found"
          });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      }
      res
        .status(200)
        .json(pokedata);
     });
};

//Function to create pokemon
const createPokemon = function (req, res) {
    Pokemon.create({
        name: req.body.name,
        type: req.body.type,
        image: req.body.image,
        owner: req.body.owner,
        season: req.body.season,
        stats: {
                hp: req.body.hp,
                weakness: req.body.weakness
            }
    }, (err, pokedata) => {
        console.log("pokedata:", err);
        if(err){
            res
                 .status(400)
                 .json(err);
        } else {
            res
                 .status(201)
                 .json(pokedata);
        }
    });
};

//Function to update pokemon
const updatePokemon = function (req, res) {
    if (!req.params.pokemonid) {
        res
            .status(404)
            .json({
                "message": "pokemonid is required"
            });
    return;
    }
    Pokemon.findById(req.params.pokemonid)
        .exec((err, pokedata) => {
            if (!pokedata) {
                res
                    .status(404)
                    .json({
                        "message" : "pokemonid not found"
                    });
            return;
            } else if (err) {
                res
                    .status(400)
                    .json(err);
                    return;
            }
            pokedata.name = req.body.name;
            pokedata.type = req.body.type;
            pokedata.image = req.body.image;
            pokedata.owner = req.body.owner;
            pokedata.season = req.body.season;
            pokedata.stats = {
                    hp: req.body.hp,
                    weakness: req.body.weakness
                }
            pokedata.save((err, pokedata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(pokedata);
                }
            });
        });
};

//Function to delete pokemon
const deletePokemon = function (req, res) {
    const pokemonid = req.params.pokemonid;
    if (pokemonid) {
        Pokemon
            .findByIdAndRemove(pokemonid)
            .exec((err, pokedata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                return;
                }
            res
                .status(204)
                .json(null);
            });
        
    } else {
        res
            .status(404)
            .json({"message" : "No pokemonid"});
    }
};

//Exporting functions
module.exports = {
    getPokemons,
    getSinglePokemon,
    createPokemon,
    updatePokemon,
    deletePokemon
} 

