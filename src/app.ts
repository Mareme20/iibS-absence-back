import express from "express";
import cors from "cors";
import authRouter from "./router/auth.router";
import classeRouter from "./router/classe.router";
import coursRouter from "./router/cours.router";
import etudiantRouter from "./router/etudiant.router";
import statsRouter from "./router/stats.router";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";

export const app = express();

/**
 * =============================
 * CORS CONFIGURATION
 * =============================
 */
app.use(
  cors({
    origin: "http://localhost:4200", // Frontend Angular
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Important pour gérer les requêtes preflight
app.use(cors());

/**
 * =============================
 * MIDDLEWARES
 * =============================
 */
app.use(express.json());

/**
 * =============================
 * SWAGGER
 * =============================
 */
const swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "IIBS Absence API Documentation",
  swaggerOptions: {
    persistAuthorization: true
  }
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

/**
 * =============================
 * ROUTES API
 * =============================
 */
app.use("/api/auth", authRouter);
app.use("/api/classes", classeRouter);
app.use("/api/cours", coursRouter);
app.use("/api/etudiants", etudiantRouter);
app.use("/api/stats", statsRouter);

/**
 * =============================
 * GLOBAL ERROR HANDLER
 * =============================
 */
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(400).json({
    success: false,
    message: err.message || "Server Error"
  });
});
