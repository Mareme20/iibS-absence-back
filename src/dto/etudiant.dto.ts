import { z } from "zod"

const optionalNonEmptyString = z.preprocess(
  (v) => (v === "" || v === null ? undefined : v),
  z.string().min(1).optional()
)

export const createEtudiantSchema = z.object({
  nom: z.string(),
  prenom: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  matricule: optionalNonEmptyString,
  adresse: z.string()
})


export const inscriptionSchema = z.object({
  etudiantId: z.number(),
  classeId: z.number(),
  annee: z.string()
})

 
