import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Vendor } from "./Vendor";

interface VendorCardProps {
  vendor: Vendor;
  onRemove: (vendor: Vendor) => void;
}

function VendorCard({ vendor, onRemove }: VendorCardProps) {
  return (
    <article className="card p-4 " key={vendor.id}>
      <Link to={`/vendor/edit/${vendor.id}`}></Link>
      <strong>Vendor Name :{vendor.name}</strong>
      <small>Vendor Code :{vendor.code}</small>
      <small>Address :{vendor.address}</small>
      <small>City :{vendor.city}</small>
      <small>State :{vendor.state}</small>
      <small>ZipCode :{vendor.zipCode}</small>
      <small>Phone :{vendor.phone}</small>
      <small>Email :{vendor.email}</small>
      <div className="d-flex gap-2">
        <Link className="small btn btn-outline-secondary" to="/vendors/edit">
          edit
        </Link>

        <a
          className="small btn btn-outline-primary"
          onClick={(event: SyntheticEvent) => {
            event.preventDefault();
            onRemove(vendor);
          }}
        >
          delete
        </a>
      </div>
    </article>
  );
}

export default VendorCard;
