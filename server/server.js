const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("./swagger.yaml");
const dbConnection = require("./database/connection");

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database
dbConnection();

// Handle CORS issues
app.use(
  cors({
    origin: "http://localhost:3000", // Permet uniquement les requêtes de localhost:3000
    methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes HTTP autorisées
    allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
    credentials: true, // Permet les cookies et les données d'authentification
  })
);

// Request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle custom routes
app.use("/api/v1/user", require("./routes/userRoutes"));

// API Documentation
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.get("/", (req, res, next) => {
  res.send("Hello from my Express server v2!");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
