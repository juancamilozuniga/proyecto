
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import React, {  useState } from "react";

import IniciarSesion from "./InicioSesion";

import ListarProductos from "./ListarProductos";

import CrearUsuario from "./CrearUsuario";

import CerrarSesion from "./CerrarSesion";

import CrearProducto from "./CrearProducto";

import EditarProducto from "./EditarProducto";

import DetallesUsuario from "./DetallesUsuario";


import { UserContext } from "./UserContext";



const isAuthenticated = () => {
   
    return !!localStorage.getItem("token"); 
};

const ProtectedRoute = ({ element }) => {
   
   
    return isAuthenticated() ? element : <Navigate to="/" />;
};

function Menu() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
             
                {console.log("Usuario seleccionado en el contextoddd:", selectedUser)}
      <Router>
      <Routes>
         <Route path="/" element={<IniciarSesion />} />
            
             <Route path="/listarproductos" element={<ProtectedRoute element={<ListarProductos />} />} />
             
             <Route path="/crearusuario" element={<CrearUsuario />} />
                    
             <Route path="/cerrarsesion" element={<ProtectedRoute element={<CerrarSesion />} />} />
                    
             <Route path="/crearproducto" element={<ProtectedRoute element={<CrearProducto />} />} />
                    
             <Route path="/editarproducto/:id" element={<ProtectedRoute element={<EditarProducto />} />} />
                    
            <Route path="/detallesusuario" element={<ProtectedRoute element={<DetallesUsuario />} />} />
               
                </Routes>
           
            </Router>
       
       
        </UserContext.Provider>
    );

}

export default Menu;