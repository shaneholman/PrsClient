
import ProductList from "../Products/ProductList";
import { Link } from "react-router-dom";

function ProductsPage() {
  return (
    
    <>
      <div className=" d-flex justify-content-between">
        <h4>Products</h4>
        <Link to={"/products/create"} role="button1" className="btn btn-outline-secondary">
         + Add Product
        </Link>
      </div>

      <hr />

        <ProductList />
      
    </>
  );
}
export default ProductsPage;
