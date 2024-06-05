const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const funcsVarsSchema = new mongoose.Schema({
    function: String,
    decs: Schema.Types.Mixed,
    params:[String],
})

module.exports = funcsVarsSchema