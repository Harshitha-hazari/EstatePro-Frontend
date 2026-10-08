import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    navigate("/login");
    window.location.reload();
  };

  return (
    <nav
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        padding: "15px 6%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        flexWrap: "wrap"
      }}
    >
      {/* LOGO */}

      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "24px",
          fontWeight: "bold"
        }}
      >
        🏠 EstatePro
      </Link>

      {/* NAVIGATION */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
          flexWrap: "wrap"
        }}
      >
        <Link
          to="/"
          style={{
            color: "#e2e8f0",
            textDecoration: "none"
          }}
        >
          Home
        </Link>

        <Link
          to="/properties"
          style={{
            color: "#e2e8f0",
            textDecoration: "none"
          }}
        >
          Properties
        </Link>

        <Link
          to="/favorites"
          style={{
            color: "#e2e8f0",
            textDecoration: "none"
          }}
        >
           Favorites
        </Link>

        <Link
          to="/my-inquiries"
          style={{
            color: "#e2e8f0",
            textDecoration: "none"
          }}
        >
           Inquiries
        </Link>

        {/* ADMIN LINK */}

        {loggedInUser &&
          loggedInUser.role === "ADMIN" && (
            <Link
              to="/admin"
              style={{
                color: "#93c5fd",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
               Admin
            </Link>
          )}

        {/* LOGIN / REGISTER */}

        {!loggedInUser && (
          <>
            <Link
              to="/register"
              style={{
                color: "#e2e8f0",
                textDecoration: "none"
              }}
            >
              Register
            </Link>

            <Link
              to="/login"
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "9px 18px",
                borderRadius: "7px",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Login
            </Link>


            
          </>
        )}

        {/* LOGGED-IN USER */}

        {loggedInUser && (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }}
  >
    <Link
      to="/profile"
      style={{
        color: "#e2e8f0",
        textDecoration: "none",
        fontWeight: "bold"
      }}
    >
      Profile
    </Link>
            <span
              style={{
                color: "#bfdbfe",
                fontWeight: "bold"
              }}
            >
              👋 {loggedInUser.name}
            </span>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                padding: "9px 16px",
                borderRadius: "7px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;