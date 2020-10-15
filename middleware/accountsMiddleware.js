const database = require('../data/dbConfig');

function validateAccountID(id) {
    return (req, res, next) => {
        return database.first('*').from('accounts').where('id', id)
    }
}

function validateAccount(payload) {
    return (req, res, next) => {
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
        } else {
            next()
        }
    }
}

module.exports = {
    validateAccountID,
    validateAccount
}