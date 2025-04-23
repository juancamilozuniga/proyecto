
const { Usuarios } = require('../models'); 

const jwt = require("jsonwebtoken");


class UsuarioService 
{

    static async BuscarUsuario(id) {
        try {
            return await Usuarios.findByPk(id);
        } catch (error) {
          
            console.log("Error al obtener el Usuario por id:", error);
          
          
            throw error;
        }
    }

    static async obtenerUsuario() {
        try {
            return await Usuarios.findAll();
        } catch (error) {
            console.log("Error al obtener los usuarios:", error);
        }
    }

    static async crearUsuario(nombre,correo,contrasena) {
        try {
          
            return await Usuarios.create({ nombre,correo,contrasena });
       
        } catch (e) {
           
            console.log("Error al guardar el usuario:", e);
        }
    }

    static async eliminarUsuario(id) {
      
      
        try {
           
            let resultadoB = await Usuarios.findByPk(id);
           
            if (resultadoB) {
               
                await resultadoB.destroy();
           
            } else {
                console.log("usuario no encontrado.");
            }
        } catch (e) {
           
            console.log("Error al eliminar usuario:", e);
        }
    }

    static async actualizarUsuario(id, datos) {
        try {
           
            let actualizado = await Usuarios.update(datos, { where: { id } });
            
            
            return actualizado;
       
        } catch (e) {
           
            console.log("Error en el servidor al actualizar el usuario:", e);
      
        }
    }

   
    static async IniciarSesion(correo, contrasena) {
       
        const usuario = await Usuarios.findOne({ where: { correo } });
      
       
        if (!usuario) {
          
            return { error: "Correo no registrado" };
       
        }
       
        if (contrasena !== usuario.contrasena) {
         
            return { error: "Credenciales incorrectas" };
      
        }
       
        const token = jwt.sign(
         
            { id: usuario.id, correo: usuario.correo },
         
            "secreto",
         
            { expiresIn: "1h" }
       
        );
       
        console.log("Token generado:", token);
       
       
        return { token, usuario };
   
    }
      
}



module.exports = UsuarioService;