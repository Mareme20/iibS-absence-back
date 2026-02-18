import { AppDataSource } from "../config/data-source"
import { Absence } from "../entity/Absence"
import { Etudiant } from "../entity/Etudiant"
import { Cours } from "../entity/Cours"

export class AbsenceService {

  async create(data: any) {

    const absenceRepo = AppDataSource.getRepository(Absence)
    const etudiantRepo = AppDataSource.getRepository(Etudiant)
    const coursRepo = AppDataSource.getRepository(Cours)

    const etudiant = await etudiantRepo.findOne({ where: { id: data.etudiantId } })
    const cours = await coursRepo.findOne({ where: { id: data.coursId } })

    if (!etudiant || !cours) {
      throw new Error("Etudiant or Cours not found")
    }

    const absence = absenceRepo.create({
      date: new Date(data.date),
      nombreHeures: data.nombreHeures,
      etudiant,
      cours
    })

    return await absenceRepo.save(absence)
  }
}
