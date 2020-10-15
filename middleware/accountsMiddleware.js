const database = require('../data/dbConfig');

function validateAccountID(id) {
        return database.first('*').from('accounts').where('id', id)
    }


module.exports = {
    validateAccountID
}