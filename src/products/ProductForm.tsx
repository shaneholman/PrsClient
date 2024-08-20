import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "./Product";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { productAPI } from "./ProductAPI";
import { useState } from "react";
import { Vendor } from "../Vendors/Vendor";
import { vendorAPI } from "../Vendors/VendorAPI";

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const [vendors, setVendor] = useState<Vendor[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: async () => {
      let vendorsData = await vendorAPI.list();
      setVendor(vendorsData);

      if (!productId) {
        let newProduct = new Product({ vendorId: vendors });
        return Promise.resolve(newProduct);
      } else {
        return await productAPI.find(productId);
      }
    },
  });
  const save: SubmitHandler<Product> = async (product) => {
    try {
      if (product.isNew) {
        await productAPI.post(product);
      } else {
        await productAPI.put(product);
      }
      toast.success("Successfully saved!");
      navigate("/products");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // function save(product: Product) {
  //   console.log(product);
  // }

  return (
    <div className="col.">
      <form className="row g-3" onSubmit={handleSubmit(save)} noValidate>
        <div className=" col-md-6">
          <label className="form-label" htmlFor="name">
            <h5>Product Name :</h5>
          </label>
          <input
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
            className={`form-control ${errors.name && "is-invalid"} `}
            type="text"
            autoFocus
          />
          <div className="invalid-feedback">{errors?.name?.message}</div>
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="part number">
            <h5>Part Number :</h5>
          </label>
          <input
            id="part number"
            {...register("partNbr", {
              required: "Part Number is required",
            })}
            className={`form-control ${errors.partNbr && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.partNbr?.message}</div>
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="unit">
            <h5>Unit :</h5>
          </label>
          <input
            id="unit"
            {...register("unit", {
              required: "Unit is required",
            })}
            className={`form-control ${errors.unit && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.unit?.message}</div>
        </div>
        <div className="col-md-5">
          <label className="form-label" htmlFor="price">
            <h5>Price :</h5>
          </label>
          <input
            id="price"
            {...register("price", {
              required: "Price is required",
            })}
            className={`form-control ${errors.price && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.price?.message}</div>
        </div>

        <div className="col-md-3">
          <label className="form-label" htmlFor="vendor">
            <h5>Vendor :</h5>
          </label>
          <select
            {...register("vendorId", { required: "Vendor is required" })}
            className={`form-select ${errors.vendorId && "is-invalid"}`}
            id="vendor"
          >
            <option value="">Select...</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.vendorId?.message}</div>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-outline-primary">
            Save
          </button>
          <Link className="btn btn-outline-secondary" to="/products">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
