import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400
})

export const serverError = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 500
})
