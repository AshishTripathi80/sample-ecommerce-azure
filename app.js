const express = require("express");
const path = require("path");
const sql = require("mssql");

const app = express();
const PORT = process.env.PORT || 8080;

// SQL config (use your own details from Azure connection string)
const dbConfig = {
  user: "ashish", // your SQL username
  password: "Ichigo@919818", // your SQL password
  server: "ecommerce-sql-server-ashish.database.windows.net", // from Azure
  database: "EcommerceDB",
  options: {
    encrypt: true, // required for Azure
    trustServerCertificate: false
  }
};

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Fetch products from DB
app.get("/api/products", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query("SELECT * FROM Products");
    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Database connection failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
