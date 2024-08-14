import "bootstrap/dist/css/bootstrap.min.css";

function NavPanel() {
  return (
    <nav className="sidebar">
      <a>
        <svg className="bi me-2" width={16} height={16} fill="currentColor">
          <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#plus-circle-fill" />
        </svg>
        Create New
      </a>
      <h6 className="container-fluid p-3">Purchase</h6>
      <ul id="menu">
        <li>
          <a>
            <svg className="bi me-2" width={16} height={16} fill="currentColor">
              <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#cart2" />
            </svg>
            Requests
          </a>
        </li>
        <li>
          <a>
            <svg className="bi me-2" width={16} height={16} fill="currentColor">
              <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#grid" />
            </svg>
            Products
          </a>
        </li>
        <li>
          <a href="vendors-page.html">
            <svg className="bi me-2" width={16} height={16} fill="currentColor">
              <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#building" />
            </svg>
            Vendors
          </a>
        </li>
        <li>
          <a>
            <svg className="bi me-2" width={16} height={16} fill="currentColor">
              <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#people" />
            </svg>
            Users
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default NavPanel;
