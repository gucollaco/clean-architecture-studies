import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { MissingParamError } from './errors/missing-param-error'
import { created, badRequest } from './utils/http-helper'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor (usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    const name = request.body.name
    const email = request.body.email
    if (!name || !email) {
      const missingNameParam = !name ? 'name ' : ''
      const missingEmailParam = !email ? 'email' : ''
      const missingParam = missingNameParam + missingEmailParam
      return badRequest(new MissingParamError(missingParam.trim()))
    }

    const userData: UserData = request.body
    const response = await this.usecase.registerUserOnMailingList(userData)

    if (response.isLeft()) return badRequest(response.value)
    if (response.isRight()) return created(response.value)
  }
}
