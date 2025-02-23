import axios from "axios"

type TRating ={
    rate : string;
}

export interface IProductData {
    title: string;
    id:number;
    description : string;
    image: string;
    category : string;
    price : number;
    rating : TRating;
}

const instance = axios.create({
    baseURL:"https://fakestoreapi.com/products"
});

export const getAllProducts = async():Promise<IProductData[]>=>{
    try{
        const response = await instance.get('/');
        const productData = await response.data;
        return productData;
    }
    catch(error){
        console.error(error);
        return [];
    }
}

export const getCategories = async()=>{
    try{
        const response = await instance.get('/categories');
        const categoryData = await response.data;
        console.log(categoryData);
    }
    catch(error){
        console.error(error)
    }
}

export const getProductByCategory = async(category:string)=>{
    try{
        const response = await instance.get(`/category/${category}`);
        const categoryProductData = await response.data;
        console.log(categoryProductData);
    }
    catch(error){
        console.error(error);
    }
}

export const addNewProduct = async(newProdData : IProductData) =>{
    try{
        const response = await instance.post('/',{newProdData});
        const postData = await response.data;
        const postStatus = response.status;

        console.log(postData, postStatus);
    }
    catch(error){
        console.error(error);
    }
}

export const updateProduct = async(updatedData : IProductData) =>{
    try{
        const response = await instance.patch(`/${updatedData.id}`,{updatedData});
        const updateResponse = await response.data;
        const updateStatus = response.status;

        console.log(updateResponse, updateStatus);
    }
    catch(error){
        console.error(error);
    }
}

export const deleteProduct = async(productId : number) =>{
    try{
        const response = await instance.delete(`/${productId}`);

        const responseData = await response.data;
        const responseStatus = response.status;

        console.log(responseData, responseStatus);
    }
    catch(error){
        console.error(error);
    }
}

