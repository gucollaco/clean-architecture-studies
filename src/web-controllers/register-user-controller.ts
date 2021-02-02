import { UserData } from '@/entities'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { created, badRequest, serverError } from '@/web-controllers/utils/http-helper'
import { UseCase } from '@/usecases/ports'

export class RegisterUserController {
  private readonly usecase: UseCase

  constructor (usecase: UseCase) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const name = request.body.name
      const email = request.body.email
      if (!name || !email) {
        const missingNameParam = !name ? 'name ' : ''
        const missingEmailParam = !email ? 'email' : ''
        const missingParam = missingNameParam + missingEmailParam
        return badRequest(new MissingParamError(missingParam.trim()))
      }

      const userData: UserData = request.body
      const response = await this.usecase.perform(userData)

      if (response.isLeft()) return badRequest(response.value)
      if (response.isRight()) return created(response.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
