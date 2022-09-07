//OBJETO PARA ABRIR LA CONEXIÓN A MONGOOSE:


//IMPORTACIÓN DE MONGOOSE:
const mongoose = require("mongoose");


//DETALLES DE INICIALIZACIÓN DE LA CONEXIÓN A "NUEVA"
//SI LA BBDD "NUEVA" NO EXISTIERA, LA CREA
mongoose.connect("mongodb://localhost:27017/nueva", { useNewUrlParser: true, useUnifiedTopology: true});

//DECLARACIÓN DE LA CONEXIÓN A MONGOOSE:
const db = mongoose.connection;


//INICIALIZACIÓN DEL LISTENER PARA CUANDO HAYA UN ERROR:
db.on("error", error => console.log(error));

//INICIALIZACIÓN DEL LISTENER PARA CUANDO HAYA CONEXIÓN:
db.once("open", () => console.log("Connection to MongoDB established"));


//EXPORTACIÓN DEL OBJETO MONGOOSE
module.exports = mongoose;



//EL OBJETO DE CONEXIÓN MONGOOSE SE IMPORTARÍA EN "APP.JS" Y SE UBICA BAJO LA DECLARACIÓN DE "EXPRESS", PARA QUE SE INICIALICE PRONTO Y ESTÉ LISTO PARA TODA LA APLICACIÓN