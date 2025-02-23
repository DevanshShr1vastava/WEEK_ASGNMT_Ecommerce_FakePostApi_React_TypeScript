import axios from "axios";

interface ICartProducts { 
    productId : number;
    quantity : number;
}

export interface ICartData {
    id : number;
    userId : number;
    date : Date;
    products : ICartProducts[];
    __v : number;
}

const instance = axios.create({
    baseURL:"https://fakestoreapi.com/carts"
})

export const getUserCart = async(userId : number)=>{
    try{
        const response = await instance.get(`/user/${userId}`);
        const cartData = await response.data;
        console.log(cartData);
    }
    catch(error){
        console.error(error);
    }
}

export const addToCart = async(userId : number, prodData : ICartProducts[]) =>{
    try{
        const response = await instance.post('/',{
            userId,
            date : new Date(),
            products : prodData
        });  
        const responseData = await response.data;
        const responseStatus = response.status;
        console.log(responseData, responseStatus);
    }
    catch(err){
        console.error(err);
    }
}

export const updateCart = async(userId:number , prodData : ICartProducts[])=>{
    try{
        const response = await instance.patch(`/${userId}`,{
            userId,
            date : new Date(),
            products : prodData
        });
        const responseData = await response.data;
        const responseStatus = response.status;

        console.log(responseData, responseStatus);

    }
    catch(err){
        console.error(err);
    }
}

export const deleteCart = async()=>{
    try{

        const response = await instance.delete('/6');
        const responseData = await response.data;
        const responseStatus = response.status;
        console.log(responseData, responseStatus);
    }
    catch(error){
        console.error(error);
    }
}