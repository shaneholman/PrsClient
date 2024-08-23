import RequestLineForm from "./RequestLineForm";


function RequestEditPage() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Edit Request</h4>
      </div>
      <hr />
      <RequestLineForm />
    </>
  );
}

export default RequestEditPage;
