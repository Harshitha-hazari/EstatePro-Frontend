import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:8080/api/users/${user.id}`,
        user
      )
      .then((response) => {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data)
        );

        setUser(response.data);

        setMessage(
          "Profile updated successfully!"
        );
      })
      .catch((error) => {
        console.error(error);
        setMessage("Failed to update profile.");
      });
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "40px"
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.08)"
        }}
      >
        <h1>👤 My Profile</h1>

        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: "15px" }}>
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px"
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px"
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px"
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Update Profile
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: "green",
              fontWeight: "bold"
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;