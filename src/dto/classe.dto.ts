import { z } from "zod"

export const createClasseSchema = z.object({
  libelle: z.string().min(2),
  filiere: z.string().min(2),
  niveau: z.string().min(1)
})

export type CreateClasseDto = z.infer<typeof createClasseSchema>
