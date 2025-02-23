import { createContext } from "react";
import { IProductData } from "../utils/ProductAPI";
import { ICartData } from "../utils/CartAPI";
import { IUserData } from "../utils/Authentication";

type allProductType = IProductData[];
type filteredProductType = IProductData[];
type isAdminType = boolean;
type cartDataType = ICartData;
type userType = IUserData;

export const UserContext = createContext<userType | undefined>(undefined);

export const AllProductContext = createContext<allProductType | undefined>(undefined);

export const FilteredProductContext = createContext<filteredProductType | undefined>(undefined);

export const isAdminContext = createContext<isAdminType | boolean>(false);

export const CartContext = createContext<cartDataType | undefined>(undefined);

