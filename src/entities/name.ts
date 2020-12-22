import { left, right } from '../shared/either'
import { InvalidNameError } from './errors/invalid-name-error'

export class Name {
  private readonly name: string

  private constructor (name: string) {
    this.name = name
  }

  static create (name: string) {
    if (!Name.validate(name)) return left(new InvalidNameError())

    return right(new Name(name))
  }

  static validate (name: string): boolean {
    if (!name) return false
    if (name.trim().length < 2 || name.trim().length > 256) return false

    return true
  }
}
