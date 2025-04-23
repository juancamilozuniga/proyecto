const productoService = require("../services/productoservices");

class UsuarioController 
{
    static async BuscarProducto(req, res) {
    
        try {
            const id = req.params.id;
            const producto = await productoService.BuscarProducto(id);
    
            if (!producto) {
                return res.status(404).json({ mensaje: 'producto no encontrado' });
            }
            res.json(producto);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener el producto', error });
        }
    }

    static async listarProducto(req, res) {
        try {
            let lista = await productoService.obtenerProducto();
            res.json(lista);
        } catch (e) {
            res.status(500).json({ error: "Error en la petición" });
        }
    }

    static async crearProducto(req, res) {
        try {
            let { nombre,categoria,precio } = req.body;
            let producto = await productoService.crearProducto(nombre,categoria,precio);
            res.json(producto);
        } catch (e) {
            res.status(500).json({ error: "Error en la petición" });
        }
    }

static async eliminarProducto(req, res) {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        const resultado = await productoService.eliminarProducto(id);

        if (!resultado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto eliminado" });
    } catch (e) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
}

    static async actualizarProducto(req, res) {
        try {
            const { id } = req.params;
            const { nombre,categoria,precio } = req.body;
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID no válido" });
            }
            let resultado = await productoService.actualizarProducto(id, {nombre,categoria,precio});
            if (!resultado[0]) {
                return res.status(404).json({ error: "producto no encontrado" });
            }
         
            res.json({ mensaje: "el  producto se  actualizo correctamente" });
       
       
        } catch (e) {
          
          
            res.status(500).json({ error: "Error al actualizar producto" });
        }
    }
}



module.exports = UsuarioController;