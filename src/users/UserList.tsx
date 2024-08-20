import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";
import { Users } from "./User";

import UserCard from "./UserCard";
import { userAPI } from "./UserAPI";

function UsersList() {
  const [users, setUsers] = useState<Users[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadUsers() {
    try {
      setBusy(true);
      let data = await userAPI.list();
      setUsers(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    loadUsers();
  }, []);

  async function remove(user: Users) {
    if (confirm("Are you sure you want to delete this Users?")) {
      if (user.id) {
        await userAPI.delete(user.id);
        let updatedUsers = users.filter((p) => p.id !== user.id);
        setUsers(updatedUsers);
        toast.success("Successfully deleted.");
      }
    }
  }

  return (
    <section className="d-flex flex-wrap gap-4 bg-body-tertiary rounded p-3 ">
      {busy && (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading . . . </span>
          </div>
        </div>
      )}

      {users.map((user) => (
        <UserCard key={user.id} user={user} onRemove={remove} />
      ))}
    </section>
  );
}
export default UsersList;
