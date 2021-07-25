var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.index);
router.route('/add_pokemon')
      .get(ctrlMain.addNewPokemon)
      .post(ctrlMain.doAddNewPokemon);
      
/* GET about page. */
router.get('/about', ctrlMain.about);

/* GET list page. */
router.get('/list', ctrlMain.list);

/* GET detailed view page. */
router.get('/pokemons/:pokemonid', ctrlMain.display);

/* exporting router using module.export. */
module.exports = router;
