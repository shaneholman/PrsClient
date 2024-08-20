import ProductForm from "./ProductForm";

function ProductCreatePage() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>New Product</h4>
      </div>
      <hr />
      <ProductForm />
    </>
  );
}

export default ProductCreatePage;
