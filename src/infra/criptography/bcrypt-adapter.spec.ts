import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
import { Encrypter } from '../../data/protocols/encrypter'

interface SutTypes {
  sut: Encrypter
}

const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter(12)
  return {
    sut
  }
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hash') })
  }
}))

describe('Bcrypt adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const { sut } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  it('should return a hash on sucess', async () => {
    const { sut } = makeSut()

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hash')
  })

  it('should  throw if BcryptAdapter throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
