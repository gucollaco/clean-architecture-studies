import { UserRepository } from '../ports/user-repository'
import { UserData } from '../user-data'

export class InMemoryUserRepository implements UserRepository {
    private repository: UserData[]

    constructor (repository: UserData[]) {
      this.repository = repository
    }

    async add (user: UserData): Promise<void> {
      const exists = await this.exists(user)
      if (!exists) this.repository.push(user)
    }

    async findUserByEmail (email: string): Promise<UserData> {
      const users = this.repository.filter((user) => user.email === email)
      return users.length > 0 ? users[0] : null
    }

    async findAllUsers (): Promise<UserData[]> {
      throw new Error('Method not implemented.')
    }

    exists (user: UserData): Promise<boolean> {
      throw new Error('Method not implemented.')
    }
}
