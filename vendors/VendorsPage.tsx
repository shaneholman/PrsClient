
import VendorList from "../Vendors/VendorList";
import { Link } from "react-router-dom";

function VendorsPage() {
  return (
    
    <>
      <div className=" d-flex justify-content-between">
        <h4>Vendors</h4>
        <Link to={"/vendors/create"} role="button1" className="btn btn-outline-secondary">
         + Add Vendor
        </Link>
      </div>

      <hr />

        <VendorList />
      
    </>
  );
}
export default VendorsPage;
