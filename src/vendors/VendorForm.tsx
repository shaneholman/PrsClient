import { Link, useNavigate, useParams } from "react-router-dom";
import { Vendor } from "./Vendor";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { vendorAPI } from "./VendorAPI";

function VendorForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const vendorId = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Vendor>({
    defaultValues: async () => {
      if (!vendorId) {
        return Promise.resolve(new Vendor());
      } else {
        return await vendorAPI.find(vendorId);
      }
    },
  });
  const save: SubmitHandler<Vendor> = async (vendor) => {
    try {
      if (vendor.isNew) {
        await vendorAPI.post(vendor);
      } else {
        await vendorAPI.put(vendor);
      }
      toast.success("Successfully saved!");
      navigate("/vendors");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // function save(vendor: Vendor) {
  //   console.log(vendor);
  // }

  return (
    <div className="col.">
      <form className="row g-3" onSubmit={handleSubmit(save)} noValidate>
        <div className=" col-md-6">
          <label className="form-label" htmlFor="name">
            <h5>Vendor Name :</h5>
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
          <label className="form-label" htmlFor="code">
            <h5>Code :</h5>
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

        <div className="col-12">
          <label className="form-label" htmlFor="address">
            <h5>Address :</h5>
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
        <div className="col-md-5">
          <label className="form-label" htmlFor="city">
            <h5>City :</h5>
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

        <div className="col-md-3">
          <label className="form-label" htmlFor="state">
            <h5>State :</h5>
          </label>
          <select
            id="state"
            {...register("state", {
              required: "State is required",
            })}
            className={`form-select ${errors.state && "is-invalid"} `}
          >
            <option selected></option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <div className="invalid-feedback">{errors?.state?.message}</div>
        </div>
        <div className="col-md-3">
          <label className="form-label" htmlFor="zipCode">
            <h5>ZipCode :</h5>
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

        <div className="col-md-6">
          <label className="form-label" htmlFor="phone">
            <h5>Phone :</h5>
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

        <div className="col-md-6">
          <label className="form-label" htmlFor="email">
            <h5>Email :</h5>
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
