//IMPORTACIÓN DE CONEXIÓN POSTGRESQL:
const { Pool } = require('pg');

//DECLARACIÓN DE CREDENCIALES DE POSTGRESQL:
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: '1234'
  });


//IMPORTACIÓN DE QUERIES:
const queries = require("../queries/queries");




//LEER ENTRADAS POR EMAIL:
const getEntriesByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEmailEntry,[email]); // 1 es el primer parametro
        result = data.rows;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};
//Para probar, descomentar solo este
/*
getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data));
*/





//LEER TODAS LAS ENTRADAS:
const getAllEntries = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntry);
        result = data.rows;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};
//Para probar, descomentar solo este
/*
getAllEntries()
.then(data=>console.log(data));
*/





//CREAR ENTRADA:
const createEntry = async (entry) => {
    const {title,content,email,category} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createEntry,[title,content,email,category]);
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};
//Para probar, descomentar solo este
/*
let newEntry = {
    title:"Título de entrada",
    content:"Contenido de entrara",
    email:"prueba1@thebridgeschool.es",
    category:"Test"
};

createEntry(newEntry)
.then(data=>console.log(data));
*/







//ACTUALIZAR ENTRADA:
const updateEntry = async (entry) => {
    const {title,new_title,content,category} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateEntry,[title,new_title,content,category]);
        result = data.rowCount;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};
//Para probar, descomentar solo este
/*
let newEntry = {
    title:"Título de entrada",
    new_title:"Nuevo título de entrada",
    content:"Nuevo contenido",
    category:"Nueva categoría"
};

updateEntry(newEntry)
.then(data=>console.log(data));
*/







//BORRAR ENTRADA:
const deleteEntry = async (entry) => {
    const {title} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteEntry,[title]);
        result = data.rowCount;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};
//Para probar, descomentar solo este
/*
let delEntry = {
    title:"Nuevo título de entrada"
};

deleteEntry(delEntry)
.then(data=>console.log(data));
*/






//EXPORTACIÓN DE LOS MODELOS DE ENTRADAS:
module.exports = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    updateEntry,
    deleteEntry
};