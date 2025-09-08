const express = require("express");
const path = require("path");
const sql = require("mssql");
const appInsights = require("applicationinsights");

appInsights.setup("169faede-a3a6-4399-b09a-cb8ca172e7a3") // from Azure Application Insights resource
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
  user: "ashish",
  password: "Ichigo@919818",
  server: "ecommerce-sql-server-ashish.database.windows.net",
  database: "EcommerceDB",
  options: {
    encrypt: true,
    trustServerCertificate: false,
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

// Order endpoint -> call Azure Function
app.post("/api/orders", async (req, res) => {
  try {
    const order = req.body;

    const functionUrl =
      "https://ecommerce-orders-func-drb4arfje0bja5ha.centralindia-01.azurewebsites.net/api/ProcessOrder";

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
