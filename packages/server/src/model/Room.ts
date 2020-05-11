import { IRoom } from '../../../schema'
import { User } from './User'

export class Room implements IRoom {
  id: string
  members: User[]
  host: User['id']

  constructor(id: string, members: User[]) {
    this.id = id
    this.members = members
    this.host = members[0].id
  }

  joinUser(user: User): Room {
    return new Room(this.id, [...this.members, user])
  }
}
