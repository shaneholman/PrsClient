import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { Request } from "./Request";
import { requestAPI } from "./RequestAPI";
import RequestTable from "./RequestTable";
import RequestCreatePage from "./RequestCreatePage";
import RequestEditPage from "./RequestEditPage";

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

  // async function removeRequest(request: Request) {
  //   if (confirm("Are you sure you want to delete this Request?")) {
  //     if (request.id) {
  //       await requestAPI.delete(request.id);
  //       toast.success("Successfully deleted.");
  //       let updatedRequests = request?.requestId?.filter((c) => c.id !== request.id);
  //       if (request) {
  //         setRequest({ ...request, requests: updatedRequests } as Request);
  //       }
  //     }
  //   }
  // }

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
                <dd>{request.description}</dd>
                <dt>Justification</dt>
                <dd>{request.justification}</dd>
              </dl>
              <dl>
                <dt>Delivery Mode</dt>
                <dd>{request.deliveryMode}</dd>
                <dt>Status</dt>
                <dd className="badge text-bg-primary">{request.status}</dd>
              </dl>
              <dl>
                <dt>Requested By</dt>
                <dd>
                  {request.user?.firstname} {request.user?.lastname}
                </dd>
              </dl>
            </section>

            {/* <section className="card p-4 mt-4 w-100">
              <header className="d-flex justify-content-between">
                <h5>Items</h5>

                <Link className="btn btn-outline-primary" to={`/requests/detail/${request.id}/request/create`}>
                  + add line
                </Link>
              </header>
              <RequestTable request={request} onRemove={removeRequest} />
              <Routes>
                <Route path="request/create" element={<RequestCreatePage />} />
                <Route path="request/edit/:requestId" element={<RequestEditPage />} />
                <Route path="request/detail/:requestId" element={<RequestDetailPage />} />
              </Routes>
            </section> */}
          </>
        )}
      </>
    </>
  );
}

export default RequestDetailPage;
