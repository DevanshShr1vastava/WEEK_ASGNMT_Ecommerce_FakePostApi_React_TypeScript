import { useState } from "react";
import { IProductData } from "../utils/ProductAPI";
import { Button, Form } from "react-bootstrap";
import { ActionType } from "../utils/ProductReducer";

interface IHandleStuff{
    product: IProductData;
    productDispatch : React.Dispatch<ActionType>;
    categories:string[];
}

const AdminRowComponent = ({productDispatch,product,categories}:IHandleStuff) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<IProductData>({
        id : product.id,
        title : product.title,
        description : product.description,
        category : product.category,
        image : product.image,
        rating : {
            rate : product.rating.rate,
        },
        price : product.price,
    });

    const handleSave = ()=>{
       const updatedProduct: IProductData = {
        ...formData
       };
        productDispatch({type:"UpdateProduct",updatedProduct});
        setIsEditing(false);
    }

    const handleDelete = ()=>{
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if(confirmDelete) productDispatch({type:"DeleteProduct", id:product.id});
    }
    
    return (
        <tr key={product.id}>
            {isEditing?(<>
                <td>
                    <Form.Control type="text" value={formData.title} onChange = {(e)=>setFormData({...formData, title : e.target.value})}/>
                </td>
                <td>
                    <Form.Control as="textarea" value={formData.description} onChange = {(e)=>setFormData({...formData, description : e.target.value})}/>
                </td>
                <td>
                    <Form.Select aria-label="Category Select" value={formData.category}>
                        {categories.map((category)=>(
                            <option value = {category}>{category}</option>
                        ))}
                    </Form.Select>
                </td>
                <td>
                    <Form.Control type="text" value={formData.image} onChange = {(e)=>setFormData({...formData, image : e.target.value})}/>
                </td>
                <td>
                    <Form.Control type="text" value={formData.rating.rate} onChange = {(e)=>setFormData({...formData, rating :{rate : (e.target.value)}})}/>
                </td>
                <td>
                    <Form.Control type="number" value={formData.price} onChange = {(e)=>setFormData({...formData, price : Number(e.target.value)})}/>
                </td>
                <td>
                    <Button aria-label="Save Task" variant = "success" onClick={handleSave}>💾</Button>
                    <Button aria-label="Delete Task" variant="danger" onClick={handleDelete}>🗑️</Button>
                </td>
            </>):(<>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.image}</td>
                <td>{product.rating.rate}</td>
                <td>{product.price}</td>
                <td>
                    <Button aria-label="Edit Task" onClick={()=>setIsEditing(true)}>✏️</Button>
                    <Button aria-label="Delete Task" variant="danger" onClick={handleDelete}>🗑️</Button>
                </td>
            </>)}
        </tr>
    );
};

export default AdminRowComponent;
