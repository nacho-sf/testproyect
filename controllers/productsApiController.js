
const Product = require("../models/productsApiModel");

const getProducts = async (req, res) => {
    if (req.params.id) {  // FIND BY ID
        try {
            let product =  await Product.find({id:req.params.id},'title price id -_id'); // Se filtra por lo que se quiere, y por lo que se quiere quitar
            res.status(200).json(product);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({"message":"producto no encontrado"});
        }
    } else { // FIND ALL
        try {
            let products = await Product.find({},'title price id -_id').sort({'id':'desc'}); // Se filtra por lo que se quiere, y por lo que se quiere quitar
            res.status(200).json( {products});
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json( {products});
        }
    }
}




const createProduct = async (req, res) => {
    console.log("Esto es el consol.log de lo que introducimos por postman",req.body); // Objeto recibido de producto nuevo
    const product = req.body; // {} nuevo producto a guardar

    try{
        //CREA EL OBJETO PRODUCTO CON LOS NUEVOS DATOS:
        let product = new Product(req.body);
        //GUARDA EL OBJETO EN MONGODB:
        let answer = await product.save();
        //LOG DE LO QUE DEVUELVE (GUARDA) LA API:
        console.log("Log de los que devuelve la Api",answer);
        res.status(201).json({"message":` Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`});

    }catch(error){
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({"message":` Error guardando producto ${answer.title}`});
    }
};
/*
{
    "id": 3,
    "title": "Tostada",
    "price": 1.60,
    "description": "Tostada con tomate y AOVE",
    "image":"https://cookpad.com/es/recetas/132377-tostadas-con-tomate.jpg"
}
*/




const deleteProduct = async (req,res)=>{
    const msj ="Has enviado un DELETE para borrar product";
    console.log(msj);
    res.send(msj);
}





module.exports = {
getProducts,
createProduct,
deleteProduct
//editProduct,
}