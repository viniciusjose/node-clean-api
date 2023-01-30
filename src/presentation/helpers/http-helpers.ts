import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400
})

export const serverError = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 500
})

export const success = (data: any): HttpResponse => ({
  body: data,
  statusCode: 200
})

export const created = (data: any): HttpResponse => ({
  body: data,
  statusCode: 201
})
