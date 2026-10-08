import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import.meta.env.VITE_API_URL
function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "USER"
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/properties`)
      .then((response) => {
        console.log(response.data);

        setMessage(
          "Registration successful! Redirecting to login..."
        );

        setUser({
          name: "",
          email: "",
          password: "",
          phone: "",
          role: "USER"
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setMessage(
          "Registration failed. Please try again."
        );
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
              "linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.75)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80')",
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
            Find Your New Home 🏠
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.7",
              fontSize: "16px"
            }}
          >
            Create your EstatePro account and start
            exploring properties that match your needs.
          </p>

          <div
            style={{
              marginTop: "25px",
              color: "#bfdbfe",
              lineHeight: "2"
            }}
          >
            <div>✓ Explore properties</div>
            <div>✓ Save your favorite properties</div>
            <div>✓ Send property inquiries</div>
            <div>✓ Track your inquiries</div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div
          style={{
            padding: "45px 50px"
          }}
        >
          <h2
            style={{
              color: "#0f172a",
              fontSize: "30px",
              marginTop: 0
            }}
          >
            Create Account
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "25px"
            }}
          >
            Register to start using EstatePro
          </p>

          <form onSubmit={handleSubmit}>
            {/* NAME */}

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "7px"
                }}
              >
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  boxSizing: "border-box",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            {/* EMAIL */}

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "7px"
                }}
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  boxSizing: "border-box",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            {/* PHONE */}

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "7px"
                }}
              >
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  boxSizing: "border-box",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            {/* PASSWORD */}

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  color: "#334155",
                  marginBottom: "7px"
                }}
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  boxSizing: "border-box",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            {/* REGISTER BUTTON */}

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
                fontSize: "15px"
              }}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          {/* MESSAGE */}

          {message && (
            <p
              style={{
                marginTop: "15px",
                color: message.includes("successful")
                  ? "#16a34a"
                  : "#dc2626",
                fontWeight: "bold"
              }}
            >
              {message}
            </p>
          )}

          {/* LOGIN LINK */}

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              marginTop: "20px"
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;