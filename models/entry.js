//IMPORTACIÓN CONEXIÓN POSTGRESQL:
const { Pool } = require('pg');

//DECLARACIÓN DE CREDENCIALES DE POSTGRESQL:
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: '1234'
  });


//IMPORTACIÓN QUERIES:
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




//LEER TODAS LAS ENTRADAS:
const getAllEntries = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`
        SELECT
        e.title,
        e.content,
        e.date,
        e.category,
        a.name,
        a.surname,
        a.image
    FROM entries AS e
    INNER JOIN authors AS a ON e.id_author = a.id_author`);
        result = data.rows;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};




//CREAR ENTRADA:
const createEntry = async (entry) => {
    const {title,content,email,category} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`INSERT INTO entries(title,content,id_author,category) 
                                    VALUES ($1,$2,
                                    (SELECT id_author FROM authors WHERE email=$3),$4)`
                                    ,[title,content,email,category]);
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};




//ACTUALIZAR ENTRADA:
const updateEntry = async (entry) => {
    const {title,new_title,content,category} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`UPDATE entries SET
            title = $2,
            content = $3,
            category = $4    
        WHERE title = $1;`
        ,[title,new_title,content,category]);
        result = data.rowCount;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};




//BORRAR ENTRADA:
const deleteEntry = async (entry) => {
    const {title} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`DELETE FROM entries
        WHERE entries.title = $1;`
        ,[title]);
        result = data.rowCount;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};




//LLAMADA A LOS MODELOS DE ENTRADAS:
const entries = {
    getEntriesByEmail,
    //getAllEntries,
    //createEntry,
    //updateEntry,
    //deleteEntry
};



//EXPORTACIÓN DE LOS MODELOS DE ENTRADAS:
module.exports = entries;






//////////////////////// PRUEBAS:



//GET ENTRY BY EMAIL:

getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data));




//GET ALL ENTRIES
/*
getAllEntries()
.then(data=>console.log(data));
*/




//CREATE ENTRY
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




//UPDATE ENTRY
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





//DELETE ENTRY
/*
let delEntry = {
    title:"Nuevo título de entrada"
};

deleteEntry(delEntry)
.then(data=>console.log(data));
*/