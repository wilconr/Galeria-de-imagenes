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
    let errors = [];
    let file = req.file;

    // Verificacion si no se sube un archivo
    if (!file) {
        errors.push({ texto: 'No se ha seleccionado un archivo' });
    }

    if (errors.length > 0) {
        let photos = await Photo.find();
        return res.render('image_form', { errors, photos }, );
    }

    let fileName = req.file.originalname;
    let fileRoute = req.file.path;

    let splitName = fileName.split('.'); // Descomposicion del nombre del archivo para tomar la extension
    let extension = splitName[splitName.length - 1]; // expension de la imagen

    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']; // Extensiones validas

    // Verificacion si es un archivo de imagen valido
    if (extensionesValidas.indexOf(extension) < 0) {
        fs.unlink(fileRoute); // Elimina el archivo de la carpeta uploads
        errors.push({ texto: 'las extenciones permitidas son: ' + extensionesValidas.join(', ') });
    }

    if (errors.length > 0) {
        let photos = await Photo.find();
        return res.render('image_form', { errors, photos }, );
    }

    const { title, description } = req.body;
    const result = await cloudinary.v2.uploader.upload(fileRoute); // Sube la imagen a Cloudinary
    // console.log(result);
    const { url, public_id } = result;

    let newPhoto = new Photo({
        title,
        description,
        url,
        public_id
    });

    await newPhoto.save(); // Guarda en la base de datos
    await fs.unlink(fileRoute); // Elimina el archivo de la carpeta uploads
    res.redirect('/');
    // res.send('received');

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