import { createContext } from "react";
import { IProductData } from "../utils/ProductAPI";
import { ICartData } from "../utils/CartAPI";
import { IUserData } from "../utils/Authentication";
import { ActionType as CartActionType } from "../utils/CartReducer";
import { ActionType as ProductActionType } from "../utils/ProductReducer";

export const UserContext = createContext<IUserData | undefined>(undefined);


interface ICartContext {
  cart: ICartData;
  cartDispatch: React.Dispatch<CartActionType>;
}

interface IProductContext { 
  products : IProductData[];
  productDispatch : React.Dispatch<ProductActionType>
}

export const AllProductContext = createContext<IProductContext>({
  products : [],
  productDispatch : ()=> {}
});

export const CartContext = createContext<ICartContext>({cart: {
  id: 0,
    userId: 1,
    date: new Date(),
    products: [],
    __v: 0,
  },
  cartDispatch: () => {},});

