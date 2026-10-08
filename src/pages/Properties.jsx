import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Properties() {
  const [properties, setProperties] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [bedrooms, setBedrooms] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  useEffect(() => {
    axios
     .get(`${import.meta.env.VITE_API_URL}/api/properties`)
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addToFavorites = (propertyId) => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(propertyId)) {
      favorites.push(propertyId);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      alert("Property added to favorites!");
    } else {
      alert("Property is already in favorites!");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  const filteredProperties = properties.filter((property) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      property.title?.toLowerCase().includes(search) ||
      property.location?.toLowerCase().includes(search) ||
      property.propertyType?.toLowerCase().includes(search);

    const matchesType =
      propertyType === "All" ||
      property.propertyType?.toLowerCase() ===
        propertyType.toLowerCase();

    const matchesBedrooms =
      bedrooms === "All" ||
      property.bedrooms === Number(bedrooms);

    let matchesPrice = true;

    if (priceRange === "Below 50L") {
      matchesPrice = property.price < 5000000;
    } else if (priceRange === "50L - 1Cr") {
      matchesPrice =
        property.price >= 5000000 &&
        property.price <= 10000000;
    } else if (priceRange === "Above 1Cr") {
      matchesPrice = property.price > 10000000;
    }

    return (
      matchesSearch &&
      matchesType &&
      matchesBedrooms &&
      matchesPrice
    );
  });

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        paddingBottom: "60px"
      }}
    >
      {/* PAGE HEADER */}

      <div
        style={{
          backgroundColor: "#0f172a",
          color: "white",
          padding: "45px 7%"
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "38px"
          }}
        >
          Explore Properties 🏠
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginTop: "10px",
            fontSize: "17px"
          }}
        >
          Find the perfect property that matches your
          requirements.
        </p>
      </div>

      {/* FILTER SECTION */}

      <div
        style={{
          margin: "-30px 7% 40px",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)"
        }}
      >
        <h3
          style={{
            marginTop: 0,
            color: "#0f172a"
          }}
        >
          🔎 Search & Filter
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr 1fr 1fr",
            gap: "15px"
          }}
        >
          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search by location, title or type..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            style={{
              padding: "13px",
              border: "1px solid #cbd5e1",
              borderRadius: "7px",
              fontSize: "14px"
            }}
          />

          {/* TYPE */}

          <select
            value={propertyType}
            onChange={(e) =>
              setPropertyType(e.target.value)
            }
            style={{
              padding: "13px",
              border: "1px solid #cbd5e1",
              borderRadius: "7px"
            }}
          >
            <option value="All">
              All Property Types
            </option>

            <option value="Apartment">
              Apartment
            </option>

            <option value="House">
              House
            </option>

            <option value="Villa">
              Villa
            </option>

            <option value="Plot">
              Plot
            </option>
          </select>

          {/* BEDROOMS */}

          <select
            value={bedrooms}
            onChange={(e) =>
              setBedrooms(e.target.value)
            }
            style={{
              padding: "13px",
              border: "1px solid #cbd5e1",
              borderRadius: "7px"
            }}
          >
            <option value="All">
              All Bedrooms
            </option>

            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5 Bedrooms</option>
          </select>

          {/* PRICE */}

          <select
            value={priceRange}
            onChange={(e) =>
              setPriceRange(e.target.value)
            }
            style={{
              padding: "13px",
              border: "1px solid #cbd5e1",
              borderRadius: "7px"
            }}
          >
            <option value="All">
              All Prices
            </option>

            <option value="Below 50L">
              Below ₹50 Lakhs
            </option>

            <option value="50L - 1Cr">
              ₹50 Lakhs - ₹1 Crore
            </option>

            <option value="Above 1Cr">
              Above ₹1 Crore
            </option>
          </select>
        </div>
      </div>

      {/* RESULTS HEADER */}

      <div
        style={{
          margin: "0 7% 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h2
          style={{
            color: "#0f172a",
            margin: 0
          }}
        >
          Available Properties
        </h2>

        <span
          style={{
            color: "#64748b"
          }}
        >
          {filteredProperties.length} properties found
        </span>
      </div>

      {/* PROPERTY CARDS */}

      {filteredProperties.length === 0 ? (
        <div
          style={{
            margin: "0 7%",
            backgroundColor: "white",
            padding: "50px",
            textAlign: "center",
            borderRadius: "12px"
          }}
        >
          <div
            style={{
              fontSize: "50px"
            }}
          >
            🏠
          </div>

          <h2>No Properties Found</h2>

          <p style={{ color: "#64748b" }}>
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div
          style={{
            margin: "0 7%",
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: "25px"
          }}
        >
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              style={{
                backgroundColor: "white",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.08)"
              }}
            >
              {/* IMAGE */}

              <div
                style={{
                  position: "relative"
                }}
              >
                <img
                  src={
                    property.imageUrl ||
                    "https://via.placeholder.com/600x400?text=Property"
                  }
                  alt={property.title}
                  style={{
                    width: "100%",
                    height: "230px",
                    objectFit: "cover"
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    backgroundColor:
                      property.status === "SOLD"
                        ? "#dc2626"
                        : "#16a34a",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  {property.status}
                </span>
              </div>

              {/* CONTENT */}

              <div
                style={{
                  padding: "20px"
                }}
              >
                <p
                  style={{
                    color: "#2563eb",
                    fontSize: "13px",
                    fontWeight: "bold",
                    marginBottom: "7px"
                  }}
                >
                  {property.propertyType}
                </p>

                <h2
                  style={{
                    color: "#0f172a",
                    fontSize: "20px",
                    margin: "5px 0 10px"
                  }}
                >
                  {property.title}
                </h2>

                <p
                  style={{
                    color: "#64748b",
                    marginBottom: "12px"
                  }}
                >
                  📍 {property.location}
                </p>

                <h2
                  style={{
                    color: "#2563eb",
                    margin: "10px 0"
                  }}
                >
                  ₹{formatPrice(property.price)}
                </h2>

                <div
                  style={{
                    borderTop:
                      "1px solid #e2e8f0",
                    borderBottom:
                      "1px solid #e2e8f0",
                    padding: "12px 0",
                    margin: "15px 0",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    color: "#475569",
                    fontSize: "14px"
                  }}
                >
                  <span>
                    🛏️ {property.bedrooms} Beds
                  </span>

                  <span>
                    🚿 {property.bathrooms} Baths
                  </span>

                  <span>
                    📐 {property.area}
                  </span>
                </div>

                {/* BUTTONS */}

                <div
                  style={{
                    display: "flex",
                    gap: "10px"
                  }}
                >
                  <Link
                    to={`/property/${property.id}`}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      backgroundColor: "#2563eb",
                      color: "white",
                      padding: "11px",
                      borderRadius: "7px",
                      textDecoration: "none",
                      fontWeight: "bold"
                    }}
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() =>
                      addToFavorites(property.id)
                    }
                    style={{
                      padding: "10px 13px",
                      backgroundColor: "#f1f5f9",
                      border:
                        "1px solid #cbd5e1",
                      borderRadius: "7px",
                      cursor: "pointer",
                      fontSize: "16px"
                    }}
                    title="Add to Favorites"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Properties;