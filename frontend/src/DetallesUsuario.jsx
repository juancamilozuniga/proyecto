import { useUserContext } from "./UserContext";


import { useNavigate } from "react-router-dom";


function UserDetail() 
{
  const navigate = useNavigate();
  const { selectedUser } = useUserContext();

  if (!selectedUser) {
    return <p>No hay usuario seleccionado</p>;
  }

  return (
    <div>
      <h1 >Detalles del Usuario </h1>
      
     
      <p>ID: {selectedUser.id}</p>
      <br />
     
      <p>Nombre:{selectedUser.nombre}</p>
      <br />
     
      <p>Correo: {selectedUser.correo}</p>
      <br />
      <br />
     
      <button type="button" className="btn btn-secondary" onClick={() => navigate("/listarproductos")}>
        Regresar
      </button>
    </div>
    
  );
}

export default UserDetail;