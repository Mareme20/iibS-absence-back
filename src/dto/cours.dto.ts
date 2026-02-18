import { z } from "zod"

export const createCoursSchema = z.object({
  date: z.string(),
  heureDebut: z.string(),
  heureFin: z.string(),
  semestre: z.string(),
  module: z.string(),
  professeurId: z.number(),
  classeIds: z.array(z.number()).min(1)
})

export type CreateCoursDto = z.infer<typeof createCoursSchema>
