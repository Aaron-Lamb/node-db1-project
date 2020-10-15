const express = require('express');
const database = require('../data/dbConfig');
const {validateAccountID} = require('../middleware/accountsMiddleware');
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

router.post('/', async (req, res, next) => {
    try{
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
    
        if(Object.keys(payload).length === 0){
            return res.status(400).json({
                errorMessage: "Please fill the fields"
            })
        } else if(!payload.name) {
            return res.status(400).json({
                errorMessage: "Please enter a name"
            })
        } else if(!payload.budget) {
            return res.status(400).json({
                errorMessage: "Please enter a budget"
            })
        }

        const [id] = await database.insert(payload).into('accounts');
        return res.status(201).json(await validateAccountID(id))
    } catch(error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        if(Object.keys(payload).length === 0){
            return res.status(400).json({
                errorMessage: "Please fill the fields"
            })
        } else if(!payload.name) {
            return res.status(400).json({
                errorMessage: "Please enter a name"
            })
        } else if(!payload.budget) {
            return res.status(400).json({
                errorMessage: "Please enter a budget"
            })
        } 

        await database("accounts").where('id', req.params.id).update(payload);
        return res.status(200).json(await validateAccountID(req.params.id));

    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        await database("accounts").where('id', req.params.id).del();

        return res.status(204).end()
    } catch(error) {
        next(error)
    }
})

module.exports = router;