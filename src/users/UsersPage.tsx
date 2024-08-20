
import { Link } from "react-router-dom";
import UsersList from "./UserList";

function UsersPage() {
  return (
    
    <>
      <div className=" d-flex justify-content-between">
        <h4>Users</h4>
        <Link to={"/users/create"} role="button1" className="btn btn-outline-secondary">
         + Add Users
        </Link>
      </div>

      <hr />

        <UsersList />
      
    </>
  );
}
export default UsersPage;
