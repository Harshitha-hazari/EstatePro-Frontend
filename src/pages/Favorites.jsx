import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import.meta.env.VITE_API_URL

function Favorites() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/properties`)
      .then((response) => {
        const favoriteProperties =
          response.data.filter((property) =>
            favorites.includes(property.id)
          );

        setProperties(favoriteProperties);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFavorite = (propertyId) => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const updatedFavorites = favorites.filter(
      (id) => id !== propertyId
    );

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    setProperties(
      properties.filter(
        (property) => property.id !== propertyId
      )
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        paddingBottom: "60px"
      }}
    >
      {/* HEADER */}

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
          ❤️ My Favorite Properties
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "17px",
            marginBottom: 0
          }}
        >
          Properties you've saved for later.
        </p>
      </div>

      {/* CONTENT */}

      <div
        style={{
          margin: "40px 7%"
        }}
      >
        {properties.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "70px 30px",
              textAlign: "center",
              borderRadius: "15px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.06)"
            }}
          >
            <div
              style={{
                fontSize: "65px",
                marginBottom: "15px"
              }}
            >
              ❤️
            </div>

            <h2
              style={{
                color: "#0f172a"
              }}
            >
              No Favorite Properties
            </h2>

            <p
              style={{
                color: "#64748b",
                marginBottom: "25px"
              }}
            >
              You haven't saved any properties yet.
              Start exploring and save properties you
              like.
            </p>

            <Link
              to="/properties"
              style={{
                display: "inline-block",
                backgroundColor: "#2563eb",
                color: "white",
                padding: "12px 22px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Explore Properties →
            </Link>
          </div>
        ) : (
          <>
            {/* RESULT COUNT */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#0f172a"
                }}
              >
                Saved Properties
              </h2>

              <span
                style={{
                  color: "#64748b"
                }}
              >
                {properties.length} saved
              </span>
            </div>

            {/* CARDS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, minmax(0, 1fr))",
                gap: "25px"
              }}
            >
              {properties.map((property) => (
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
                        height: "220px",
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

                    <button
                      onClick={() =>
                        removeFavorite(property.id)
                      }
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "white",
                        cursor: "pointer",
                        fontSize: "17px"
                      }}
                      title="Remove from Favorites"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* DETAILS */}

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
                        color: "#64748b"
                      }}
                    >
                      📍 {property.location}
                    </p>

                    <h2
                      style={{
                        color: "#2563eb",
                        margin: "15px 0"
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
                        marginBottom: "15px",
                        display: "flex",
                        justifyContent:
                          "space-between",
                        color: "#475569",
                        fontSize: "13px"
                      }}
                    >
                      <span>
                        🛏️ {property.bedrooms}
                      </span>

                      <span>
                        🚿 {property.bathrooms}
                      </span>

                      <span>
                        📐 {property.area}
                      </span>
                    </div>

                    <Link
                      to={`/property/${property.id}`}
                      style={{
                        display: "block",
                        textAlign: "center",
                        backgroundColor: "#2563eb",
                        color: "white",
                        padding: "11px",
                        borderRadius: "7px",
                        textDecoration: "none",
                        fontWeight: "bold"
                      }}
                    >
                      View Property
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favorites;