import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ILogout {
    handleLogout : ()=>void;
}

const Logout = ({handleLogout}:ILogout) => {
    const navigate= useNavigate();
    useEffect(()=>{
        handleLogout();
        navigate('/');
    },[handleLogout, navigate]);
    return null;
};

export default Logout;
