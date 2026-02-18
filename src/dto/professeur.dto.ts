import { z } from "zod"

export const createProfesseurSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  specialite: z.string().min(2),
  grade: z.string().min(2)
})

export type CreateProfesseurDto = z.infer<typeof createProfesseurSchema>
