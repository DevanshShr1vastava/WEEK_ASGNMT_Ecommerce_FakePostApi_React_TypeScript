import { createContext } from "react";
import { IProductData } from "../utils/ProductAPI";
import { ICartData } from "../utils/CartAPI";
import { IUserData } from "../utils/Authentication";

interface IAppContext {
    user : IUserData;
    isAdmin : boolean;
    filteredProductData : IProductData[];
    allProductData : IProductData[];
    cartData : ICartData
}

export const AppContext = createContext<IAppContext | undefined>(undefined);