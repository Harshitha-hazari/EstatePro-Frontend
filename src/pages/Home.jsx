import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Home() {
  const [properties, setProperties] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const featuredProperties = properties.slice(0, 3);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* HERO SECTION */}

      <section
        style={{
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          padding: "60px 8%",
          boxSizing: "border-box",
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.72), rgba(15,23,42,0.72)), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            color: "white"
          }}
        >
          <p
            style={{
              color: "#93c5fd",
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "1px"
            }}
          >
            FIND YOUR PERFECT PROPERTY
          </p>

          <h1
            style={{
              fontSize: "52px",
              lineHeight: "1.1",
              margin: "15px 0"
            }}
          >
            Find Your Dream
            <br />
            Home Today 🏠
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#e2e8f0"
            }}
          >
            Discover apartments, houses, villas and plots
            in locations you love. Find the right property
            for your future.
          </p>

          <Link
            to="/properties"
            style={{
              display: "inline-block",
              marginTop: "20px",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "14px 25px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Explore Properties →
          </Link>
        </div>
      </section>

      {/* SEARCH BOX */}

      <section
        style={{
          marginTop: "-45px",
          position: "relative",
          padding: "0 8%"
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
            display: "flex",
            gap: "15px",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <div style={{ flex: 1, minWidth: "220px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "6px"
              }}
            >
              Location
            </label>

            <input
              type="text"
              placeholder="Enter city or location"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #cbd5e1",
                borderRadius: "7px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ minWidth: "180px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "6px"
              }}
            >
              Property Type
            </label>

            <select
              style={{
                padding: "12px",
                width: "100%",
                border: "1px solid #cbd5e1",
                borderRadius: "7px"
              }}
            >
              <option>All Types</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
              <option>Plot</option>
            </select>
          </div>

          <Link
            to="/properties"
            style={{
              marginTop: "20px",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "13px 25px",
              borderRadius: "7px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            🔍 Search
          </Link>
        </div>
      </section>

      {/* FEATURES */}

      <section
        style={{
          padding: "70px 8% 40px"
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px"
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              color: "#0f172a"
            }}
          >
            Why Choose Our Platform?
          </h2>

          <p
            style={{
              color: "#64748b"
            }}
          >
            Everything you need to find your ideal property.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: "25px"
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 3px 12px rgba(0,0,0,0.06)"
            }}
          >
            <div style={{ fontSize: "40px" }}>🏠</div>

            <h3>Wide Property Selection</h3>

            <p style={{ color: "#64748b" }}>
              Explore apartments, houses, villas and
              plots in different locations.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 3px 12px rgba(0,0,0,0.06)"
            }}
          >
            <div style={{ fontSize: "40px" }}>🔍</div>

            <h3>Easy Property Search</h3>

            <p style={{ color: "#64748b" }}>
              Quickly find properties using location,
              type, bedrooms and price filters.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 3px 12px rgba(0,0,0,0.06)"
            }}
          >
            <div style={{ fontSize: "40px" }}>📩</div>

            <h3>Easy Communication</h3>

            <p style={{ color: "#64748b" }}>
              Send inquiries about properties and keep
              track of your requests.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}

      <section
        style={{
          padding: "40px 8% 70px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            flexWrap: "wrap",
            gap: "10px"
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "32px",
                color: "#0f172a",
                marginBottom: "5px"
              }}
            >
              Featured Properties
            </h2>

            <p style={{ color: "#64748b" }}>
              Explore some of our available properties.
            </p>
          </div>

          <Link
            to="/properties"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            View All Properties →
          </Link>
        </div>

        {featuredProperties.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              textAlign: "center",
              borderRadius: "12px"
            }}
          >
            <p>No properties available yet.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "25px"
            }}
          >
            {featuredProperties.map((property) => (
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
                <img
                  src={
                    property.imageUrl ||
                    "https://via.placeholder.com/500x300?text=Property"
                  }
                  alt={property.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div style={{ padding: "20px" }}>
                  <span
                    style={{
                      backgroundColor: "#dcfce7",
                      color: "#15803d",
                      padding: "5px 10px",
                      borderRadius: "15px",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    {property.status}
                  </span>

                  <h3
                    style={{
                      color: "#0f172a",
                      marginBottom: "8px"
                    }}
                  >
                    {property.title}
                  </h3>

                  <p style={{ color: "#64748b" }}>
                    📍 {property.location}
                  </p>

                  <p
                    style={{
                      color: "#2563eb",
                      fontSize: "20px",
                      fontWeight: "bold"
                    }}
                  >
                    ₹{formatPrice(property.price)}
                  </p>

                  <p style={{ color: "#64748b" }}>
                    🛏️ {property.bedrooms} Bedrooms
                    &nbsp;&nbsp;
                    🚿 {property.bathrooms} Bathrooms
                  </p>

                  <Link
                    to={`/property/${property.id}`}
                    style={{
                      display: "block",
                      textAlign: "center",
                      backgroundColor: "#0f172a",
                      color: "white",
                      padding: "11px",
                      borderRadius: "7px",
                      textDecoration: "none",
                      marginTop: "15px",
                      fontWeight: "bold"
                    }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CALL TO ACTION */}

      <section
        style={{
          margin: "0 8% 60px",
          padding: "50px",
          borderRadius: "18px",
          backgroundColor: "#1d4ed8",
          color: "white",
          textAlign: "center"
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginTop: 0
          }}
        >
          Ready to Find Your New Home?
        </h2>

        <p
          style={{
            color: "#dbeafe",
            fontSize: "17px"
          }}
        >
          Browse our properties and find a place
          that feels like home.
        </p>

        <Link
          to="/properties"
          style={{
            display: "inline-block",
            marginTop: "15px",
            backgroundColor: "white",
            color: "#1d4ed8",
            padding: "13px 25px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Browse Properties
        </Link>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          backgroundColor: "#0f172a",
          color: "white",
          padding: "30px 8%",
          textAlign: "center"
        }}
      >
        <h3>🏠 EstatePro</h3>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: 0
          }}
        >
          Find your dream property with ease.
        </p>

        <p
          style={{
            color: "#64748b",
            fontSize: "13px"
          }}
        >
          © 2026 EstatePro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;

