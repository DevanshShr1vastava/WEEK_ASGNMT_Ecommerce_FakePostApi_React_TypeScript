import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getCategories, IProductData } from "../utils/ProductAPI";
import { AllProductContext } from "./AppContexts";
import { useNavigate } from "react-router-dom";




const AddProduct = () => {
  const productContext = useContext(AllProductContext);
  const {products, productDispatch} = productContext;
  const defaultState = {
    id: Number(products.length) + 2,
    title : "",
    description : "",
    category : "",
    image : "",
    rating : {
      rate : ""
    },
    price : 0
  };
  const [formData, setFormData] = useState<IProductData>(defaultState);
  const [categories,setCategories] = useState<string[]>([]);
  useEffect(()=>{
    const fetchCategory = async()=>{
      const categoryData = await getCategories();
      setCategories(categoryData);
    };
    fetchCategory();
  },[]);
  
  const navigate=useNavigate();

  const handleSubmit = ()=>{
    productDispatch({type:"AddProduct",newProduct:formData})
    setFormData(defaultState);
    navigate('/admin');
  }
  
  return <Container>
    <h2>Add New Product</h2>
    <br />
    <Form>
      <Row>
        <Form.Group className="mb-3" controlId='formGroupTitle'>
          <Form.Label>Product Title</Form.Label>
          <Form.Control type="text" value={formData.title} onChange={(e)=>setFormData({...formData, title : e.target.value})} />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId='formGroupDescription'>
          <Form.Label>Product Description</Form.Label>
          <Form.Control as="textarea" value={formData.description} onChange={(e)=>setFormData({...formData, description : e.target.value})} />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId='formGroupCategory'>
          <Form.Label>Product Category</Form.Label>
          <Form.Select value={formData.category} onChange={(e)=>setFormData({...formData, category : e.target.value})} >
            {categories.map((category,index)=>(
              <option key={index} value = {category}>{category}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formGroupPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control type="number" value = {formData.price} onChange = {(e)=>setFormData({...formData, price : Number(e.target.value)})} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGroupRating">
          <Form.Label>Product Rating</Form.Label>
          <Form.Control type="text" value = {formData.rating.rate} onChange = {(e)=>setFormData({...formData, rating : { rate : e.target.value}})} />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId='formGroupImage'>
          <Form.Label>Product Image</Form.Label>
          <Form.Control type="text" value={formData.image} onChange={(e)=>setFormData({...formData, image : e.target.value})} />
        </Form.Group>
      </Row>
      <Row>
        <Button variant="warning" onClick={handleSubmit}>Add Product</Button>
      </Row>
    </Form>
  </Container>
};

export default AddProduct;
