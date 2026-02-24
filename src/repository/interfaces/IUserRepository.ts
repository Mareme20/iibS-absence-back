import { User } from "../../entity/User"
import { UserRole } from "../../entity/User"

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: number): Promise<User | null>
  findByRole(role: UserRole): Promise<User | null>
}
