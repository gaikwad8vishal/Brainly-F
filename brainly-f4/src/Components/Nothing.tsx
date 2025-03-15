import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "3rem", color: "#ff4757" }}>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you’re looking for doesn’t exist or has been moved.</p>
      <Link to="/" style={{ textDecoration: "none", color: "#3498db", fontSize: "1.2rem" }}>
        🔙 Go to Home
      </Link>
    </div>
  );
};



