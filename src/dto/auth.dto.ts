import { z } from "zod"
import { UserRole } from "../entity/User"

const optionalNonEmptyString = z.preprocess(
  (v) => (v === "" ? undefined : v),
  z.string().min(1).optional()
)

export const registerSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole),
  matricule: optionalNonEmptyString,
  adresse: optionalNonEmptyString
}).superRefine((data, ctx) => {
  if (data.role === UserRole.ETUDIANT && !data.adresse) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["adresse"],
      message: "L'adresse est requise pour un étudiant"
    })
  }

  // Active ceci si tu veux matricule obligatoire pour certains rôles
  // if (data.role === UserRole.ENSEIGNANT && !data.matricule) {
  //   ctx.addIssue({
  //     code: z.ZodIssueCode.custom,
  //     path: ["matricule"],
  //     message: "Le matricule est requis pour un enseignant"
  //   })
  // }
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export type RegisterDto = z.infer<typeof registerSchema>
export type LoginDto = z.infer<typeof loginSchema>
