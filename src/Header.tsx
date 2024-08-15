import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <header className="container-fluid d-flex justify-content-between bg-body-tertiary">
      <span>
        <svg id="logo" width={50} height={39} viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF" />
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            className="ccustom"
            fill="#312ECB"
          />
        </svg>
        <span className="brand">Purchase Request System</span>
      </span>
      <a className="btn btn-primary">
        <svg className="bi" width={20} height={22} fill="currentColor">
          <use xlinkHref="./node_modules/bootstrap-icons/bootstrap-icons.svg#person" />
        </svg>
        Sign in
      </a>
    </header>
  );
}
export default Header;
