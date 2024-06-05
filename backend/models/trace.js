const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const stackFrameSchema = new mongoose.Schema({
    encoded_locals: Schema.Types.Mixed,
    frame_id: String,
    func_name: String,
    is_highlighted: Boolean,
    is_parent: Boolean,
    is_zombie: Boolean,
    line: Number,
    ordered_varnames: [String],
    parent_frame_id_list: [String],
    unique_hash: String,
})


const stepSchema = new mongoose.Schema({
    event: String,
    func_name: String,
    globals: Schema.Types.Mixed,
    heap: Schema.Types.Mixed,
    line: Number,
    stack_to_render: [stackFrameSchema],
    stdout: String,
})

module.exports = stepSchema