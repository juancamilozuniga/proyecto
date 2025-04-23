
import React, { useEffect, useState } from "react";

import axios from "axios";

import CerrarSesion from "./CerrarSesion";

import { useNavigate } from 'react-router-dom';


import { useUserContext } from "./UserContext";

function ListarProductos() {

    const { selectedUser } = useUserContext(); 

    const navegar = useNavigate();

    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const fetchProductos = async () => {
            const token = localStorage.getItem("token");
            if (!token) {                return;
            }
            
   try {
      const response = await axios.get("http://localhost:2000/productos/producto", {
         headers: {
         "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
            
            },
                });
               
                setProductos(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProductos();
    }, []);

    const EliminarProducto = (id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Error", "No estás autenticado", "error");
            return;
        }
          axios.delete(`http://localhost:2000/productos/eliminar/${id}`, {
            
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
     
            },
               
        })
             .then(() => {
              setProductos(productos.filter(producto => producto.id !== id));
             alert("Producto eliminado correctamente");
          })
                .catch(error => {
                    console.error("Error al eliminar el Producto:", error);
                });
            }
            const handleDetallesUsuario = () => {
                if (selectedUser) {
                    navegar("/detallesusuario");
                } else {
                    alert("sin usuario,inicia sesión una vez mas");
                }
            };


    return (
        <div>
           
            <h1 style={{ backgroundColor:"red"}}>Lista de Productos</h1>
           
         <CerrarSesion />
        <a href="/crearproducto"><button style={{ backgroundColor:"red"}}>Registrar Producto</button></a>
        <button style={{ backgroundColor:"red"}} onClick={handleDetallesUsuario}>Detalles del usuario</button>
        <br />
            <br />
            <br />
            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.precio}</td>
                            <td>
                                <button className="btn btn-warning mx-2"
                                    onClick={() => navegar(`/editarproducto/${producto.id}`)}>Editar</button>
                                <button onClick={() => EliminarProducto(producto.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarProductos;