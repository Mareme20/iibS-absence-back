import { z } from "zod"
import { StatutJustification } from "../entity/Justification"

const optionalNonEmptyString = z.preprocess(
  (v) => (v === "" || v === null ? undefined : v),
  z.string().min(1).optional()
)

export const createJustificationSchema = z.object({
  absenceId: z.number(),
  date: z.string(),
  motif: z.string().min(1)
})

export const updateJustificationSchema = z.object({
  date: z.string().optional(),
  motif: optionalNonEmptyString
})

export const traiterJustificationSchema = z.object({
  statut: z.enum([StatutJustification.ACCEPTEE, StatutJustification.REFUSEE])
})

export const mesJustificationsQuerySchema = z.object({
  dateDebut: optionalNonEmptyString,
  dateFin: optionalNonEmptyString,
  statut: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.nativeEnum(StatutJustification).optional()
  )
})

export type CreateJustificationDto = z.infer<typeof createJustificationSchema>
export type UpdateJustificationDto = z.infer<typeof updateJustificationSchema>
export type TraiterJustificationDto = z.infer<typeof traiterJustificationSchema>
export type MesJustificationsQueryDto = z.infer<typeof mesJustificationsQuerySchema>
