import express from "express"
import cors from "cors"
import authRouter from "./router/auth.router"
import classeRouter from "./router/classe.router"
import coursRouter from "./router/cours.router"
import etudiantRouter from "./router/etudiant.router"
import statsRouter from "./router/stats.router"

export const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/classes", classeRouter)
app.use("/api/cours", coursRouter)
app.use("/api/etudiants", etudiantRouter)
app.use("/api/stats", statsRouter)