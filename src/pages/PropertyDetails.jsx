import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import.meta.env.VITE_API_URL

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [message, setMessage] = useState("");
  const [inquiryStatus, setInquiryStatus] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/properties`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  const addToFavorites = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const propertyId = Number(id);

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

  const handleInquiry = (e) => {
    e.preventDefault();

    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      setInquiryStatus(
        "Please login before sending an inquiry."
      );
      return;
    }

    const inquiry = {
      propertyId: Number(id),
      userId: loggedInUser.id,
      message: message
    };

    axios
      .post(
        "https://estatepro-backend-6u7h.onrender.com/api/inquiries",
        inquiry
      )
      .then(() => {
        setInquiryStatus(
          "Inquiry sent successfully! ✅"
        );

        setMessage("");
      })
      .catch((error) => {
        console.error(error);

        setInquiryStatus(
          "Failed to send inquiry."
        );
      });
  };

  if (!property) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
          backgroundColor: "#f8fafc",
          minHeight: "100vh"
        }}
      >
        <h2>Loading property...</h2>
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
      {/* BACK BUTTON */}

      <div
        style={{
          padding: "25px 7%"
        }}
      >
        <Link
          to="/properties"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          ← Back to Properties
        </Link>
      </div>

      {/* MAIN PROPERTY */}

      <div
        style={{
          margin: "0 7%",
          backgroundColor: "white",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)"
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
              "https://via.placeholder.com/1200x600?text=Property+Image"
            }
            alt={property.title}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover"
            }}
          />

          <span
            style={{
              position: "absolute",
              top: "25px",
              left: "25px",
              backgroundColor:
                property.status === "SOLD"
                  ? "#dc2626"
                  : "#16a34a",
              color: "white",
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: "bold",
              fontSize: "14px"
            }}
          >
            {property.status}
          </span>
        </div>

        {/* PROPERTY INFORMATION */}

        <div
          style={{
            padding: "35px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
              flexWrap: "wrap"
            }}
          >
            <div>
              <p
                style={{
                  color: "#2563eb",
                  fontWeight: "bold",
                  marginBottom: "8px"
                }}
              >
                {property.propertyType}
              </p>

              <h1
                style={{
                  fontSize: "36px",
                  color: "#0f172a",
                  margin: "5px 0 10px"
                }}
              >
                {property.title}
              </h1>

              <p
                style={{
                  color: "#64748b",
                  fontSize: "17px"
                }}
              >
                📍 {property.location}
              </p>
            </div>

            <div
              style={{
                textAlign: "right"
              }}
            >
              <p
                style={{
                  color: "#64748b",
                  marginBottom: "5px"
                }}
              >
                Property Price
              </p>

              <h2
                style={{
                  color: "#2563eb",
                  fontSize: "30px",
                  margin: 0
                }}
              >
                ₹{formatPrice(property.price)}
              </h2>
            </div>
          </div>

          {/* PROPERTY FEATURES */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "15px",
              margin: "30px 0"
            }}
          >
            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "28px" }}>
                🛏️
              </div>

              <strong>
                {property.bedrooms}
              </strong>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#64748b"
                }}
              >
                Bedrooms
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "28px" }}>
                🚿
              </div>

              <strong>
                {property.bathrooms}
              </strong>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#64748b"
                }}
              >
                Bathrooms
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "28px" }}>
                📐
              </div>

              <strong>
                {property.area}
              </strong>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#64748b"
                }}
              >
                Area
              </p>
            </div>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e2e8f0",
              margin: "30px 0"
            }}
          />

          {/* DESCRIPTION */}

          <h2
            style={{
              color: "#0f172a"
            }}
          >
            About This Property
          </h2>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.8",
              fontSize: "16px"
            }}
          >
            {property.description ||
              "No description available for this property."}
          </p>

          {/* FAVORITE */}

          <button
            onClick={addToFavorites}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              backgroundColor: "#fff1f2",
              color: "#e11d48",
              border: "1px solid #fecdd3",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ❤️ Add to Favorites
          </button>
        </div>
      </div>

      {/* INQUIRY SECTION */}

      <div
        style={{
          margin: "35px 7% 0",
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.06)"
        }}
      >
        <h2
          style={{
            color: "#0f172a",
            marginTop: 0
          }}
        >
          📩 Interested in this Property?
        </h2>

        <p
          style={{
            color: "#64748b"
          }}
        >
          Send an inquiry to express your interest
          in this property.
        </p>

        <form onSubmit={handleInquiry}>
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            required
            rows="5"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              boxSizing: "border-box",
              fontSize: "15px",
              resize: "vertical"
            }}
          />

          <button
            type="submit"
            style={{
              marginTop: "15px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "13px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "15px"
            }}
          >
            Send Inquiry 📩
          </button>
        </form>

        {inquiryStatus && (
          <p
            style={{
              marginTop: "15px",
              color: inquiryStatus.includes("successfully")
                ? "#16a34a"
                : "#dc2626",
              fontWeight: "bold"
            }}
          >
            {inquiryStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;