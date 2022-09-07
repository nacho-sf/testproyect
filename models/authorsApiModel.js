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
        const data = await client.query(queries.getEmailAuthor,[email]); // 1 es el primer parametro
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
getAuthorsByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data));
*/





//LEER TODOS LOS AUTORES:
const getAllAuthors = async () => {
    console.log("entra");
    let result;
    let client = await pool.connect(); // Espera a abrir conexion
    try{
        const data = await client.query(queries.getAllAuthor);
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
getAllAuthors()
.then(data=>console.log(data));
*/





//CREAR AUTOR
const createAuthor = async (author) => {
    const {id_author,name,surname,email,image} = author;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createAuthor,[id_author,name,surname,email,image]);
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
let newAuthor = {
    id_author: 6,
    name:"Pepe",
    surname:"Villegas",
    email:"pepe@mail.com",
    image:"https://randomuser.me/api/portraits/men/10.jpg"
};

createAuthor(newAuthor)
.then(data=>console.log(data));
*/






//EXPORTACIÓN DE LOS MODELOS DE AUTORES:
module.exports = {
    getAllAuthors,
    getAuthorsByEmail,
    createAuthor
};