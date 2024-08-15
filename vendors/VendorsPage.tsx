import "bootstrap/dist/css/bootstrap.min.css";
import VendorList from "../Vendors/VendorList";

function VendorsPage() {
  return (
    <>
      <section className="container-fluid about p-4">
        <div className="justify-content-between d-flex">
          <h2 className="p-2">Vendors</h2>
          <a className="btn btn-primary m-2" href="createNewVendor.html">
            <svg className="bi me-1" width={20} height={40} fill="currentColor">
              <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#plus" />
            </svg>
            Create a Vendor
          </a>
        </div>
        <hr />

        <VendorList />
      </section>
    </>
  );
}
export default VendorsPage;
