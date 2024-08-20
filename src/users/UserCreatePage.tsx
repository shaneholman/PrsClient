import UserForm from "./UserForm";

function UserCreatePage() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>New User</h4>
      </div>
      <hr />
      <UserForm />
    </>
  );
}

export default UserCreatePage;
