import { z } from "zod"

export const createAbsenceSchema = z.object({
  etudiantId: z.number(),
  coursId: z.number(),
  date: z.string(),
  nombreHeures: z.number().min(1)
})
// Pour les mises à jour partielles, on rend tous les champs optionnels
export const justifySchema = z.object({
  absenceId: z.number(),
  date: z.string(),
  motif: z.string()
})

export const traiterSchema = z.object({
  justificationId: z.number(),
  statut: z.enum(["ACCEPTEE", "REFUSEE"])
})
