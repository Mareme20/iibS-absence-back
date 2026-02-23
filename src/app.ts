import express from "express";
import cors from "cors";
import { NextFunction, Request, Response } from "express";
import authRouter from "./router/auth.router";
import classeRouter from "./router/classe.router";
import coursRouter from "./router/cours.router";
import etudiantRouter from "./router/etudiant.router";
import statsRouter from "./router/stats.router";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import proffesseurRouter from "./router/professeur.router";
import absenceRouter from "./router/absence.router";
import justificationRouter from "./router/justification.router";

export const app = express();

/**
 * =============================
 * CORS CONFIGURATION
 * =============================
 */
const defaultAllowedOrigins = [
  "http://localhost:4200",
  "https://iib-s-absence-front.vercel.app"
];

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...configuredOrigins])];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin/non-browser requests (curl, healthchecks)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow Vercel preview deployments for this project
      if (/^https:\/\/iib-s-absence-front-.*\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

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
app.use("/api/professeurs", proffesseurRouter);
app.use("/api/absences", absenceRouter);
app.use("/api/justifications", justificationRouter);

/**
 * =============================
 * GLOBAL ERROR HANDLER
 * =============================
 */
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const message = err instanceof Error ? err.message : "Server Error";
  res.status(400).json({
    success: false,
    message
  });
});
