import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      setLoading(false);
      return;
    }

    Promise.all([
      axios.get("http://localhost:8080/api/inquiries"),
      axios.get("http://localhost:8080/api/properties")
    ])
      .then(([inquiryResponse, propertyResponse]) => {
        const userInquiries =
          inquiryResponse.data.filter(
            (inquiry) =>
              inquiry.userId === loggedInUser.id
          );

        setInquiries(userInquiries);
        setProperties(propertyResponse.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  const getProperty = (propertyId) => {
    return properties.find(
      (property) => property.id === propertyId
    );
  };

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
          padding: "70px 7%",
          textAlign: "center"
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "60px 30px",
            borderRadius: "15px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.06)"
          }}
        >
          <div style={{ fontSize: "55px" }}>
            🔐
          </div>

          <h2>Login Required</h2>

          <p
            style={{
              color: "#64748b"
            }}
          >
            Please login to view your inquiries.
          </p>

          <Link
            to="/login"
            style={{
              display: "inline-block",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px 25px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

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
          📩 My Inquiries
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "17px",
            marginBottom: 0
          }}
        >
          View the inquiries you have sent for
          properties.
        </p>
      </div>

      {/* CONTENT */}

      <div
        style={{
          margin: "40px 7%"
        }}
      >
        {loading ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "50px",
              textAlign: "center",
              borderRadius: "15px"
            }}
          >
            <h2>Loading your inquiries...</h2>
          </div>
        ) : inquiries.length === 0 ? (
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
              📩
            </div>

            <h2
              style={{
                color: "#0f172a"
              }}
            >
              No Inquiries Yet
            </h2>

            <p
              style={{
                color: "#64748b",
                marginBottom: "25px"
              }}
            >
              You haven't sent any property inquiries
              yet.
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
            {/* COUNT */}

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
                Your Submitted Inquiries
              </h2>

              <span
                style={{
                  color: "#64748b"
                }}
              >
                {inquiries.length} inquiries
              </span>
            </div>

            {/* INQUIRY CARDS */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}
            >
              {inquiries.map((inquiry) => {
                const property = getProperty(
                  inquiry.propertyId
                );

                return (
                  <div
                    key={inquiry.id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "14px",
                      overflow: "hidden",
                      boxShadow:
                        "0 4px 15px rgba(0,0,0,0.07)",
                      display: "grid",
                      gridTemplateColumns:
                        "280px 1fr"
                    }}
                  >
                    {/* PROPERTY IMAGE */}

                    <div>
                      <img
                        src={
                          property?.imageUrl ||
                          "https://via.placeholder.com/500x350?text=Property"
                        }
                        alt={
                          property?.title ||
                          "Property"
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          minHeight: "260px",
                          objectFit: "cover"
                        }}
                      />
                    </div>

                    {/* INQUIRY DETAILS */}

                    <div
                      style={{
                        padding: "25px"
                      }}
                    >
                      {property ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent:
                                "space-between",
                              gap: "15px",
                              flexWrap: "wrap"
                            }}
                          >
                            <div>
                              <p
                                style={{
                                  color: "#2563eb",
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  margin: 0
                                }}
                              >
                                {property.propertyType}
                              </p>

                              <h2
                                style={{
                                  color: "#0f172a",
                                  margin:
                                    "6px 0 8px"
                                }}
                              >
                                {property.title}
                              </h2>

                              <p
                                style={{
                                  color: "#64748b",
                                  margin: 0
                                }}
                              >
                                📍{" "}
                                {property.location}
                              </p>
                            </div>

                            <div>
                              <strong
                                style={{
                                  color: "#2563eb",
                                  fontSize: "20px"
                                }}
                              >
                                ₹
                                {formatPrice(
                                  property.price
                                )}
                              </strong>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              margin:
                                "20px 0",
                              padding:
                                "12px 0",
                              borderTop:
                                "1px solid #e2e8f0",
                              borderBottom:
                                "1px solid #e2e8f0",
                              color: "#64748b",
                              fontSize: "14px"
                            }}
                          >
                            <span>
                              🛏️{" "}
                              {property.bedrooms}{" "}
                              Beds
                            </span>

                            <span>
                              🚿{" "}
                              {property.bathrooms}{" "}
                              Baths
                            </span>

                            <span>
                              📐 {property.area}
                            </span>
                          </div>
                        </>
                      ) : (
                        <h2>
                          Property #{inquiry.propertyId}
                        </h2>
                      )}

                      {/* MESSAGE */}

                      <div
                        style={{
                          backgroundColor: "#f8fafc",
                          borderRadius: "10px",
                          padding: "18px",
                          marginBottom: "18px"
                        }}
                      >
                        <p
                          style={{
                            color: "#64748b",
                            fontSize: "13px",
                            marginTop: 0,
                            fontWeight: "bold"
                          }}
                        >
                          YOUR MESSAGE
                        </p>

                        <p
                          style={{
                            color: "#334155",
                            lineHeight: "1.6",
                            marginBottom: 0
                          }}
                        >
                          {inquiry.message}
                        </p>
                      </div>

                      {/* VIEW PROPERTY */}

                      {property && (
                        <Link
                          to={`/property/${property.id}`}
                          style={{
                            display:
                              "inline-block",
                            backgroundColor:
                              "#2563eb",
                            color: "white",
                            padding:
                              "10px 18px",
                            borderRadius: "7px",
                            textDecoration:
                              "none",
                            fontWeight: "bold"
                          }}
                        >
                          View Property →
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyInquiries;