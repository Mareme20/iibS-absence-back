import { IClasseRepository } from "../repository/interfaces/IClasseRepository"
import { IInscriptionRepository } from "../repository/interfaces/IInscriptionRepository"
import { CreateClasseDto, UpdateClasseDto } from "../dto/classe.dto"

export class ClasseService {

  constructor(
    private classeRepository: IClasseRepository,
    private inscriptionRepository: IInscriptionRepository
  ) {}

  async create(data: CreateClasseDto) {
    return await this.classeRepository.create(data)
  }

  async findAll() {
    return await this.classeRepository.findAll()
  }

  async findById(id: number) {
    return await this.classeRepository.findById(id)
  }

  async update(id: number, data: UpdateClasseDto) {
    const classe = await this.classeRepository.findById(id)
    if (!classe) {
      throw new Error("Classe non trouvée")
    }
    return await this.classeRepository.update(id, data)
  }

  async delete(id: number) {
    const classe = await this.classeRepository.findById(id)
    if (!classe) {
      throw new Error("Classe non trouvée")
    }
    return await this.classeRepository.delete(id)
  }

  async findEtudiantsByClasse(id: number, annee?: string) {
    const classe = await this.classeRepository.findById(id)
    if (!classe) {
      throw new Error("Classe non trouvée")
    }

    const inscriptions = await this.inscriptionRepository.findByClasse(id, annee)
    return inscriptions.map((inscription) => inscription.etudiant)
  }
}
