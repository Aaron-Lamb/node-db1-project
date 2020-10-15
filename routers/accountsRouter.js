const express = require('express');
const database = require('../data/dbConfig');
const {validateAccount, validateAccountID} = require('../middleware/accountsMiddleware');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const accounts = await database.select('*').from('accounts');
        return res.status(200).json(accounts);
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        return res.status(200).json(await validateAccountID(req.params.id));
    } catch (error) {
        next(error)
    }
})

module.exports = router;