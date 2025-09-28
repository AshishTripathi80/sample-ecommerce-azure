require("dotenv").config();
const express = require("express");
const path = require("path");
const sql = require("mssql");
const appInsights = require("applicationinsights");

appInsights
  .setup(process.env.APP_INSIGHTS_KEY) // from Azure Application Insights resource
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true, true)
  .setSendLiveMetrics(true)
  .start();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for JSON body parsing
app.use(express.json());

// SQL config
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
  },
};

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Fetch products from DB
app.get("/api/products", async (req, res) => {
  try {
    //await new Promise(resolve => setTimeout(resolve, 3000));
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query("SELECT * FROM Products");
    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Database connection failed");
  }
});

// Get blob storage image URL
app.get("/api/images/:imageName", (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imageUrl = `${process.env.BLOB_STORAGE_URL}/product-images/${imageName}?${process.env.BLOB_SAS_TOKEN}`;
    res.json({ imageUrl });
  } catch (err) {
    console.error("Image URL error:", err);
    res.status(500).send("Failed to get image URL");
  }
});

// Order endpoint -> call Azure Function
app.post("/api/orders", async (req, res) => {
  try {
    const order = req.body;

    const functionUrl = process.env.AZURE_FUNCTION_URL;

    // Use built-in fetch (Node.js 18+)
    const response = await fetch(functionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Order function error:", err);
    res.status(500).send("Failed to process order");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
