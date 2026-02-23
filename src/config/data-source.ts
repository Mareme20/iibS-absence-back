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

const env = process.env
const isProduction = env.NODE_ENV === "production"
const dbUrl = env.DATABASE_URL
const isRender = env.RENDER === "true"
const sslMode = (env.PGSSLMODE || "").toLowerCase()
const forceSslFromMode = sslMode === "require" || sslMode === "verify-ca" || sslMode === "verify-full"
const disableSsl = env.DB_SSL === "false"
const useSsl = !disableSsl && (env.DB_SSL === "true" || forceSslFromMode || isRender || isProduction)

export const AppDataSource = new DataSource({
  type: "postgres",
  ...(dbUrl
    ? { url: dbUrl }
    : {
        host: env.DB_HOST || "localhost",
        port: Number(env.DB_PORT) || 5432,
        username: String(env.DB_USER || "postgres"),
        password: String(env.DB_PASSWORD || "postgres"),
        database: String(env.DB_NAME || "iibs_absence")
      }),
  synchronize: true,
  logging: false,
  entities: [User, Classe, Cours, Etudiant, Inscription, Absence, Professeur, Justification],
  migrations: [],
  subscribers: [],
  ssl: useSsl ? { rejectUnauthorized: false } : false
})
