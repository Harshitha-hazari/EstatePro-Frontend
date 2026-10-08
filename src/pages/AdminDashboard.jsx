import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const [activeSection, setActiveSection] = useState("dashboard");
  const [editingPropertyId, setEditingPropertyId] = useState(null);

  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    price: "",
    propertyType: "Apartment",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    imageUrl: "",
    status: "AVAILABLE"
  });

  const loadData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/properties`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/properties`)
      .then((response) => setProperties(response.data))
      .catch((error) => console.error(error));

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/properties`)
      .then((response) => setInquiries(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePropertyChange = (e) => {
    setNewProperty({
      ...newProperty,
      [e.target.name]: e.target.value
    });
  };

  const resetPropertyForm = () => {
    setNewProperty({
      title: "",
      location: "",
      price: "",
      propertyType: "Apartment",
      bedrooms: "",
      bathrooms: "",
      area: "",
      description: "",
      imageUrl: "",
      status: "AVAILABLE"
    });

    setEditingPropertyId(null);
  };

  const saveProperty = (e) => {
    e.preventDefault();

    const propertyData = {
      title: newProperty.title,
      location: newProperty.location,
      price: Number(newProperty.price),
      propertyType: newProperty.propertyType,
      bedrooms: Number(newProperty.bedrooms),
      bathrooms: Number(newProperty.bathrooms),
      area: Number(newProperty.area),
      description: newProperty.description,
      imageUrl: newProperty.imageUrl,
      status: newProperty.status
    };

    if (editingPropertyId !== null) {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/api/properties/${editingPropertyId}`,
          propertyData
        )

        
        .then(() => {
          alert("Property updated successfully!");
          resetPropertyForm();
          loadData();
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to update property.");
        });
    } else {
      axios
        .post(
          "http://localhost:8080/api/properties",
          propertyData
        )
        .then(() => {
          alert("Property added successfully!");
          resetPropertyForm();
          loadData();
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to add property.");
        });
    }
  };

  const editProperty = (property) => {
    setEditingPropertyId(property.id);

    setNewProperty({
      title: property.title || "",
      location: property.location || "",
      price: property.price || "",
      propertyType: property.propertyType || "Apartment",
      bedrooms: property.bedrooms || "",
      bathrooms: property.bathrooms || "",
      area: property.area || "",
      description: property.description || "",
      imageUrl: property.imageUrl || "",
      status: property.status || "AVAILABLE"
    });

    setActiveSection("properties");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteProperty = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this property?"
      )
    ) {
      return;
    }

    axios
      .delete(
        "http://localhost:8080/api/properties/" + id
      )
      .then(() => {
        alert("Property deleted successfully!");
        loadData();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete property.");
      });
  };

  const deleteUser = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user?"
      )
    ) {
      return;
    }

    axios
      .delete("http://localhost:8080/api/users/" + id)
      .then(() => {
        alert("User deleted successfully!");
        loadData();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete user.");
      });
  };

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const getPropertyById = (propertyId) => {
    return properties.find(
      (property) => property.id === propertyId
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  const menuStyle = (section) => ({
    width: "100%",
    padding: "14px 18px",
    marginBottom: "8px",
    border: "none",
    borderRadius: "10px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    color:
      activeSection === section ? "#ffffff" : "#cbd5e1",
    backgroundColor:
      activeSection === section
        ? "#2563eb"
        : "transparent"
  });

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 15px rgba(15, 23, 42, 0.08)"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #dbe3ef",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
    marginBottom: "14px",
    outline: "none"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        fontFamily: "Arial, sans-serif",
        display: "flex"
      }}
    >
      {/* SIDEBAR */}

      <aside
        style={{
          width: "240px",
          minHeight: "100vh",
          backgroundColor: "#0f172a",
          padding: "25px 18px",
          boxSizing: "border-box",
          position: "sticky",
          top: 0
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "8px"
          }}
        >
          🏠 EstatePro
        </div>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "13px",
            marginBottom: "35px"
          }}
        >
          Admin Panel
        </p>

        <button
          onClick={() => setActiveSection("dashboard")}
          style={menuStyle("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          onClick={() => setActiveSection("users")}
          style={menuStyle("users")}
        >
          👥 Users
        </button>

        <button
          onClick={() => setActiveSection("properties")}
          style={menuStyle("properties")}
        >
          🏠 Properties
        </button>

        <button
          onClick={() => setActiveSection("queries")}
          style={menuStyle("queries")}
        >
          📩 Queries
        </button>

        <div
          style={{
            borderTop: "1px solid #334155",
            marginTop: "35px",
            paddingTop: "20px"
          }}
        >
          <p
            style={{
              color: "#64748b",
              fontSize: "12px"
            }}
          >
            Administrator
          </p>

          <p
            style={{
              color: "#e2e8f0",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          >
            👤 Admin
          </p>
        </div>
      </aside>

      {/* MAIN AREA */}

      <main
        style={{
          flex: 1,
          padding: "30px",
          maxWidth: "1400px",
          boxSizing: "border-box"
        }}
      >
        {/* TOP HEADER */}

        <div
          style={{
            ...cardStyle,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px"
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#0f172a",
                fontSize: "28px"
              }}
            >
              {activeSection === "dashboard" &&
                "Dashboard"}

              {activeSection === "users" &&
                "User Management"}

              {activeSection === "properties" &&
                "Property Management"}

              {activeSection === "queries" &&
                "Customer Queries"}
            </h1>

            <p
              style={{
                color: "#64748b",
                marginBottom: 0
              }}
            >
              Manage your real estate platform
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#eff6ff",
              padding: "10px 16px",
              borderRadius: "10px",
              color: "#2563eb",
              fontWeight: "bold"
            }}
          >
            ADMIN
          </div>
        </div>

        {/* DASHBOARD */}

        {activeSection === "dashboard" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, minmax(0, 1fr))",
                gap: "20px",
                marginBottom: "25px"
              }}
            >
              {/* USERS CARD */}

              <div
                onClick={() => setActiveSection("users")}
                style={{
                  ...cardStyle,
                  borderTop: "4px solid #2563eb",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#64748b",
                        margin: 0
                      }}
                    >
                      Total Users
                    </p>

                    <h2
                      style={{
                        fontSize: "32px",
                        margin: "8px 0",
                        color: "#0f172a"
                      }}
                    >
                      {users.length}
                    </h2>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#dbeafe",
                      padding: "12px",
                      borderRadius: "12px",
                      fontSize: "25px",
                      height: "30px"
                    }}
                  >
                    👥
                  </div>
                </div>

                <p
                  style={{
                    color: "#2563eb",
                    fontSize: "14px"
                  }}
                >
                  Manage users →
                </p>
              </div>

              {/* PROPERTY CARD */}

              <div
                onClick={() =>
                  setActiveSection("properties")
                }
                style={{
                  ...cardStyle,
                  borderTop: "4px solid #16a34a",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#64748b",
                        margin: 0
                      }}
                    >
                      Total Properties
                    </p>

                    <h2
                      style={{
                        fontSize: "32px",
                        margin: "8px 0",
                        color: "#0f172a"
                      }}
                    >
                      {properties.length}
                    </h2>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#dcfce7",
                      padding: "12px",
                      borderRadius: "12px",
                      fontSize: "25px",
                      height: "30px"
                    }}
                  >
                    🏠
                  </div>
                </div>

                <p
                  style={{
                    color: "#16a34a",
                    fontSize: "14px"
                  }}
                >
                  Manage properties →
                </p>
              </div>

              {/* QUERY CARD */}

              <div
                onClick={() => setActiveSection("queries")}
                style={{
                  ...cardStyle,
                  borderTop: "4px solid #f59e0b",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#64748b",
                        margin: 0
                      }}
                    >
                      Customer Queries
                    </p>

                    <h2
                      style={{
                        fontSize: "32px",
                        margin: "8px 0",
                        color: "#0f172a"
                      }}
                    >
                      {inquiries.length}
                    </h2>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#fef3c7",
                      padding: "12px",
                      borderRadius: "12px",
                      fontSize: "25px",
                      height: "30px"
                    }}
                  >
                    📩
                  </div>
                </div>

                <p
                  style={{
                    color: "#d97706",
                    fontSize: "14px"
                  }}
                >
                  View queries →
                </p>
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ color: "#0f172a" }}>
                Welcome back, Admin! 👋
              </h2>

              <p style={{ color: "#64748b" }}>
                Use the sidebar to manage users,
                properties and customer queries.
              </p>

              <div
                style={{
                  marginTop: "25px",
                  padding: "18px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "10px",
                  color: "#1e40af"
                }}
              >
                💡 Your platform currently has{" "}
                <strong>{properties.length}</strong>{" "}
                properties and{" "}
                <strong>{users.length}</strong>{" "}
                registered users.
              </div>
            </div>
          </>
        )}

        {/* USERS */}

        {activeSection === "users" && (
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >
              <h2 style={{ color: "#0f172a" }}>
                👥 Registered Users
              </h2>

              <span
                style={{
                  backgroundColor: "#dbeafe",
                  color: "#1d4ed8",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  fontWeight: "bold"
                }}
              >
                {users.length} Users
              </span>
            </div>

            {users.length === 0 ? (
              <p>No users available.</p>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "15px",
                    backgroundColor: "#f8fafc"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          marginTop: 0,
                          color: "#0f172a"
                        }}
                      >
                        {user.name}
                      </h3>

                      <p>
                        <strong>Email:</strong>{" "}
                        {user.email}
                      </p>

                      <p>
                        <strong>Phone:</strong>{" "}
                        {user.phone}
                      </p>

                      <span
                        style={{
                          backgroundColor:
                            user.role === "ADMIN"
                              ? "#fee2e2"
                              : "#dcfce7",
                          color:
                            user.role === "ADMIN"
                              ? "#b91c1c"
                              : "#15803d",
                          padding: "5px 10px",
                          borderRadius: "15px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        {user.role}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        deleteUser(user.id)
                      }
                      style={{
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "7px",
                        padding: "9px 14px",
                        cursor: "pointer"
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* PROPERTIES */}

        {activeSection === "properties" && (
          <>
            <div
              style={{
                ...cardStyle,
                marginBottom: "25px"
              }}
            >
              <h2 style={{ color: "#0f172a" }}>
                {editingPropertyId !== null
                  ? "✏️ Edit Property"
                  : "➕ Add New Property"}
              </h2>

              <form onSubmit={saveProperty}>
                <input
                  type="text"
                  name="title"
                  placeholder="Property Title"
                  value={newProperty.title}
                  onChange={handlePropertyChange}
                  required
                  style={inputStyle}
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={newProperty.location}
                  onChange={handlePropertyChange}
                  required
                  style={inputStyle}
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={newProperty.price}
                  onChange={handlePropertyChange}
                  required
                  style={inputStyle}
                />

                <select
                  name="propertyType"
                  value={newProperty.propertyType}
                  onChange={handlePropertyChange}
                  style={inputStyle}
                >
                  <option value="Apartment">
                    Apartment
                  </option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                </select>

                <input
                  type="number"
                  name="bedrooms"
                  placeholder="Bedrooms"
                  value={newProperty.bedrooms}
                  onChange={handlePropertyChange}
                  required
                  style={inputStyle}
                />

                <input
                  type="number"
                  name="bathrooms"
                  placeholder="Bathrooms"
                  value={newProperty.bathrooms}
                  onChange={handlePropertyChange}
                  required
                  style={inputStyle}
                />

                <input
                  type="number"
                  name="area"
                  placeholder="Area"
                  value={newProperty.area}
                  onChange={handlePropertyChange}
                  required
                  style={inputStyle}
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={newProperty.description}
                  onChange={handlePropertyChange}
                  required
                  rows="4"
                  style={inputStyle}
                />

                <input
  type="file"
  name="imageFile"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      setNewProperty({
        ...newProperty,
        imageFile: file
      });
    }
  }}
  style={inputStyle}
/>

                <select
                  name="status"
                  value={newProperty.status}
                  onChange={handlePropertyChange}
                  style={inputStyle}
                >
                  <option value="AVAILABLE">
                    AVAILABLE
                  </option>
                  <option value="SOLD">SOLD</option>
                </select>

                <button
                  type="submit"
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "11px 20px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginRight: "10px"
                  }}
                >
                  {editingPropertyId !== null
                    ? "💾 Update Property"
                    : "➕ Add Property"}
                </button>

                {editingPropertyId !== null && (
                  <button
                    type="button"
                    onClick={resetPropertyForm}
                    style={{
                      backgroundColor: "#e2e8f0",
                      color: "#334155",
                      border: "none",
                      borderRadius: "8px",
                      padding: "11px 20px",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>

            <div style={cardStyle}>
              <h2 style={{ color: "#0f172a" }}>
                🏠 All Properties
              </h2>

              {properties.length === 0 ? (
                <p>No properties available.</p>
              ) : (
                properties.map((property) => (
                  <div
                    key={property.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "14px",
                      padding: "20px",
                      marginBottom: "20px",
                      backgroundColor: "#f8fafc"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap"
                      }}
                    >
                      <img
                        src={
                          property.imageUrl ||
                          "https://via.placeholder.com/250x160?text=Property"
                        }
                        alt={property.title}
                        style={{
                          width: "250px",
                          height: "160px",
                          objectFit: "cover",
                          borderRadius: "10px"
                        }}
                      />

                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            marginTop: 0,
                            color: "#0f172a"
                          }}
                        >
                          {property.title}
                        </h3>

                        <p>
                          📍 {property.location}
                        </p>

                        <p
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#2563eb"
                          }}
                        >
                          ₹{formatPrice(property.price)}
                        </p>

                        <p>
                          🏠 {property.propertyType}
                        </p>

                        <p>
                          🛏️ {property.bedrooms} Bedrooms
                          &nbsp;&nbsp; 🚿{" "}
                          {property.bathrooms} Bathrooms
                        </p>

                        <span
                          style={{
                            backgroundColor:
                              property.status ===
                              "AVAILABLE"
                                ? "#dcfce7"
                                : "#fee2e2",
                            color:
                              property.status ===
                              "AVAILABLE"
                                ? "#15803d"
                                : "#b91c1c",
                            padding: "6px 12px",
                            borderRadius: "15px",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          {property.status}
                        </span>
                      </div>
                    </div>

                    <p
                      style={{
                        color: "#64748b",
                        marginTop: "18px"
                      }}
                    >
                      {property.description}
                    </p>

                    <button
                      onClick={() =>
                        editProperty(property)
                      }
                      style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "7px",
                        padding: "9px 15px",
                        cursor: "pointer",
                        marginRight: "10px"
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProperty(property.id)
                      }
                      style={{
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "7px",
                        padding: "9px 15px",
                        cursor: "pointer"
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* QUERIES */}

        {activeSection === "queries" && (
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >
              <h2 style={{ color: "#0f172a" }}>
                📩 Customer Queries
              </h2>

              <span
                style={{
                  backgroundColor: "#fef3c7",
                  color: "#b45309",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  fontWeight: "bold"
                }}
              >
                {inquiries.length} Queries
              </span>
            </div>

            {inquiries.length === 0 ? (
              <p>No queries available.</p>
            ) : (
              inquiries.map((inquiry) => {
                const user = getUserById(inquiry.userId);
                const property = getPropertyById(
                  inquiry.propertyId
                );

                return (
                  <div
                    key={inquiry.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "14px",
                      padding: "22px",
                      marginBottom: "20px",
                      backgroundColor: "#f8fafc"
                    }}
                  >
                    <h3 style={{ color: "#0f172a" }}>
                      📩 Query #{inquiry.id}
                    </h3>

                    <div
                      style={{
                        backgroundColor: "#eff6ff",
                        padding: "15px",
                        borderRadius: "10px",
                        marginBottom: "15px"
                      }}
                    >
                      <h4
                        style={{
                          color: "#1e40af",
                          marginTop: 0
                        }}
                      >
                        👤 User
                      </h4>

                      {user ? (
                        <>
                          <p>
                            <strong>Name:</strong>{" "}
                            {user.name}
                          </p>

                          <p>
                            <strong>Email:</strong>{" "}
                            {user.email}
                          </p>

                          <p>
                            <strong>Phone:</strong>{" "}
                            {user.phone}
                          </p>
                        </>
                      ) : (
                        <p>User information not found.</p>
                      )}
                    </div>

                    <div
                      style={{
                        backgroundColor: "#f0fdf4",
                        padding: "15px",
                        borderRadius: "10px",
                        marginBottom: "15px"
                      }}
                    >
                      <h4
                        style={{
                          color: "#166534",
                          marginTop: 0
                        }}
                      >
                        🏠 Property
                      </h4>

                      {property ? (
                        <>
                          <p>
                            <strong>
                              Property:
                            </strong>{" "}
                            {property.title}
                          </p>

                          <p>
                            <strong>
                              Location:
                            </strong>{" "}
                            {property.location}
                          </p>

                          <p>
                            <strong>Price:</strong> ₹
                            {formatPrice(property.price)}
                          </p>

                          <p>
                            <strong>Type:</strong>{" "}
                            {property.propertyType}
                          </p>
                        </>
                      ) : (
                        <p>
                          Property information not
                          found.
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        padding: "15px",
                        borderRadius: "10px"
                      }}
                    >
                      <h4
                        style={{
                          color: "#0f172a",
                          marginTop: 0
                        }}
                      >
                        💬 Message
                      </h4>

                      <p
                        style={{
                          color: "#475569"
                        }}
                      >
                        {inquiry.message}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;

