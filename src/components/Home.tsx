import { useContext, useEffect, useState } from "react";
import { AllProductContext, CartContext } from "./AppContexts";
import { Button, Card, Col, Container, Dropdown, ListGroup, Modal, Row } from "react-bootstrap";
import { IProductData } from "../utils/ProductAPI";

import { ICartProducts } from "../utils/CartAPI";

interface IHomeProps{
  categoryData : string[];
}

const Home = ({categoryData}:IHomeProps) => {
  const productContext = useContext(AllProductContext);
  const cartContext = useContext(CartContext) ?? { cart: { products: [] }, cartDispatch: () => {} };

  const {cart, cartDispatch} = cartContext;
  const {products} = productContext;

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products?.filter((product) => product.category === selectedCategory)
    : products;

  const [show,setShow] = useState(false);
  const [modalData, setModalData] = useState<IProductData[]>([{
    id: 0,
    title : "",
    description : "",
    category : "",
    image : "",
    rating : {
      rate : ""
    },
    price : 0
  }]);

  const handleClose = ()=> setShow(false);
  const handleShow = ()=> setShow(true);

  const showModalProduct = (id:number)=>{
    setModalData(products.filter((prod)=>prod.id === id));
    handleShow();

  }

  const handleAddToCart = (userId: number, product: ICartProducts) => {
    if(cart.products?.find((prod)=>prod.productId===product.productId)){
      handleUpdateCart(1, { productId: product.productId, quantity: product.quantity + 1 })
    }
    else{
      cartDispatch({ type: "AddToCart", userId, newProd: product });
    }
  };

  const handleUpdateCart = (userId: number, updatedProduct: ICartProducts) => {
    cartDispatch({ type: "UpdateCart", userId, updatedProd: updatedProduct });
  };

  const handleRemoveFromCart = (productId: number) => {
    cartDispatch({ type: "RemoveFromCart", productId });
  };

  const handleClearCart = () => {
    cartDispatch({ type: "DeleteCart" });
  };

  useEffect(() => {
    setCategories(categoryData);
  }, []);

  return (
    <Container fluid className="mt-4">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData[0].title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="card mb-3">           
              <img style={{ height: "250px", objectFit: "contain" }} id='show-product-image' src={modalData[0].image} className="card-img-top" alt="..."/> 
            
              <div className="card-body">
                <p id='show-product-description' className="card-text"> {modalData[0].description} </p>
                <p className="card-text"><small className="text-body-secondary">
                  <ul>
                    <li id="show-product-rating">Rating : {modalData[0].rating.rate}</li>
                    <li id="show-product-price">Price : {modalData[0].price}</li>
                    <li id="show-product-category">Category : {modalData[0].category}</li>
                  </ul>
                </small></p>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
       
        <Col md={8}>
          <h3>Products</h3>
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="primary">Select Category</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedCategory(null)}>All</Dropdown.Item>
              {categories.map((category) => (
                <Dropdown.Item key={category} onClick={() => setSelectedCategory(category)}>
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Row>
            {filteredProducts?.map((product) => (
              <Col key={product.id} md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Img variant="top" src={product.image} style={{ height: "150px", objectFit: "contain" }} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                    <Button
                      variant="success"
                      className = "mx-3"
                      onClick={() => handleAddToCart(1, { productId: product.id, quantity: 1 })}
                    >
                      Add to Cart
                    </Button>
                    <button className="btn btn-warning mx-3" onClick={()=>showModalProduct(product.id)}>Show Details</button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        
        <Col md={4}>
          <h3>Cart</h3>
          {!cart?.products || cart.products.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ListGroup>
              {cart.products.map((item:ICartProducts) => {
                const product = products?.find((p) => p.id === item.productId);
                return product ? (
                  <ListGroup.Item key={item.productId} className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{product.title}</h5>
                      <p>
                        ${product.price} x {item.quantity}
                      </p>
                    </div>
                    <div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="mx-1 mt-1"
                        onClick={() => handleUpdateCart(1, { productId: item.productId, quantity: item.quantity + 1 })}
                      >
                        +
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="mx-1 mt-1"
                        disabled={item.quantity <= 1}
                        onClick={() => handleUpdateCart(1, { productId: item.productId, quantity: item.quantity - 1 })}
                      >
                        -
                      </Button>
                      <br />
                      <br />
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="mx-1"
                        onClick={() => handleRemoveFromCart(item.productId)}
                      >
                        Remove
                      </Button>
                    </div>
                  </ListGroup.Item>
                ) : null;
              })}
            </ListGroup>
          )}
          {cart?.products?.length > 0 && (
            <Button variant="danger" className="mt-3" onClick={handleClearCart}>
              Clear Cart
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
