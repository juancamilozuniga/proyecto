
const { Productos } = require('../models'); 



class UsuarioService 


{

    
    static async BuscarProducto(id) {
    
        try {
    
            return await Productos.findByPk(id);
        } catch (error) {
    
            console.log("Error al obtener el Producto por su  id:", error);
            throw error;
        }
    }

    static async obtenerProducto() {
        try {
            return await Productos.findAll();
        } catch (error) {
            console.log("Error en  obtener  Productos:", error);
        }
    }

    static async crearProducto(nombre,categoria,precio) {
        try {
            return await Productos.create({ nombre,categoria,precio });
        } catch (e) {
            
            console.log("Error al guardar  Productos:", e);
        }
    }

static async eliminarProducto(id) {
    try {
        const producto = await Productos.findByPk(id);
        if (!producto) {
            return false; 
        }
        await producto.destroy();
        return true; 
    } catch (e) {
        console.log("Error al eliminar el  Producto:", e);
       
       
        throw e;
    }
}

    static async actualizarProducto(id, datos) {
        try {
           
            let actualizado = await Productos.update(datos, { where: { id } });
         
            return actualizado;
        } catch (e) {
           
           
            console.log("Error en el servidor al actualizar el Producto:", e);
        }
    }
}

module.exports = UsuarioService;