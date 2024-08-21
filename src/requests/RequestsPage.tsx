import { Link } from "react-router-dom";
import RequestTable from "./RequestTable";

function RequestPage() {
  return (
    <>
      <div className=" d-flex justify-content-between">
        <h4>Requests</h4>
        <Link to={"/requests/create"} role="button1" className="btn btn-outline-secondary">
          + Add Request
        </Link>
      </div>

      <hr />

      <RequestTable />
    </>
  );
}
export default RequestPage;
