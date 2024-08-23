import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Request } from "./Request";
import { requestAPI } from "./RequestAPI";

import RequestLinesTable from "../requestlines/RequestLinesTable";
import { RequestLines } from "../requestlines/RequestLines";
import { requestLinesAPI } from "../requestlines/RequestLinesAPI";
import { SubmitHandler, useForm } from "react-hook-form";

function RequestDetailPage() {
  const { requestId: requestIdAsString } = useParams<{
    requestId: string;
  }>();
  let [searchParams] = useSearchParams();
  const requestId = Number(requestIdAsString);
  const [request, setRequest] = useState<Request | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

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
  const { handleSubmit } = useForm<Request>({
    defaultValues: async () => {
      if (!requestId) {
        return Promise.resolve(new Request());
      } else {
        return await requestAPI.find(requestId);
      }
    },
  });

  const review: SubmitHandler<Request> = async (request: Request) => {
    try {
      await requestAPI.review(request);
      navigate("/requests");
      toast.success("Request successfully sent for review!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const approve: SubmitHandler<Request> = async (request: Request) => {
    try {
      await requestAPI.approve(request);
      navigate("/requests");
      toast.success("Request successfully approved!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const reject: SubmitHandler<Request> = async (request: Request) => {
    try {
      await requestAPI.reject(request);
      navigate("/requests");
      toast.success("Request successfully rejected!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
          <button className="btn btn-primary" onClick={handleSubmit(review)}>
            submit for review
          </button>
          <button className="btn btn-primary" onClick={handleSubmit(approve)}>
            Approve
          </button>
          <button className="btn btn-primary" onClick={handleSubmit(reject)}>
            reject
          </button>
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
                <Link className="btn btn-outline-primary" to={`/requests/detail/${requestId}/requestlines/create`}>
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
