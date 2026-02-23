import { Repository } from "typeorm"
import { AppDataSource } from "../config/data-source"
import { User } from "../entity/User"
import { IUserRepository } from "./interfaces/IUserRepository"

export class UserRepository implements IUserRepository {

  private repo: Repository<User>

  constructor() {
    this.repo = AppDataSource.getRepository(User)
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repo.create(user)
    return await this.repo.save(newUser)
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({ where: { email } })
  }

  async findById(id: number): Promise<User | null> {
    return await this.repo.findOne({ where: { id } })
  }
}
