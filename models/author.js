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




//LEER AUTORES POR EMAIL:
const getAuthorsByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`SELECT * FROM authors
        WHERE email = $1;`,[email]); // 1 es el primer parametro
        result = data.rows;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};




//LEER TODOS LOS AUTORES:
const getAllAuthors = async () => {
    console.log("entra");
    let result;
    let client = await pool.connect(); // Espera a abrir conexion
    try{
        const data = await client.query(`SELECT * FROM authors`);
        result = data.rows;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};




//CREAR AUTOR
const createAuthor = async (newAuthor) => {
    const {id_author,name,surname,email,image} = newAuthor;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`INSERT INTO authors(id_author,name,surname,email,image VALUES ($1,$2,$3,$4,$5)`
                                    ,[id_author,name,surname,email,image]);
        result = data.rowCount;
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    };
    return result;
};




//LLAMADA A LOS MODELOS DE AUTORES:
const authors = {
    //getAllAuthors,
    //getAuthorsByEmail,
    //createAuthor
};



//EXPORTACIÓN DE LOS MODELOS DE AUTORES:
module.exports = authors;


