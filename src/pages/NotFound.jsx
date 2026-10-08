function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <h1
        style={{
          fontSize: "100px",
          margin: 0,
          color: "#2563eb"
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <p
        style={{
          color: "#64748b",
          maxWidth: "500px"
        }}
      >
        The page you are looking for does not exist.
      </p>

      <a
        href="/"
        style={{
          marginTop: "20px",
          backgroundColor: "#2563eb",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFound;