const usuarioService = require("../services/usuarioservices");

class UsuarioController 
{
    static async BuscarUsuario(req, res) {
        try {
            const id = req.params.id;
            const usuario = await usuarioService.BuscarUsuario(id);
    
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener el Usuario', error });
        }
    }

    static async listarUsuario(req, res) {
        try {
            let lista = await usuarioService.obtenerUsuario();
            res.json(lista);
        } catch (e) {
            res.status(500).json({ error: "Error en la petición" });
        }
    }

    static async crearUsuario(req, res) {
        try {
            let { nombre,correo,contrasena } = req.body;
            let usuario = await usuarioService.crearUsuario(nombre,correo,contrasena);
            res.json(usuario);
        } catch (e) {
            res.status(500).json({ error: "Error en la petición" });
        }
    }

    static async eliminarUsuario(req, res) {
        try {
            const { id } = req.params;
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            let resultado = await usuarioService.eliminarUsuario(id);

            if (!resultado) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json({ mensaje: "usuario eliminado correctamente" });
        } catch (e) {
            res.status(500).json({ error: "Error en el servidor al eliminar el usuario" });
        }
    }

    static async actualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nombre,correo,contrasena } = req.body;
            if (isNaN(id)) {
                return res.status(400).json({ error: "id inválido" });
            }
            let resultado = await usuarioService.actualizarUsuario(id, {nombre,correo,contrasena});

            if (!resultado[0]) {
                return res.status(404).json({ error: "no se encontroel usuario " });
            }

            res.json({ mensaje: "usuario actualizado correctamente" });
        } catch (e) {
            res.status(500).json({ error: "Error en el servidor al actualizar el usuario" });
        }
    }
    static async IniciarSesion(req, res) {
        const { correo, contrasena } = req.body;
        const resultado = await usuarioService.IniciarSesion(correo, contrasena);
    
        if (resultado.error) { 
          return res.status(401).json({ mensaje: resultado.error });
        }
    
        res.json(resultado);
      }
}

module.exports = UsuarioController;