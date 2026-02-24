import { z } from "zod"

export const createAbsenceSchema = z.object({
  etudiantId: z.number(),
  coursId: z.number(),
  date: z.string(),
  nombreHeures: z.number().min(1)
})

export const updateAbsenceSchema = z.object({
  date: z.string().optional(),
  nombreHeures: z.number().min(1).optional()
})
