
import VendorForm from "./VendorForm";

function VendorCreatePage() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>New Vendor</h4>
      </div>
      <hr />
      <VendorForm />
    </>
  );
}

export default VendorCreatePage;
