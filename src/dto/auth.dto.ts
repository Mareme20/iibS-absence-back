import { z } from "zod"
import { UserRole } from "../entity/User"

export const registerSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole)
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export type RegisterDto = z.infer<typeof registerSchema>
export type LoginDto = z.infer<typeof loginSchema>
