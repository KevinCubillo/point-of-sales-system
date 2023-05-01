const db = require("../database");

const productMdl = {};

// Función para obtener todos los productos
productMdl.getAll = async()=>{
    try{
        const [rows] = await db.execute("SELECT * FROM producto");
        return rows;
    }catch(err){
        console.log("An error has ocurred with getAll function");
        throw err;
    }
}

// Función para obtener un producto especifico
productMdl.getById = async(codigo) =>{
    try{
        const [rows] = await db.execute("SELECT * FROM producto WHERE codigo = ?", [codigo]);
        return rows;
    }catch(err){
        console.log("An error has ocurred with getById function");
        throw err;
    }
}

// Función para agregar productos a la base de datos
productMdl.add = async(nombre,cantidad,tipo,foto) =>{
    try{
        const [result] = await db.execute("INSERT INTO PRODUCTO(nombre,cantidad,tipo,foto) values(?,?,?,?)",[nombre,cantidad,tipo,foto]);
        return result.insertId;
    }catch(err){
        console.log("An error has ocurred with add function");
        throw err;
    }
}

// Función para eliminar elementos de la base de datos
productMdl.delete = async(codigo)=>{
    try{
        await db.execute("DELETE FROM PRODUCTO WHERE CODIGO = ?",[codigo]);
    }catch(err){
        console.log("An error has ocurred with delete function");
        throw err;
    }
}

//Funcion para actualizar los valores en la base de datos
productMdl.update = async(codigo,nombre,cantidad,tipo,foto) =>{
    try{
        const [result] = await db.execute("UPDATE PRODUCTO SET nombre = ?, cantidad = ?, tipo = ?, foto = ? WHERE codigo = ?",[nombre, cantidad, tipo, foto, codigo]);
        return productMdl.getById(codigo);
    }catch(err){
        console.log("An error has ocurred with update function");
        throw err;
    }
}

module.exports = productMdl;