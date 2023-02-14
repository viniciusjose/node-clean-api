import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', function () {
  it('should return false if validator returns false', function () {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })
})
