const multer = require ('multer');

const MIME_TYPE ={
    'image/jpg': 'jpg',
    'image/jpeg':'jpg',
    'image/png':'png',
    'image/webp': 'webp'
};
// stockage en mémoire via Multer (req.file.buffer), l'image sera sauvegardée après traitement via Sharp
const storage = multer.memoryStorage();
//fonction appelé pour chaque fichier uploadé pour savoir si accept ou non 
//file est le fichier en cours d'upload
const fileFilter = (req, file, callback)=>{
    if (!MIME_TYPE[file.mimetype]){
        return callback(new Error('Format de fichier non autorisé', false));
    }
    callback(null, true);
};
 const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize :5 * 1024 * 1024} //taille 5 Mo
 });
    //destination: (req, file, callback)=>{
    //    callback(null, 'images');
    //},
    //filename:(req, file, callback)=>{
    //    const name = file.originalname.split(' ').join('_');
    //    const extension = MIME_TYPE[file.mimetype];
    //    callback(null, name + Date.now()+ '.' + extension);
    //}
//});

module.exports = upload.single('image');