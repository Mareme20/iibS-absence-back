import { z } from "zod"
import { UserRole } from "../entity/User"

export const registerSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole),
  matricule: z.string().min(1).optional(),
  adresse: z.string().min(1).optional()
}).superRefine((data, ctx) => {
  if (data.role === UserRole.ETUDIANT) {
    if (!data.adresse) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["adresse"],
        message: "L'adresse est requise pour un étudiant"
      })
    }
  }
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export type RegisterDto = z.infer<typeof registerSchema>
export type LoginDto = z.infer<typeof loginSchema>
