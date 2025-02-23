import { Container } from "react-bootstrap";
import { Routes,Route } from "react-router-dom";
import NavGlobal from "./components/NavGlobal";
import UserAuth from "./components/UserAuth";
import Login from "./components/Login";
import Home from "./components/Home";
import AdminAuth from "./components/AdminAuth";
import HomeAdmin from "./components/HomeAdmin";
import AddProduct from "./components/AddProduct";
import NotFound from "./components/NotFound";
import { useContext, useEffect, useReducer, useState } from "react";
import { getAllProducts, IProductData } from "./utils/ProductAPI";
import { AllProductContext, CartContext, FilteredProductContext, isAdminContext, UserContext } from "./components/AppContexts";
import { prodReducer } from "./utils/ProductReducer";
import { cartReducer } from "./utils/CartReducer";
import { getUserCart } from "./utils/CartAPI";

function App() {
  const [product,prodDispatch] = useReducer(prodReducer,[]);
  const [cart,dispatch] = useReducer(cartReducer,[]);

  const [filteredProduct,setfilteredProduct] = useState<IProductData[]>(product);
  const loggedIn = useContext(UserContext)
  const admin = useContext(isAdminContext)
  const [isLoggedIn,setIsLoggedIn] = useState(loggedIn);
  const [isAdmin,setIsAdmin] = useState(admin);
  
  useEffect(()=>{
    const fetchData = async()=>{
      const productData = await getAllProducts();
      const cartData = await getUserCart(1);
      prodDispatch({type:"AddProductList",productData});
    }
    fetchData();
  },[]);

  return (
    <Container>
      <NavGlobal />
      <Routes>
        <Route element={<UserAuth isUserAuth={true} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route element={<AdminAuth isAdmin={true} />}>
            <Route path="/admin" element={<HomeAdmin />} />
          </Route>
          <Route path='/add' element={<AddProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    <UserContext.Provider value={isLoggedIn}>
      <isAdminContext.Provider value={isAdmin}>
        <AllProductContext.Provider value={filteredProduct}>
          <CartContext.Provider value={}>

          </CartContext.Provider>
        </AllProductContext.Provider>
      </isAdminContext.Provider>
    </UserContext.Provider>
    </Container>
  )
}

export default App
