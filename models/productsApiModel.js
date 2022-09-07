//IMPORTACIÓN DEL ODM MONGOOSE:
const mongoose = require('mongoose');


//CREACIÓN DEL ESQUEMA-OBJETO DE PRODUCTOS:
const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image:{
        type: String,
        validate: {
            validator: function(url){
                return url.indexOf('.jpg') != -1;
            }, 
            message: "Porfa, sólo imágenes JPG"
        }
    }
};


//CREACIÓN DEL ESQUEMA PRODUCTO
const productSchema = mongoose.Schema(objectSchema);

//CREACIÓN DEL MODELO PRODUCTO:
const Product = mongoose.model('Product', productSchema);

//EXPORTACIÓN DEL MODELO PRODUCTO:
module.exports = Product;



//Prueba para insertar un producto con mongoose:
/*
const p = new Product({
    id: 1,
    title: "Tortilla",
    price: 1.80,
    description: "Tortilla jugosa del teatro",
    image:"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.jpg"
});

p.save().then((data) => console.log(data))
*/