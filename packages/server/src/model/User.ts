import { nanoid } from 'nanoid'

export class User {
  id: string
  name: string

  constructor(name: string) {
    this.id = nanoid()
    this.name = name
  }
}
