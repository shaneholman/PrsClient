import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";

function NavPanel() {
  return (
    <nav className="bg-body-tertiary min-vh-100 p-4">
      <svg className="bi me-2" width={16} height={16} fill="currentColor">
        <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#plus-circle-fill" />
      </svg>
      Create New
      
      <ul className="nav nav-pills">
      <li className="nav-items text-secondary">Purchase</li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/requests">
            <svg className="bi me-2" width={16} height={16} fill="currentColor">
              <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#cart2" />
            </svg>
            Requests
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">
            <svg className="bi me-2" width={16} height={16} fill="currentColor">
              <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#grid" />
            </svg>
            Products
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/vendors">
            <svg className="bi me-2" width={16} height={16} fill="currentColor">
              <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#building" />
            </svg>
            Vendors
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/users">
            <svg className="bi me-2" width={16} height={16} fill="currentColor">
              <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#people" />
            </svg>
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default NavPanel;
