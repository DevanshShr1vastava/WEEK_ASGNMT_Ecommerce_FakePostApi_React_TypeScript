import { useContext, useEffect, useState } from "react";
import { AllProductContext } from "./AppContexts";
import { Container, Dropdown, Table } from "react-bootstrap";
import AdminRowComponent from "./AdminRowComponent";

interface IAdminProps {
  categoryData : string[];
}

const HomeAdmin = ({categoryData}:IAdminProps) => {
  const productContext = useContext(AllProductContext);

  const {products,productDispatch} = productContext;

  const [categories,setCategories] = useState<string[]>([]);
  const [selectedCategory , setSelectedCategory] = useState<string|null>(null);
  

  const categorizedProduct = selectedCategory?products?.filter((product)=>product.category === selectedCategory) : products;

  useEffect(()=>{
    setCategories(categoryData)
  },[]);

  return (
    <Container fluid>
        <br />
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
        <Table striped>
          <thead>
            <tr>
              <th>title</th>
              <th>description</th>
              <th>category</th>
              <th>image source</th>
              <th>rating</th>
              <th>price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categorizedProduct?.map((product)=>(
              <AdminRowComponent 
              categories={categories}
              product={product}
              productDispatch={productDispatch}
              key ={product.id} />
            ))}
          </tbody>
        </Table>
    </Container>
  );
};

export default HomeAdmin;
