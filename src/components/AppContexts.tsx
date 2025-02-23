import { createContext } from "react";
import { IProductData } from "../utils/ProductAPI";
import { ICartData } from "../utils/CartAPI";
import { IUserData } from "../utils/Authentication";

export const UserContext = createContext<IUserData | undefined>(undefined);

export const IsLoggedIn = createContext<boolean>(false);

export const AllProductContext = createContext<IProductData[] | undefined>(undefined);

export const FilteredProductContext = createContext<IProductData[] | undefined>(undefined);

export const isAdminContext = createContext<boolean>(false);

export const CartContext = createContext<ICartData[] | undefined>(undefined);

