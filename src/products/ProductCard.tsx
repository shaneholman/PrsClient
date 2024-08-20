import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Product } from "./Product";

interface ProductCardProps {
  product: Product;
  onRemove: (product: Product) => void;
}

function ProductCard({ product, onRemove }: ProductCardProps) {
  return (
    <article className="card p-4 " key={product.id}>
      {/* <Link to={`/product/edit/${product.id}`}></Link> */}
      <strong> {product.name}</strong>
      <small className="bg-body-secondary rounded p-1">Product Code : {product.code}</small>
      <small>Address : {product.address}</small>
      <small>City : {product.city}</small>
      <small>State : {product.state}</small>
      <small> {product.zipCode}</small>
      <small>Phone : {product.phone}</small>
      <small>Email :{product.email}</small>
      <div className="d-flex gap-2">
        <Link className="small btn btn-outline-secondary" to={`/products/edit/${product.id}`}>
          edit
        </Link>

        <a
          className="small btn btn-outline-primary"
          onClick={(event: SyntheticEvent) => {
            event.preventDefault();
            onRemove(product);
          }}
        >
          delete
        </a>
      </div>
    </article>
  );
}

export default ProductCard;
