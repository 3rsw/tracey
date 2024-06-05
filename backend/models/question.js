const mongoose = require('mongoose')
const flowSchema = require('./flow')
const stepSchema = require('./trace')
const funcsVarsSchema = require('./vars')

const questionSchema = new mongoose.Schema({
    name: String,
    difficulty: Number,
    tags: [String],
    code: String,
    flow: [flowSchema],
    trace: [stepSchema],
    vars: [funcsVarsSchema],
  })


module.exports = mongoose.model('Question', questionSchema)