const Photo = require('../models/photo'); // Importa el modelo Photo

let getImages = async(req, res) => {

    let photos = await Photo.find();
    //console.log(photos);
    res.render('home', { photos });
}

module.exports = {
    getImages
}