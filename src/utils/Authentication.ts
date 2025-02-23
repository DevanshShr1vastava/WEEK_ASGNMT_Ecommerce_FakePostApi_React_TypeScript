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


export const getSingleUser = async(userId : number): Promise<IUserData|undefined> =>{
    try{
        const response = await instance.get(`/${userId}`);
        const userData = await response.data;
        console.log(userData);
        return userData;
    }
    catch(error){
        console.error(error);
        return undefined;
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
        return responseData;
    }
    catch(error){
        console.error(error);
    }
}
