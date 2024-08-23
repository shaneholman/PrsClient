import RequestLineForm from "./RequestLineForm";


export default function RequestCreatePage() {
  return (
    <>
      <header className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h4>Edit Request</h4>
      </header>

      <section className="bg-light gap-5 p-4 rounded-4">
        <RequestLineForm />
      </section>
    </>
  );
}
