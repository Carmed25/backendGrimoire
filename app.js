require('dotenv').config();
//import de express avec require
const express= require('express');
const mongoose = require('mongoose');
const cors= require('cors');

const Book = require ('./models/Book');

//appel de la methode express
const app=express();


app.use(cors());
// donne acces au corps JSON de la requete aussi bodyParser
app.use(express.json());

//Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
   // {useNewUrlParser: true,
    //    useUnifiedTopology: true
   // })
    .then(()=>console.log ('connexion à MongoDB réussie!'))
    .catch ((err)=> console.log ('connexion à MongoDB échouée!', err));



//ajout des headers CORS
//app.use ((req, res, next)=>{
  //  res.setHeader ('Access-Control-Allow-Origin','*');
  //  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content,Accept,Content-Type,Authorization');
  //  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //  next();
//});

//Middlewaure pour log les requetes

//route 
app.post('/api/auth/signup',(req,res,next)=>{
    delete req.body._id;
    const book = new Book({
        ...req.body
    });
    book.save()
    .then(()=>res.status(201).json({message: 'Votre livre est enregistré.'}))
    .catch(error=> res.status(400).json({error}));
   
});


app.use((req,res,next)=>{
    console.log('requete recue');
    next();
});



app.use ((req,res)=> {
    res.status(404).json({message:'route non trouvée'});
    next();
});



module.exports=app;