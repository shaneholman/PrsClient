import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { User } from "./user";

interface UserCardProps {
  user: User;
  onRemove: (user: User) => void;
}

function UserCard({ user, onRemove }: UserCardProps) {
  return (
    <div className="d-flex gap-4 " style={{ width: "25rem" }}>
      <div
        style={{ width: "6rem", height: "6rem" }}
        className="d-flex bg-secondary fs-3 text-white align-items-center justify-content-center rounded-circle me-2"
      >
        <div className="">
          {user.firstname[0]} {user.lastname[0]}
        </div>
      </div>
      <address>
        <strong>
          {user.firstname} {user.lastname}
        </strong>
        <br />
        {user.isAdmin && "Admin"}
        {user.isAdmin && user.isReviewer && " | "}
        {user.isReviewer && "Reviewer"}
        {/* <span className="text-secondary">Admin</span> */}
        <br />
        <span className="text-secondary">{user.phone}</span>
        <br />
        <div className="d-flex justify-content-start"></div>
        <div className="d-flex gap-2">
          <Link className="small btn btn-outline-secondary" to={`/users/edit/${user.id}`}>
            edit
          </Link>

          <a
            className="small btn btn-outline-primary"
            onClick={(event: SyntheticEvent) => {
              event.preventDefault();
              onRemove(user);
            }}
          >
            delete
          </a>
        </div>
      </address>
    </div>
  );
}

//     <article className="card p-4 " key={user.id}>
//       <strong> {user.username}</strong>
//       <small className="bg-body-secondary rounded p-1">User ID : {user.id}</small>
//       <small>FirstName : {user.firstname}</small>
//       <small>LastName : {user.lastname}</small>
//       {/* <small>
//         Price : {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(user.price)}
//       </small> */}
//       <small>Phone : {user.phone}</small>
//       <small>Email : {user.email}</small>
//       <div className="d-flex gap-2">
//         <Link className="small btn btn-outline-secondary" to={`/users/edit/${user.id}`}>
//           edit
//         </Link>

//         <a
//           className="small btn btn-outline-primary"
//           onClick={(event: SyntheticEvent) => {
//             event.preventDefault();
//             onRemove(user);
//           }}
//         >
//           delete
//         </a>
//       </div>
//     </article>
//   );
// }

export default UserCard;
