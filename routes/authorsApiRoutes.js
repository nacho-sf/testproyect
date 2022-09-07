//IMPORTACIÓN DE EXPRESS:
const express = require("express");

//IMPORTACIÓN DE LOS CONTROLADORES DE AUTHORS:
const authorsApiController = require("../controllers/authorsApiController");

//DECLARACIÓN DEL ROUTER DE AUTHORS:
const authorsApiRouter = express.Router();

//RUTAS DE AUTHORS:
authorsApiRouter.get("/", authorsApiController.getAuthors);
authorsApiRouter.post("/", authorsApiController.createAuthor);

//EXPORTACIÓN DEL ROUTER DE ENTRIES:
module.exports = authorsApiRouter;



///////////////ENDPOINTS DE AUTHORS:

//GET http://localhost:3000/api/authors
//GET http://localhost:3000/api/authors?email=a@gmail.com
//POST http://localhost:3000/api/authors