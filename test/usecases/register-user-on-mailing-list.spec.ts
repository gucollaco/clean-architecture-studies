import { UserData } from '../../src/entities'
import { UserRepository } from '../../src/usecases/register-user-on-mailing-list/ports'
import { RegisterUserOnMailingList } from '../../src/usecases/register-user-on-mailing-list'
import { InMemoryUserRepository } from './register-user-on-mailing-list/repository'

describe('Register use on mailing list use case', () => {
  test('Should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.registerUserOnMailingList({ name, email })
    const user = await repo.findUserByEmail('any@email.com')
    expect(user.name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('Should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'invalid_email'
    const response = (await usecase.registerUserOnMailingList({ name, email })).value as Error
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('Should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = ''
    const email = 'any@email.com'
    const response = (await usecase.registerUserOnMailingList({ name, email })).value as Error
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
