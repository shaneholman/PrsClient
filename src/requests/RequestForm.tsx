import { Link, useNavigate, useParams } from "react-router-dom";
import { Request } from "./Request";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { requestAPI } from "./RequestAPI";
import { useState } from "react";
import { User } from "../users/user";
import { userAPI } from "../users/UserAPI";

function RequestForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const requestId = Number(id);
  const [users, setUser] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>({
    defaultValues: async () => {
      let usersData = await userAPI.list();
      setUser(usersData);

      if (!requestId) {
        let newRequest = new Request({ UserId: users });
        return Promise.resolve(newRequest);
      } else {
        return await requestAPI.find(requestId);
      }
    },
  });
  const save: SubmitHandler<Request> = async (request) => {
    try {
      if (request.isNew) {
        await requestAPI.post(request);
      } else {
        await requestAPI.put(request);
      }
      toast.success("Successfully saved!");
      navigate("/requests");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // function save(request: Request) {
  //   console.log(request);
  // }

  return (
    <div className="col.">
      <form className="row g-3" onSubmit={handleSubmit(save)} noValidate>
        <div className=" col-md-12">
          <label className="form-label" htmlFor="description">
            <h5>Description :</h5>
          </label>
          <input
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className={`form-control ${errors.description && "is-invalid"} `}
            type="text"
            autoFocus
          />
          <div className="invalid-feedback">{errors?.description?.message}</div>
        </div>

        <div className="col-md-12">
          <label className="form-label" htmlFor="justification">
            <h5>Justification :</h5>
          </label>
          <input
            id="justification"
            {...register("justification", {
              required: "Justification is required",
            })}
            className={`form-control ${errors.justification && "is-invalid"} `}
            type="text"
          />
          <div className="invalid-feedback">{errors?.justification?.message}</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="deliveryMode" className="form-label">
            <h5>Delivery Mode :</h5>
          </label>
          <select
            id="deliveryMode"
            className={`form-select ${errors.deliveryMode && "is-invalid"}`}
            {...register("deliveryMode", { required: "Delivery Mode is required" })}
          >
            <option value="">Select...</option>
            <option value="Pickup">Pickup</option>
            <option value="Delivery">Delivery</option>
            <option value="Signature Delivery">Signature Delivery</option>
          </select>
          <div className="invalid-feedback">{errors?.deliveryMode?.message}</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="status" className="form-label">
            <h5>Status :</h5>
          </label>
          <select
            id="status"
            className={`form-select ${errors.status && "is-invalid"}`}
            {...register("deliveryMode", { required: "Delivery type is required" })}
          >
            <option value="">Select...</option>
            <option value="NEW">New</option>
            <option value="REVIEW">Review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <div className="invalid-feedback">{errors?.deliveryMode?.message}</div>
        </div>
        <div>
          <label className="form-label" htmlFor="user">
            <h5>User : </h5>
          </label>
          <select
            {...register("userId", { required: "User request is required" })}
            className={`form-select ${errors.userId && "is-invalid"}`}
            id="user"
          >
            <option value="">Select...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstname} " " {user.lastname}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.userId?.message}</div>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-outline-primary">
            Save
          </button>
          <Link className="btn btn-outline-secondary" to="/requests">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RequestForm;
