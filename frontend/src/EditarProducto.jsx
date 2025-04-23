import React, { useState, useEffect } from "react";

import axios from "axios";


import { useParams,useNavigate } from "react-router-dom";

function EditarProducto() {
   
    const navigate = useNavigate();
    
    const { id } = useParams(); 
    
    
    const [producto, setProducto] = useState({
        nombre: "",
        categoria: "",
        precio: ""
    
    
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        const cargarProducto = async () => {
            try {
        const response = await axios.get(`http://localhost:2000/productos/producto/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
                setProducto(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

       
        cargarProducto();
    }, [id, token]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value
        });
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:2000/productos/producto/${id}`, producto, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Producto actualizado");
            navigate("/listarproductos")
        } catch (error) {
            console.error("no se actualizo el producto:", error);
            alert("Hubo un error al actualizar el producto");
        }
    };

    return (
        <div>
            <h2>Editar Producto</h2>
            <form onSubmit={manejarSubmit}>
        
          <div>
            
               <label>Nombre:</label>
            
              <input
                  type="text"
                 name="nombre"
                  value={producto.nombre}
                 onChange={manejarCambio}
                    />
                </div>
               
               
                <div>
                    <label>Categoría:</label>
                   
                    <input
                        type="text"
                        name="categoria"
                        value={producto.categoria}
                        onChange={manejarCambio}
                    />
                </div>
          <div>
          <label>Precio:</label>
         <input
                 type="number"
                 name="precio"
                 value={producto.precio}
                 onChange={manejarCambio}
                    />
                </div>
               
               
                <button type="submit">Guardar Cambios</button>
           
           
            </form>
       
        </div>
    );
}

export default EditarProducto;