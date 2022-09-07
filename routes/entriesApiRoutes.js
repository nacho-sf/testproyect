//IMPORTACIÓN DE EXPRESS:
const express = require("express");

//IMPORTACIÓN DE LOS CONTROLADORES DE ENTRIES:
const entriesApiController = require("../controllers/entriesApiController");

//DECLARACIÓN DEL ROUTER DE ENTRIES:
const entriesApiRouter = express.Router();

//RUTAS DE ENTRIES:
entriesApiRouter.get("/", entriesApiController.getEntries);
entriesApiRouter.post("/", entriesApiController.createEntry);
entriesApiRouter.put("/", entriesApiController.updateEntry);
entriesApiRouter.delete("/", entriesApiController.deleteEntry);

//EXPORTACIÓN DEL ROUTER DE ENTRIES:
module.exports = entriesApiRouter;



///////////////ENDPOINTS DE ENTRIES:

//GET http://localhost:3000/api/entries
//GET http://localhost:3000/api/entries?email=a@gmail.com
//POST http://localhost:3000/api/entries
//PUT http://localhost:3000/api/entries
//DELETE http://localhost:3000/api/entries