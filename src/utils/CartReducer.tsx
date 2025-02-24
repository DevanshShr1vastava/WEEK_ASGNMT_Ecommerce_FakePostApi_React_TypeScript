import { addToCart,updateCart,deleteCart, ICartData,ICartProducts } from "./CartAPI";

interface ICartAdd{
    type : "AddToCart";
    userId : number;
    newProd : ICartProducts;
};

interface ICartUpdate{
    type : "UpdateCart";
    userId : number;
    updatedProd : ICartProducts;
}

interface ICartDelete{
    type : "DeleteCart";
}

interface IRemoveFromCart{
    type:"RemoveFromCart";
    productId: number;
}

interface ICartGet {
    type : "GetCart";
    cartData : ICartData;
}

export type ActionType = ICartAdd | ICartDelete | ICartUpdate | ICartGet | IRemoveFromCart;

export const cartReducer = (state: ICartData, action : ActionType):ICartData=>{
    switch(action.type){
        case "AddToCart": 
            addToCart(action.userId,action.newProd)
            return {
                    ...state,
                    products: [...(state.products ?? []), action.newProd]
                };
        case "DeleteCart":
            deleteCart();
            return {
                ...state,
                products: []
            };
        case "UpdateCart" :
            updateCart(action.userId,action.updatedProd);
            return {
                ...state,
                products: (state.products ?? []).map((prod) =>
                    prod.productId === action.updatedProd.productId ? action.updatedProd : prod
                ),
            };
        case "RemoveFromCart":
            return {
                ...state,
                products: (state.products ?? []).filter((item) => item.productId !== action.productId),
            };
        case "GetCart" : 
            return action.cartData;

        default:
            return state;
    }
}