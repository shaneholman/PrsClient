import { useEffect, useState } from "react";
import { requestAPI } from "./RequestAPI";
import { Request } from "./Request";
import toast from "react-hot-toast";

import RequestTableRow from "./RequestTableRow";

function RequestTable() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadRequests() {
    try {
      setBusy(true);
      const data = await requestAPI.list();
      setRequests(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function remove(request: Request) {
    if (confirm("Are you sure you want to delete this Request?")) {
      if (request.id) {
        await requestAPI.delete(request.id);
        let updatedRequests = requests.filter((r) => r.id !== request.id);
        setRequests(updatedRequests);
        toast.success("Successfully deleted.");
      }
    }
  }

  return (
    <>
      {/* <div className="d-flex flex-column mb-4 w-25">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select id="status" className="form-select">
        <option value="">Select...</option>
          <option value="ALL">All</option>
          <option value="NEW">New</option>
          <option value="REVIEW">Pending Review</option>
          <option value="APPROVED">Approved</option>
        </select>
      </div> */}
      {busy && (
        <section className="d-flex justify-content-center align-items-center align-content-center vh-100">
          <div className=" spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </section>
      )}
      
      <table className="table table-hover w-75 ">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Status</th>
            <th>Total</th>
            <th>Requested By</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <RequestTableRow key={request.id} request={request} onRemove={remove} />
          ))}
        </tbody>
      </table>
      
    </>
  );
}

export default RequestTable;
