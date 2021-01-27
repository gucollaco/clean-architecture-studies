import { Email } from '@/entities'

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

  test('Should not accept strings larger than 320 chars', () => {
    const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept domain part larger than 255 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept empty local part', () => {
    const email = '@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept empty domain', () => {
    const email = 'any@'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept domain with a part larger than 63 chars', () => {
    const email = 'any@' + 'd'.repeat(64) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept local part with invalid char', () => {
    const email = 'any email@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept local part with two dots', () => {
    const email = 'any..email@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept local part with ending dot', () => {
    const email = 'any.@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('Should not accept email without an at-sign', () => {
    const email = 'anyemail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
