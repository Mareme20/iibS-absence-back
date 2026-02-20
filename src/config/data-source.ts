import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config()
import { User } from "../entity/User"
import { Classe } from "../entity/Classe"
import { Cours } from "../entity/Cours"
import { Etudiant } from "../entity/Etudiant"
import { Inscription } from "../entity/Inscription"
import { Absence } from "../entity/Absence"
import { Justification } from "../entity/Justification"
import { Professeur } from "../entity/Professeur"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: String(process.env.DB_USER || "postgres"),
  password: String(process.env.DB_PASSWORD || "postgres"),
  database: String(process.env.DB_NAME || "iibs_absence"),
  synchronize: true,
  logging: false,
  entities: [User, Classe, Cours, Etudiant, Inscription, Absence,Professeur, Justification],
  migrations: [],
  subscribers: [],
  ssl: { rejectUnauthorized: false },
})
