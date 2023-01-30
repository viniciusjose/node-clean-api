import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { email, password, passwordConfirmation } = httpRequest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
