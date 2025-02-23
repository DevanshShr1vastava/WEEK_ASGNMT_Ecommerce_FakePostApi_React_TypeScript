import { Link } from "react-router-dom";
const NavGlobal = () => {
  return (
    <>
      <nav className='nav'>
        <h2 className='nav-header'>Ecommerce Application</h2>
        <Link className='nav-link' to="/">Home</Link>
        <Link className='nav-link' to="/admin">Admin</Link>
        <Link className='nav-link' to="/addProduct">Add Product</Link>
      </nav>
    </>

  );
};

export default NavGlobal;
