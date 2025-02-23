import { Container } from "react-bootstrap";
import {  Routes,Route,BrowserRouter as Router, Navigate } from "react-router-dom";
import NavGlobal from "./components/NavGlobal";
import UserAuth from "./components/UserAuth";
import Login from "./components/Login";
import Home from "./components/Home";
import AdminAuth from "./components/AdminAuth";
import HomeAdmin from "./components/HomeAdmin";
import AddProduct from "./components/AddProduct";
import NotFound from "./components/NotFound";
import { useEffect, useReducer, useState } from "react";
import { getAllProducts, IProductData } from "./utils/ProductAPI";
import { AllProductContext, CartContext } from "./components/AppContexts";
import { prodReducer } from "./utils/ProductReducer";
import { cartReducer } from "./utils/CartReducer";
import { getUserCart } from "./utils/CartAPI";
import Logout from "./components/Logout";

function App() {
  const [product,prodDispatch] = useReducer(prodReducer,[]);
  const [cart,cartDispatch] = useReducer(cartReducer,[]);

  const [filteredProduct,setfilteredProduct] = useState<IProductData[]>(product);

  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin,setIsAdmin] = useState<boolean>(false)

  

  const handleLogin = (token:string | null ,username:string)=>{
      if(token!==null){
          setIsLoggedIn(true);
          if(username === "donero"){
            setIsAdmin(true);
          }
      }
  }

  const handleLogOut = ()=>{
    setIsAdmin(false);
    setIsLoggedIn(false);
  }

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const productData = await getAllProducts();
        const cartData = await getUserCart(1);

        prodDispatch({type:"AddProductList",productData});
        cartDispatch({type:"GetCart",cartData});
      }
      catch(error){
        console.error("Error fetching data : ",error);
      }
    };

    fetchData();
  },[]);

  useEffect(()=>{
    setfilteredProduct(product);
  },[product]);

  return (
    <Container>
      <Router>
        <NavGlobal />

        <AllProductContext.Provider value={filteredProduct}>
          <CartContext.Provider value={cart}>
            <Routes>
              
              <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
              <Route path = "/logout" element={<Logout handleLogout={handleLogOut} />} />

              <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />

              
              <Route element={<UserAuth isUserAuth={isLoggedIn} />}>
                <Route path="/add" element={<AddProduct />} />

                <Route element={<AdminAuth isAdmin={isAdmin} />}>
                  <Route path="/admin" element={<HomeAdmin />} />
                </Route>

              </Route>

              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartContext.Provider>
        </AllProductContext.Provider>
      </Router>
    </Container>
  )
}

export default App
