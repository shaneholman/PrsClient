import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { Request } from "./Request";
import { requestAPI } from "./RequestAPI";
import RequestTable from "./RequestTable";
import RequestCreatePage from "./RequestCreatePage";
import RequestEditPage from "./RequestEditPage";
import RequestLinesTable from "../requestlines/RequestLinesTable";
import { RequestLines } from "../requestlines/RequestLines";
import { requestLinesAPI } from "../requestlines/RequestLinesAPI";

function RequestDetailPage() {
  const { requestId: requestIdAsString } = useParams<{
    requestId: string;
  }>();
  let [searchParams] = useSearchParams();
  const requestId = Number(requestIdAsString);
  const [request, setRequest] = useState<Request | undefined>(undefined);
  const [busy, setBusy] = useState(false);

  async function loadRequest() {
    try {
      if (!requestId) return;
      setBusy(true);
      let foundRequest = await requestAPI.find(requestId);
      setRequest(foundRequest);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadRequest();
  }, [searchParams.get("lastUpdated")]);

  async function removeRequestLine(requestline: RequestLines) {
    if (confirm("Are you sure you want to delete this Request?")) {
      if (requestline.id) {
        await requestLinesAPI.delete(requestline.id);
        toast.success("Successfully deleted.");
        let updatedRequests = request?.requestLines?.filter((c) => c.id !== requestline.id);
        if (request) {
          setRequest({ ...request, requestLines: updatedRequests } as Request);
        }
      }
    }
  }

  if (!request) return null;

  return (
    <>
      <div className="d-flex justify-content-between ">
        <h4>Request</h4>
        <div className=" d-flex gap-3">
          <Link to={`/requests/edit/${request.id}`} className="btn btn-outline-primary">
            + Submit Request
          </Link>
          <Link to={`/requests/edit/${request.id}`} className="btn btn-outline-secondary">
            + Edit Request
          </Link>
        </div>
      </div>
      <hr />
      <>
        {busy && (
          <section className="d-flex justify-content-center align-items-center align-content-center vh-100">
            <div className=" spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </section>
        )}
        {request && (
          <>
            <section className="d-flex flex-row gap-5 p-4 w-100 bg-body-tertiary rounded-3">
              <dl className="">
                <dt>Description</dt>
                <dd>{request?.description}</dd>
                <dt>Justification</dt>
                <dd>{request?.justification}</dd>
              </dl>
              <dl>
                <dt>Delivery Mode</dt>
                <dd>{request?.deliveryMode}</dd>
                <dt>Status</dt>
                <dd className="badge text-bg-primary">{request?.status}</dd>
              </dl>
              <dl>
                <dt>Requested By</dt>
                <dd>
                  {request?.user?.firstname} {request?.user?.lastname}
                </dd>
              </dl>
            </section>

            <section className="card p-4 mt-4 w-100">
              <div className="table table-hover">
                <h4 className="text-secondary">Items</h4>
                <RequestLinesTable request={request} onRemove={removeRequestLine} />
                <Link className="btn btn-outline-primary" to={`/requestlines/detail/${requestId}/request/create`}>
                  + Add a line
                </Link>
              </div>
            </section>
          </>
        )}
      </>
    </>
  );
}

export default RequestDetailPage;
