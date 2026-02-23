import { z } from "zod"

export const createEtudiantSchema = z.object({
  nom: z.string(),
  prenom: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  matricule: z.string(),
  adresse: z.string()
})


export const inscriptionSchema = z.object({
  etudiantId: z.number(),
  classeId: z.number(),
  annee: z.string()
})

 
