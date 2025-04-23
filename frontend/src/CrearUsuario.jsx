import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function CrearUsuario() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
            
            const respuesta = await axios.post('http://localhost:2000/usuarios/usuario', {
              
                nombre,
                correo,
                contrasena,
            });
            console.log('Usuario creado:', respuesta.data);
            alert('Usuario creado exitosamente');
            navigate("/");
        } catch (error) {
           
            console.error('Error al crear el usuario:', error);
           
           
            alert('error al crear el usuario');
        }
    };

    return (
       
       
       <div>
            <h2>Crear Usuario</h2>
          
            <form onSubmit={manejarEnvio}>
        
              <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
              
                </div>
              
          <div>
            <label>Correo:</label>
              <input
                 type="email"
                 value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                    />
                </div>
              
              
      <div>
          <label>Contraseña:</label>
                 <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
               
               
                <button type="submit">Registrar</button>
           
            </form>
        
        </div>
    );
}

export default CrearUsuario;