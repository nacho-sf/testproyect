const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: '1234'
  })


const queries = require("../queries/queries")



// GET ENTRY BY EMAIL

const getEntriesByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEmailEntry,[email]) // 1 es el primer parametro
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}




// GET ALL ENTRIES

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
    INNER JOIN authors AS a ON e.id_author = a.id_author`)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}




// CREATE ENTRY

const createEntry = async (entry) => {
    const {title,content,email,category} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`INSERT INTO entries(title,content,id_author,category) 
                                    VALUES ($1,$2,
                                    (SELECT id_author FROM authors WHERE email=$3),$4)`
                                    ,[title,content,email,category])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}




// UPDATE ENTRY
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
        ,[title,new_title,content,category])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}




// DELETE ENTRY

const deleteEntry = async (entry) => {
    const {title} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`DELETE FROM entries
        WHERE entries.title = $1;`
        ,[title])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}





// GET All Authors:
const getAllAuthors = async () => {
    console.log("entra");
    let result;
    let client = await pool.connect(); // Espera a abrir conexion
    try{
        const data = await client.query(`SELECT * FROM authors`)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}





// GET Authors by email:
const getAuthorsByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`SELECT * FROM authors
        WHERE email = $1;`,[email]) // 1 es el primer parametro
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}





// CREATE AUTHOR
const createAuthor = async (newAuthor) => {
    const {id_author,name,surname,email,image} = newAuthor;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`INSERT INTO authors(id_author,name,surname,email,image VALUES ($1,$2,$3,$4,$5)`
                                    ,[id_author,name,surname,email,image])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}






const entries = {
    getEntriesByEmail,
    //getAllEntries,
    //createEntry,
    //updateEntry,
    //deleteEntry,
    //getAllAuthors,
    //getAuthorsByEmail,
    //createAuthor
}

module.exports = entries;


// Pruebas

getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data))




/*
getAllEntries()
.then(data=>console.log(data))
*/



/*
let newEntry = {
    title:"Título de entrada",
    content:"Contenido de entrara",
    email:"prueba1@thebridgeschool.es",
    category:"Test"}

createEntry(newEntry)
.then(data=>console.log(data))
*/



/*
let newEntry = {
    title:"Título de entrada",
    new_title:"Nuevo título de entrada",
    content:"Nuevo contenido",
    category:"Nueva categoría"
}

updateEntry(newEntry)
.then(data=>console.log(data))
*/



/*
let delEntry = {
    title:"Nuevo título de entrada"
}

deleteEntry(delEntry)
.then(data=>console.log(data))
*/