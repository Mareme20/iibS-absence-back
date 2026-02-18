import { AppDataSource } from "../config/data-source"
import { Justification } from "../entity/Justification"
import { Absence } from "../entity/Absence"
import { StatutJustification } from "../entity/Justification"

export class JustificationService {

  async create(data: any) {

    const absenceRepo = AppDataSource.getRepository(Absence)
    const justificationRepo = AppDataSource.getRepository(Justification)

    const absence = await absenceRepo.findOne({
      where: { id: data.absenceId }
    })

    if (!absence) {
      throw new Error("Absence not found")
    }

    const justification = justificationRepo.create({
      date: new Date(data.date),
      motif: data.motif,
      absence
    })

    return await justificationRepo.save(justification)
  }


 
async traiter(justificationId: number, statut: StatutJustification) {

  const justificationRepo = AppDataSource.getRepository(Justification)
  const absenceRepo = AppDataSource.getRepository(Absence)

  const justification = await justificationRepo.findOne({
    where: { id: justificationId },
    relations: ["absence"]
  })

  if (!justification) {
    throw new Error("Justification not found")
  }

  justification.statut = statut

  if (statut === StatutJustification.ACCEPTEE) {
    justification.absence.estJustifiee = true
    await absenceRepo.save(justification.absence)
  }

  return await justificationRepo.save(justification)
}

}
