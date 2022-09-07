//IMPORTACIÓN DEL MODELO AUTOR
const authorModel = require("../models/authorsApiModel");




// GET http://localhost:3000/api/authors -> ALL
// GET http://localhost:3000/api/authors?email=a@gmail.com


//LEER AUTORES (TODOS Y POR EMAIL)
const getAuthors = async (req, res) => {
    let authors;
    try {
        if (req.query.email) {
            authors = await authorModel.getAuthorsByEmail(req.query.email);
            res.status(200).json(authors); // [array] con las authors encontradas        }
        }else {
            authors = await authorModel.getAllAuthors();
            res.status(200).json(authors);
        };
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    };
};









// POST http://localhost:3000/api/authors


//CREAR AUTOR:
const createAuthor = async (req,res) => {
    try {
    console.log(req.body);
    const newAuthor = req.body; // {id_author, name, surname, email, image}
    const response = await authorModel.createAuthor(newAuthor);
    res.status(201).json({"saved":response});

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    };
};
//Para probar, pegar en POSTMAN
/*
{
    "id_author": 6,
    "name":"Pepe",
    "surname":"Villegas",
    "email":"pepe@mail.com",
    "image":"https://randomuser.me/api/portraits/men/10.jpg"
};
*/





//EXPORTACIÓN DE CONTROLADORES DE AUTORES:
module.exports = {
    getAuthors,
    createAuthor
    };