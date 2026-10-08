import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/properties`)
      .then((response) => {
        const users = response.data;

        const user = users.find(
          (u) =>
            u.email === email &&
            u.password === password
        );

        if (user) {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
          );

          setMessage("Login successful! ✅");

          if (user.role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/properties");
          }
        } else {
          setMessage("Invalid email or password.");
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("Unable to connect to the server.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        backgroundColor: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "950px",
          backgroundColor: "white",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        {/* LEFT SIDE */}

        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.75)), url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              marginBottom: "15px"
            }}
          >
            Welcome Back 🏠
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.7",
              fontSize: "16px"
            }}
          >
            Sign in to explore properties, manage your
            favorites and send inquiries to property
            owners.
          </p>
        </div>

        {/* RIGHT SIDE */}

        <div
          style={{
            padding: "50px"
          }}
        >
          <h2
            style={{
              color: "#0f172a",
              fontSize: "30px",
              marginTop: 0
            }}
          >
            Login
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px"
            }}
          >
            Login to your EstatePro account
          </p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "8px"
                }}
              >
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "13px",
                  boxSizing: "border-box",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "15px"
                }}
              />
            </div>

            {/* PASSWORD */}

            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "8px"
                }}
              >
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                required
                style={{
                  width: "100%",
                  padding: "13px",
                  boxSizing: "border-box",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "15px"
                }}
              />
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                backgroundColor: loading
                  ? "#93c5fd"
                  : "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontWeight: "bold",
                fontSize: "16px"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* MESSAGE */}

          {message && (
            <p
              style={{
                marginTop: "18px",
                color: message.includes("successful")
                  ? "#16a34a"
                  : "#dc2626",
                fontWeight: "bold"
              }}
            >
              {message}
            </p>
          )}

          {/* REGISTER */}

          <p
            style={{
              marginTop: "25px",
              textAlign: "center",
              color: "#64748b"
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;