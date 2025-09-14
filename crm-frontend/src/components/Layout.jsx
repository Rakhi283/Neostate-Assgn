import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContex";


export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center bg-light"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold text-primary" to="/leads">
              CRM System
            </Link>
            <div>
              <Link className="btn btn-outline-primary me-2" to="/leads">
                Leads
              </Link>
              <Link className="btn btn-outline-success me-2" to="/opportunities">
                Opportunities
              </Link>
              {user && (
                <>
                  <span className="me-3">
                    {user.name} ({user.role})
                  </span>
                  <button onClick={logout} className="btn btn-danger">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="card p-4 shadow">{children}</div>
      </div>
    </div>
  );
}
