const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const bookCtrl = require ('../controllers/book');

router.post('/', auth, bookCtrl.createBook);
router.post('/:id/rating',auth, bookCtrl.notationBook)
router.put('/:id',auth, bookCtrl.modifyBook);
router.delete('/:id',auth, bookCtrl.deleteBook);
//route dynamique grace à :id et on veut trouver le livre qui a le meme id qu'avec le params
router.get ('/:id', bookCtrl.getOneBook);
//renvoie tous les books dans la base de données
router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.bestRatingBook);

module.exports = router;