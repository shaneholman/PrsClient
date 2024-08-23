import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./users/user";
import { useUserContext } from "./users/UserContext";

function Header() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  function signout() {
    localStorage.removeItem("user");
    setUser(undefined);
    navigate("/signin");
  }
  return (
    <header className="container-fluid d-flex justify-content-between bg-body-tertiary">
      <span>
        <Link to="/">
         <svg id="logo" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path>
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            className="ccustom"
            fill="#312ECB"
          ></path>
        </svg>
        </Link>
        <span className="brand">Purchase Request System</span>
      </span>
      <details className="dropdown pe-5">
        <summary className="btn btn-tertiary dropdown-toggle d-flex align-items-center">
          <span
            style={{ width: "3rem", height: "3rem" }}
            className="d-flex  bg-primary-subtle fs-5 text-secondary align-items-center justify-content-center rounded-circle me-2"
          >
            {user?.firstname[0]} {user?.lastname[0]}
          </span>
          {user?.firstname} {user?.lastname}
        </summary>
        <div className="d-flex justify-content-end">
          <ul
            className="dropdown-menu bg-body-tertiary"
            style={{ display: "revert" }}
          >
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <button className="dropdown-item" onClick={signout}>
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </details>
    </header>
  );
}
export default Header;
