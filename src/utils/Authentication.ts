import axios from "axios";

const instance = axios.create({
    baseURL : "https://fakestoreapi.com/users"
});

export interface IUserData {
    id : number;
    email : string;
    username : string;
    password : string;
    name : {
        firstname : string;
        lastname : string;
    };
    address : {
        city : string;
        street : string;
        number : number;
        zipcode : string;
        geolocation : {
            lat : string;
            long : string;
        }
    };
    phone : string;
}

export const getAllUsers = async()=>{
    try{
        const response = await instance.get('/');
        const userData = await response.data;
        const responseStatus =response.status;

        console.log(userData, responseStatus);
    }
    catch(error){
        console.error(error);
    }
}

export const getSingleUser = async(userId : number) =>{
    try{
        const response = await instance.get(`/${userId}`);
        const userData = await response.data;

        console.log(userData);
    }
    catch(error){
        console.error(error);
    }
}

export const loginUser = async(username : string, password : string)=>{
    try{

        const response = await axios.post('https://fakestoreapi.com/auth/login',{
            username,
            password
        });
        const responseData = await response.data;
        const responseStatus = response.status;
        
        console.log(responseData, responseStatus);
    }
    catch(error){
        console.error(error);
    }
}
