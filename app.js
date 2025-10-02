require('dotenv').config();
//import de express avec require
const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const cors= require('cors');
const corsOptions={
    origin: '*', // front autorié
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
    allowedHeaders:['Content-Type', 'Authorization'], // pour l'utilisation des tokens
    credentials: true
};

const bookRoutes = require('./routes/book');
const userRoutes = require ('./routes/user');

//appel de la methode express
const app=express();


app.use(cors(corsOptions));
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
  //  res.setHeader ('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //next();
//});


app.use(bodyParser.json());

//routes
app.use('/api/books',bookRoutes);
app.use('/api/auth', userRoutes);

module.exports=app;