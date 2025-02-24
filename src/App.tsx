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
import { getAllProducts, getCategories, IProductData } from "./utils/ProductAPI";
import { AllProductContext, CartContext } from "./components/AppContexts";
import { prodReducer } from "./utils/ProductReducer";
import { cartReducer } from "./utils/CartReducer";
import { getUserCart, ICartData } from "./utils/CartAPI";
import Logout from "./components/Logout";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [products,productDispatch] = useReducer(prodReducer,[]);
  const [cart,cartDispatch] = useReducer(cartReducer,{
    id:0,
    userId:1,
    date : new Date(),
    products : [],
    __v : 0
});

  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin,setIsAdmin] = useState<boolean>(false)
  const [categoryData, setCategoryData] = useState<string[]>([])

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

  const {data:productData} = useQuery<IProductData[]>({
    queryKey : ["products"],
    queryFn : getAllProducts,
    retry : false,
    refetchOnWindowFocus : false
  });

  const {data:cartData} = useQuery<ICartData>({
    queryKey : ["carts"],
    queryFn : ()=>getUserCart(1),
    retry : false,
    refetchOnWindowFocus : false
  });

  const {data : catData } = useQuery<string[]>({
    queryKey : ["categories"],
    queryFn : getCategories,
    retry : false,
    refetchOnWindowFocus : false,
    refetchOnMount : false
  })

  useEffect(()=>{
    if(productData) productDispatch({type:"AddProductList",productData});
    if(cartData) cartDispatch({type:"GetCart",cartData});
    if(catData) setCategoryData(catData);
  },[productData,cartData,catData]);

  


  return (
    <Container fluid>
      <Router>
        <NavGlobal />

        <AllProductContext.Provider value={{products, productDispatch}}>
          <CartContext.Provider value={{ cart, cartDispatch }}>
            <Routes>
              
              <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
              <Route path = "/logout" element={<Logout handleLogout={handleLogOut} />} />

              <Route path="/" element={isLoggedIn ? <Home categoryData = {categoryData}/> : <Navigate to="/login" replace />} />

              
              <Route element={<UserAuth isUserAuth={isLoggedIn} />}>
                <Route path="/add" element={<AddProduct categoryData = {categoryData}/>} />

                <Route element={<AdminAuth isAdmin={isAdmin} />}>
                  <Route path="/admin" element={<HomeAdmin categoryData = {categoryData}/>} />
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
