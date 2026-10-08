import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  const addToFavorites = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(property.id)) {
      favorites.push(property.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));

      alert("Property added to favorites!");
    } else {
      alert("Property is already in favorites!");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}
    >
      <img
        src={
          property.imageUrl ||
          "https://via.placeholder.com/300x200?text=Property+Image"
        }
        alt={property.title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px"
        }}
      />

      <h2>{property.title}</h2>

      <p>
        <strong>Location:</strong> {property.location}
      </p>

      <p>
        <strong>Price:</strong> ₹{property.price}
      </p>

      <p>
        <strong>Type:</strong> {property.propertyType}
      </p>

      <p>
        <strong>Bedrooms:</strong> {property.bedrooms}
      </p>

      <p>
        <strong>Bathrooms:</strong> {property.bathrooms}
      </p>

      <button
        onClick={addToFavorites}
        style={{
          marginRight: "10px",
          padding: "8px 12px"
        }}
      >
        ❤️ Add to Favorites
      </button>

      <Link to={`/property/${property.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default PropertyCard;