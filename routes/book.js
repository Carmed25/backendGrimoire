const express = require('express');
const router = express.Router();

const bookCtrl = require ('../controllers/book');

router.post('/', bookCtrl.createBook);

router.put('/:id', bookCtrl.modifyBook);

router.delete('/:id', bookCtrl.deleteBook);

//route dynamique grace à :id et on veut trouver le livre qui a le meme id qu'avec le params
router.get ('/:id', bookCtrl.getOneBook);


//renvoie tous les books dans la base de données
router.get('/', bookCtrl.getAllBooks);

module.exports = router;