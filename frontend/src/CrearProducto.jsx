
import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";


function CrearProducto() {

    const navigate = useNavigate();

    const [producto, setProducto] = useState({

        nombre: "",
        categoria: "",
        precio: ""

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value
        });
    };

   
    const handleSubmit = async (e) => {
      
      
        e.preventDefault();
      
        const token = localStorage.getItem("token");
      
        if (!token) {
      
            alert("No se encontró un token ");
      
            return;
        }

        try {
            const response = await axios.post("http://localhost:2000/productos/producto", producto,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert("Producto registrado ");
            navigate("/listarproductos");
            console.log(response.data);
        } catch (error) {
           
           
            console.error("Error al registrar producto:", error);
           
            alert("error al registrar el producto");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            
               <div>
                    <label>Nombre:</label>
                
                  <input
                        type="text"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                        required
                    />
             
             
           </div>
        <div>
            
              <label>Categoría:</label>
                    <input
                        type="text"
                        name="categoria"
                        value={producto.categoria}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        value={producto.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrar Producto</button>
            </form>
            
        </div>
    );
}

export default CrearProducto;