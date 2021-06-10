const express = require('express');
const router = express.Router();

const {getCards} = require('../controllers/cardController')
const {deleteCard} = require('../controllers/cardController')
const {createCard} = require('../controllers/cardController')
const {likeCard} = require('../controllers/cardController')
const {dislikeCard} = require('../controllers/cardController')



router.get('/cards', getCards)
router.post('/cards', createCard)
router.delete('/cards/:cardId', deleteCard)
router.put('/cards/:cardId/likes', likeCard)
router.delete('/cards/:cardId/likes', dislikeCard)

module.exports = router;
//