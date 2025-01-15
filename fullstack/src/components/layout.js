import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark-subtle">
      <div className="container">
        <Link className="navbar-brand fs-4" to="/">
            <img src="/icon.png" alt="logo" width="30" className="me-3" />
          Testing
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
          </ul>

          <ul className="navbar-nav mx">
            <li className="nav-item">
            <Link className="fs-5 text-black" to="/admin/products">
                    Products
                  </Link>
            </li>
    
          </ul>

        </div>
      </div>
    </nav>
  );
}

export function Footer() {
    return(
        <div className="text-center p-4 border-top" >
            <img src="/icon.png" alt="logo" width="30" className="me-2" />
            Testing
        </div>
    )
}