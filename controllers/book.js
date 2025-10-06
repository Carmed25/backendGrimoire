const Book = require ('../models/Book');
const path = require ('path');
const fs = require ('fs');
const sharp = require ('sharp');


exports.createBook = async (req,res,next)=>{
    try{
    const bookObject = JSON.parse(req.body.book);// conversion du champ book en objet JS
    delete bookObject._id; // suppression de l'id envoyé dans son JSON
    delete bookObject._userId;

    if (!req.file || !req.file.buffer){
        return res.status(400).json({message:'Image manquante.'}); //vérifie si image ou en mémoire
    }

    //création du nom du fichier compressé et retrait du nom d'origine
    const timestamp= Date.now(); //nombre en millisecondes pour dater l'image
    const originalName = req.file.originalname.replace(/\s+/g, '_'); //remplace espace par _
    const extension = 'webp';
    const filename = `${timestamp}-${originalName}.${extension}`; // nom apres transformation
    const imagesDir = path.join(__dirname, '..', 'images'); //lieu où sera crée image
    const outputPath = path.join(imagesDir, filename);


    // traitement avec sharp
    await sharp(req.file.buffer)
        .webp({quality:70})
        .toFile(outputPath);
        
    //construction du livre à sauvegarder
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${filename}`
    });

    const bookSaved = await book.save();
    res.status(201).json({message: 'Votre livre est enregistré.', book: bookSaved});
    }catch (error) {
        next(error);
    }
};

exports.modifyBook = (req, res, next)=>{
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }:{ ...req.body};
    delete bookObject._userId;
    Book.findOne({_id:req.params.id})
    .then((book)=>{
        if(book.userId != req.auth.userId){
            res.status(401).json({ message: 'Non autorisé'});
        } else{
            Book.updateOne({_id:req.params.id},{...bookObject, _id:req.params.id})
            .then(()=> res.status(200).json({message:'Livre modifié.'}))
            .catch(error=> res.status(401).json({error}));
        }
    })
    .catch((error)=> {res.status(400).json({error});
})};

exports.deleteBook = (req, res, next)=>{
   Book.findOne({_id : req.params.id})
   .then(book=> {
    if (book.userId != req.auth.userId){
        res.status(401).json({message :'Non autorisé.'});
    } else {
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink('images/${filename}',()=>{
            Book.deleteOne({_id: req.params.id})
            .then(()=>{res.status(200).json({message:'Livre supprimé.'})})
            .catch (error=> res.status(401).json({error}));
        });
    }
   })
   .catch(error=> {
    res.status(500).json({error});
});
};


exports.getOneBook= (req, res, next)=>{
    Book.findOne({_id: req.params.id})
    .then(bookObject=>res.status(200).json(bookObject))
    .catch(error=> res.status(404).json({error}));
};

exports.getAllBooks = (req, res, next)=>{
    Book.find()
    .then(books=> res.status(200).json(books))
    .catch(error=>res.status(400).json({error}));
};

exports.bestRatingBook=(req,res, next)=>{

};

exports.notationBook=(req, res, next)=>{

};