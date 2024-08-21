import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { Request } from "./Request";
import { requestAPI } from "./RequestAPI";
import CreditTable from "../credits/CreditTable";
import { creditAPI } from "../credits/CreditAPI";
import { Credit } from "../credits/Credit";
import CreditCreatePage from "../credits/CreditCreatePage";
import CreditEditPage from "../credits/CreditEditPage";

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
      const data = await requestAPI.findWithDetails(requestId);
      setRequest(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadRequest();
  }, [searchParams.get("lastUpdated")]);

  async function removeCredit(credit: Credit) {
    if (confirm("Are you sure you want to delete this Request?")) {
      if (credit.id) {
        await creditAPI.delete(credit.id);
        toast.success("Successfully deleted.");
        let updatedCredits = request?.credits?.filter((c) => c.id !== credit.id);
        if (request) {
          setRequest({ ...request, credits: updatedCredits } as Request);
        }
      }
    }
  }

  if (!request) return null;

  return (
    <>
      <nav className="d-flex justify-content-between pe-2">
        <h4>Request</h4>
        <Link to={`/requests/edit/${request.id}`} className="btn btn-outline-primary">
          edit request
        </Link>
      </nav>
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
            <section className="card d-flex flex-row gap-5 p-4 w-100 bg-body-tertiary">
              <dl className="">
                <dt>Description</dt>
                <dd>{request.description}</dd>
                <dt>Justification</dt>
                <dd>{request.justification}</dd>
              </dl>
              <dl>
                <dt>Delivery Method</dt>
                <dd>{request.deliveryMode}</dd>
                <dt>Status</dt>
                <dd>{request.status}</dd>
              </dl>
              <dl>
                <dt>Rating</dt>
                <dd>{request.rating}</dd>
                <dt>Budget</dt>
                <dd>
                  ${request.budgetInMillions} {request.budgetInMillions && "million"}{" "}
                </dd>
              </dl>
            </section>
            <section className="card p-4 mt-4 w-100">
              <header className="d-flex justify-content-between">
                <h5>Cast</h5>

                <Link className="btn btn-outline-primary" to={`/requests/detail/${request.id}/credit/create`}>
                  + add credit
                </Link>
              </header>
              <CreditTable request={request} onRemove={removeCredit} />
              <Routes>
                <Route path="credit/create" element={<CreditCreatePage />} />
                <Route path="credit/edit/:creditId" element={<CreditEditPage />} />
              </Routes>
            </section>
          </>
        )}
      </>
    </>
  );
}

export default RequestDetailPage;
