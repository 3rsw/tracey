const mongoose = require('mongoose')

const conditionSchema = new mongoose.Schema({
    start: Number,
    end: Number,
    contents: String,
})


const flowSchema = new mongoose.Schema({
    line: Number,
    branch: [Number, Number],
    conditions: [conditionSchema],
})

module.exports = flowSchema