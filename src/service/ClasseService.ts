import { IClasseRepository } from "../repository/interfaces/IClasseRepository"
import { CreateClasseDto } from "../dto/classe.dto"

export class ClasseService {

  constructor(private classeRepository: IClasseRepository) {}

  async create(data: CreateClasseDto) {
    return await this.classeRepository.create(data)
  }

  async findAll() {
    return await this.classeRepository.findAll()
  }
}
