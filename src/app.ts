import express from "express"
import cors from "cors"
import authRouter from "./router/auth.router"
import classeRouter from "./router/classe.router"
import coursRouter from "./router/cours.router"
import etudiantRouter from "./router/etudiant.router"
import statsRouter from "./router/stats.router"
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';

export const app = express()

app.use(cors())
app.use(express.json())

// Options pour éviter les erreurs de Content-Security-Policy sur Render
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "IIBS Absence API Documentation",
    swaggerOptions: {
        persistAuthorization: true,
    }
};

// Route Swagger (Placée avant les autres routes API)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

// Routes API
app.use("/api/auth", authRouter)
app.use("/api/classes", classeRouter)
app.use("/api/cours", coursRouter)
app.use("/api/etudiants", etudiantRouter)
app.use("/api/stats", statsRouter)
