import { addToCart,updateCart,deleteCart, ICartData } from "./CartAPI";

interface ICartAdd{
    type : "AddToCart";
    userId : number;
    newProd : ICartData;
};

interface ICartUpdate{
    type : "UpdateCart";
    userId : number;
    updatedProd : ICartData;
}

interface ICartDelete{
    type : "DeleteCart";
}

interface ICartGet {
    type : "GetCart";
    cartData : ICartData;
}

type ActionType = ICartAdd | ICartDelete | ICartUpdate | ICartGet;

export const cartReducer = (state: ICartData[], action : ActionType):ICartData[]=>{
    switch(action.type){
        case "AddToCart": 
            addToCart(action.userId,action.newProd)
            return [...state,action.newProd]
        case "DeleteCart":
            deleteCart();
            return state.filter((cart)=>cart.id === 0);
        case "UpdateCart" :
            updateCart(action.userId,action.updatedProd);
            return state.map((cart)=>cart.id === action.updatedProd.id?cart = action.updatedProd:cart);
        case "GetCart" : 
            return [action.cartData];

        default:
            return state;
    }
}