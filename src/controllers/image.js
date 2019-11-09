const cloudinary = require('cloudinary'); // Importa el paquete cloudinary
const fs = require('fs-extra'); // Importa el paquete FileSystem-Extra
const Photo = require('../models/photo'); // Importa el modelo Photo

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

let getImageAdd = async(req, res) => {

    let photos = await Photo.find();
    res.render('image_form', { photos });
}

let postImageAdd = async(req, res) => {

    // console.log(req.body);
    // console.log(req.file);
    const rutaImg = req.file.path;

    const { title, description } = req.body;
    const result = await cloudinary.v2.uploader.upload(rutaImg); // Sube la imagen a Cloudinary
    // console.log(result);
    const { url, public_id } = result;

    let newPhoto = new Photo({
        title,
        description,
        url,
        public_id
    });

    await newPhoto.save(); // Guarda en la base de datos
    await fs.unlink(rutaImg); // Elimina el archivo de la carpeta uploads
    res.redirect('/');

}

let deleteImage = async(req, res) => {
    const { photo_id } = req.params;
    let deletePhoto = await Photo.findByIdAndDelete(photo_id); // Elimina el registro de la base de datos
    let result = await cloudinary.v2.uploader.destroy(deletePhoto.public_id); // Elimina la imagen de cloudinary
    console.log(result);
    res.redirect('/image');
}

module.exports = {
    getImageAdd,
    postImageAdd,
    deleteImage
}