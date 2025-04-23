import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useUserContext } from "./UserContext";

function InicioSesion() {

    const navigate = useNavigate();

    const { setSelectedUser } = useUserContext();

    const [correo, setEmail] = useState("");

    const [contrasena, setPassword] = useState("");

    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2000/usuarios/iniciarsesion", {
                correo,
                contrasena,
            });
            const { token, usuario } = response.data;
            console.log("Datos recibidos del backend:", response.data);
            if (token) {
              
                localStorage.setItem("token", token);
                
                console.log("Usuario recibido del backend:", usuario);
                
                setSelectedUser(usuario); 
               
                navigate("/listarproductos");
         
            } else {
                alert("Token no recibido. Redirigiendo a página de login.");
                navigate("/");
            }
        } catch (error) {
            setMensaje("Error al iniciar sesión. Verifica tus credenciales.");
            console.error(error);
        }
    };

    return (
        <div >
            <h1 style={{backgroundColor: "red",}}>Inicio de Sesión</h1>
            <br />
            <br />
            <a href="/crearusuario"><button style={{backgroundColor: "red"}}>Registrar Usuarios</button></a>
            <br />
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px", }}>
                    <br />
                    <br />
                    <label style={{backgroundColor: "red",}} htmlFor="email">Correo Electrónico:</label>
                    <br />
                    <br />
                    <input
                        type="email"
                        id="email"
                        value={correo}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        
                    />
                </div>
                <div>
                    <br />
                    <br />
                    <label htmlFor="password">Contraseña:</label>
                    <br />
                    <br />

                    <input
                        type="password"
                        id="password"
                        value={contrasena}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "12px", marginTop: "10px" }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "20px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "50px",
                        cursor: "pointer",
                    }}
                >
                    Iniciar Sesión

                </button>
            </form>
            {mensaje && <p style={{ marginTop:"10px",backgroundColor: "red", }}>{mensaje}</p>}
        </div>
    );
}

export default InicioSesion;