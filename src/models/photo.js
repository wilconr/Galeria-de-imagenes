const { Schema, model } = require('mongoose'); // Importa Schema y model de mongoose

const PhotoSchema = new Schema({
    title: String,
    description: String,
    url: String,
    public_id: String
});

module.exports = model('Photo', PhotoSchema);