import { Link, useNavigate, useParams } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useState } from "react";
import { Vendor } from "../Vendors/Vendor";
import { vendorAPI } from "../Vendors/VendorAPI";
import { userAPI } from "./UserAPI";
import { User } from "./user";

function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const [vendors, setVendor] = useState<Vendor[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: async () => {
      let vendorsData = await vendorAPI.list();
      setVendor(vendorsData);

      if (!userId) {
        let newUser = new User({ vendorId: vendors });
        return Promise.resolve(newUser);
      } else {
        return await userAPI.find(userId);
      }
    },
  });
  const save: SubmitHandler<User> = async (user) => {
    try {
      if (user.isNew) {
        await userAPI.post(user);
      } else {
        await userAPI.put(user);
      }
      toast.success("Successfully saved!");
      navigate("/users");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // function save(user: User) {
  //   console.log(user);
  // }

  return (
    <div className="col.">
      <form className="row g-3" onSubmit={handleSubmit(save)} noValidate>
        <div className=" col-md-6">
          <label className="form-label" htmlFor="firstname">
            <h5>Firstname : </h5>
          </label>
          <input
            id="firstname"
            {...register("firstname", {
              required: "Firstname is required",
            })}
            className={`form-control ${errors.firstname && "is-invalid"} `}
            type="text"
            autoFocus
          />
          <div className="invalid-feedback">{errors?.firstname?.message}</div>
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="lastname">
            <h5>Lastname :</h5>
          </label>
          <input
            id="lastname"
            {...register("lastname", {
              required: "Lastname is required",
            })}
            className={`form-control ${errors.lastname && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.lastname?.message}</div>
        </div>
        <div className="col-5">
          <label className="form-label" htmlFor="username">
            <h5>Username :</h5>
          </label>
          <input
            id="username"
            {...register("username", {
              required: "Unit is required",
            })}
            className={`form-control ${errors.username && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.username?.message}</div>
        </div>
        <div className="col-md-5">
          <label className="form-label" htmlFor="password">
            <h5>Password :</h5>
          </label>
          <input
            id="password"
            {...register("password", {
              required: "Password is required",
            })}
            className={`form-control ${errors.password && "is-invalid"} `}
            type="password"
          />
          <div className="invalid-feedback">{errors?.password?.message}</div>
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor="phone">
            <h5>Phone :</h5>
          </label>
          <input
            id="phone"
            {...register("phone", {
              required: "Price is required",
            })}
            className={`form-control ${errors.phone && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.phone?.message}</div>
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor="email">
            <h5>Email :</h5>
          </label>
          <input
            {...register("email", { required: "Vendor is required" })}
            className={`form-control ${errors.email && "is-invalid"}`}
            id="vendor"
          ></input>
          <div className="invalid-feedback">{errors?.email?.message}</div>
        </div>
        <div className="mb-1">
          <label className="form-label me-4">
            <h5>Role :</h5>{" "}
          </label>
          <div className="form-check form-check-inline">
            <input type="checkbox" className="form-check-input" {...register("isReviewer")} />
            <label className="form-check-label">Reviewer</label>
          </div>
          <div className="form-check form-check-inline">
            <input type="checkbox" className="form-check-input" {...register("isAdmin")} />
            <label className="form-check-label">Admin</label>
          </div>
        </div>

        <hr />

        <div className="d-flex  gap-3">
          <button type="submit" className="btn btn-outline-primary">
            Save
          </button>
          <Link className="btn btn-outline-secondary" to="/users">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
