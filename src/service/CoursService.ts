import { ICoursRepository } from "../repository/interfaces/ICoursRepository"
import { AppDataSource } from "../config/data-source"
import { User } from "../entity/User"
import { Classe } from "../entity/Classe"
import { CreateCoursDto } from "../dto/cours.dto"

export class CoursService {

  constructor(private coursRepository: ICoursRepository) {}

  async create(data: CreateCoursDto) {

    const userRepo = AppDataSource.getRepository(User)
    const classeRepo = AppDataSource.getRepository(Classe)

    const professeur = await userRepo.findOne({
      where: { id: data.professeurId }
    })

    if (!professeur) {
      throw new Error("Professeur not found")
    }

    const classes = await classeRepo.findByIds(data.classeIds)

    if (classes.length !== data.classeIds.length) {
      throw new Error("One or more classes not found")
    }

    if (data.heureFin <= data.heureDebut) {
      throw new Error("Invalid time range")
    }

    return await this.coursRepository.create({
      date: new Date(data.date),
      heureDebut: data.heureDebut,
      heureFin: data.heureFin,
      semestre: data.semestre,
      module: data.module,
      professeur,
      classes
    })
  }

  async findAll() {
    return await this.coursRepository.findAll()
  }
}
