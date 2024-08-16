import { Link } from "react-router-dom";
import { Vendor } from "./Vendor";
import { useForm } from "react-hook-form";

function VendorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Vendor>({});

  function save(vendor: Vendor) {
    console.log(vendor);
  }

  return (
    <div className="col">
      <form className="w-25 form-control row" onSubmit={handleSubmit(save)}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Vendor Name :
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

        <div className="mb-3">
          <label className="form-label" htmlFor="code">
            Code :
          </label>
          <input
            id="code"
            {...register("code", {
              required: "Code is required",
            })}
            className={`form-control ${errors.code && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.code?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="address">
            Address :
          </label>
          <input
            id="address"
            {...register("address", {
              required: "Address is required",
            })}
            className={`form-control ${errors.address && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.address?.message}</div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="city">
            City :
          </label>
          <input
            id="city"
            {...register("city", {
              required: "City is required",
            })}
            className={`form-control ${errors.city && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.city?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="state">
            State :
          </label>
          <input
            id="state"
            {...register("state", {
              required: "State is required",
            })}
            className={`form-control ${errors.state && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.state?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="zipCode">
            ZipCode :
          </label>
          <input
            id="zipCode"
            {...register("zipCode", {
              required: "ZipCode is required",
            })}
            className={`form-control ${errors.zipCode && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.zipCode?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="phone">
            Phone :
          </label>
          <input
            id="phone"
            {...register("phone", {
              required: "Phone number is required",
            })}
            className={`form-control ${errors.phone && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.phone?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            email :
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
            })}
            className={`form-control ${errors.email && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.email?.message}</div>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-outline-primary">
            Save
          </button>
          <Link className="btn btn-outline-secondary" to="/vendors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default VendorForm;
