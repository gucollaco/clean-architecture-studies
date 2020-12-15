import { Email } from './email'

describe('Email validation', () => {
  test('Should not accept null string', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept undefined string', () => {
    const email = undefined
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept empty string', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should accept valid email', () => {
    const email = 'any@email.com'
    expect(Email.validate(email)).toBeTruthy()
  })

  test('Should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
