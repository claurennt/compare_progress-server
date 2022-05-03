const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({}, { strict: false });

const Primer_progress = mongoose.model("Primer_progress", schema);

module.exports = Primer_progress;
