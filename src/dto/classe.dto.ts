import { z } from "zod"

export const createClasseSchema = z.object({
  libelle: z.string().min(2),
  filiere: z.string().min(2),
  niveau: z.string().min(1)
})

export const updateClasseSchema = z.object({
  libelle: z.string().min(2).optional(),
  filiere: z.string().min(2).optional(),
  niveau: z.string().min(1).optional()
})

export type CreateClasseDto = z.infer<typeof createClasseSchema>
export type UpdateClasseDto = z.infer<typeof updateClasseSchema>
