const express = require('express');
const router = express.Router();
// Import pokemon.js from controller
const ctrlPokemon = require('../controllers/pokemon');

// Router for get and create pokemon entries
router.route('/pokemons')
      .get(ctrlPokemon.getPokemons)
      .post(ctrlPokemon.createPokemon);

// Router for delete, update and get information for a single pokemon
router.route('/pokemons/:pokemonid')
      .get(ctrlPokemon.getSinglePokemon)
      .put(ctrlPokemon.updatePokemon)
      .delete(ctrlPokemon.deletePokemon); 

//Exporting router
module.exports = router;