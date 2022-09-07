//IMPORTACIÓN DEL MODELO ENTRADA
const entryModel = require("../models/entriesApiModel");




// GET http://localhost:3000/api/entries -> ALL
// GET http://localhost:3000/api/entries?email=a@gmail.com


//LEER ENTRADAS (TODAS Y POR EMAIL)
const getEntries = async (req, res) => {
    //Se declara la variable que tiene que devolver la función
    let entries;
    try {
        //Si me pasas un email
        if (req.query.email) {
            //Búsqueda por email, invocando el método asíncrono getEntriesByEmail
            //(query. -> Para acceder a los parámetros de URL. ej: query.email)
            entries = await entryModel.getEntriesByEmail(req.query.email);
            //Devuelve [] con las entries encontradas
            res.status(200).json(entries);
        }else {
            //Si no pasas email, invocar método asíncrono getAllEntries
            entries = await entryModel.getAllEntries();
            res.status(200).json(entries);
        };
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    };
};








// POST http://localhost:3000/api/entries


//CREAR ENTRADA:
const createEntry = async (req,res) => {
    try {
    console.log(req.body);
    //Se guarda en la variable el objeto newEntry leído en el body de Postman
    const newEntry = req.body; // {tilte, content, email, category}
    //Respuesta
    const response = await entryModel.createEntry(newEntry);
    res.status(201).json({"saved":response});
    
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    };
};
/*
//Para probar, pegar en POSTMAN
{
    "title":"Nos gustan las tortillas",
    "content":"En el Marquina las tortillas vuelan",
    "email":"albertu@thebridgeschool.es",
    "category":"gastronomía"
};
*/







// PUT http://localhost:3000/api/entries


//ACTUALIZAR ENTRADA POR TÍTULO:
const updateEntry = async (req, res) => {
    
    try {
        console.log(req.body);
        const newEntry = req.body; // {tilte,new_title,content,category}
        const response = await entryModel.updateEntry(newEntry);
        res.status(200).json({"saved":response});

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    };
};
/*
//Para probar, pegar en POSTMAN
{
    "title":"Título",
    "new_title":"Vacaciones en The Bridge",
    "content":"contendo",
    "category":"summer"
};
*/







// DELETE http://localhost:3000/api/entries


//BORRAR ENTRADA POR TÍTULO:
const deleteEntry = async (req, res) => {
    
    try {
        console.log(req.body);
        const newEntry = req.body; // {tilte}
        const response = await entryModel.deleteEntry(newEntry);
        res.status(200).json({'message: Se ha borrado la entry: ':newEntry.title});

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    };
};
//Para probar, pegar en POSTMAN
/*
{
    "title":"Título"
}
*/




//EXPORTACIÓN DE CONTROLADORES DE ENTRADAS:
module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry
    };