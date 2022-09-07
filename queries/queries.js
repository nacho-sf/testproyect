//DECLARACIÓN DE QUERIES SQL:
const queries = {

    getEmailEntry:
    `SELECT
    e.title,
    e.content,
    e.date,
    e.category,
    a.name,
    a.surname,
    a.image
    FROM entries AS e
    INNER JOIN authors AS a ON e.id_author = a.id_author
    WHERE email=$1;` ,

    getAllEntry:
    `SELECT
    e.title,
    e.content,
    e.date,
    e.category,
    a.name,
    a.surname,
    a.image
    FROM entries AS e
    INNER JOIN authors AS a ON e.id_author = a.id_author` ,

    createEntry:
    `INSERT INTO entries
    (title,content,id_author,category) 
    VALUES ($1,$2,(SELECT id_author FROM authors WHERE email=$3),$4)`,

    updateEntry:
    `UPDATE entries SET
    title = $2,
    content = $3,
    category = $4    
    WHERE title = $1;`,

    deleteEntry:
    `DELETE FROM entries
    WHERE entries.title = $1;`,

    getEmailAuthor:
    `SELECT * 
    FROM authors
    WHERE email = $1;` ,

    getAllAuthor:
    `SELECT *
    FROM authors` ,

    createAuthor:
    `INSERT INTO authors(id_author,name,surname,email,image) 
    VALUES ($1,$2,$3,$4,$5)`

};

//EXPORTACIÓN DE QUERIES SQL:
module.exports = queries;