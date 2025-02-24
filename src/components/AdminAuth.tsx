import { Navigate, Outlet } from "react-router-dom";

interface IAdminAuth {
    isAdmin : boolean;
}

const AdminAuth = ({isAdmin}:IAdminAuth) => {
  return <>
    {isAdmin?<Outlet />:<Navigate to='/' />}
  </>
};

export default AdminAuth;
