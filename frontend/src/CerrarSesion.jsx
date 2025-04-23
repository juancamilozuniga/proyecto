import { useNavigate } from "react-router-dom";
function CerrarSesion(){
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };


    return(
        <div>
       <div>
            <button onClick={Logout} className="">
                Cerrar Sesión
            </button>
        </div>
    </div>
    )
}
export default CerrarSesion;