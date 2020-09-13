import { IRoom } from '../../../schema'
import { User } from './User'

export class Room implements IRoom {
  id: string
  members: User[]
  host: User['id']

  constructor(id: string, user: User) {
    this.id = id
    this.members = [user]
    this.host = user.id
  }

  joinUser(user: User): void {
    this.members.push(user)
  }

  leaveUser(userId: User['id']): void {
    const members = this.members.filter((user) => user.id !== userId)
    this.members = members
  }

  decidePoint(userId: User['id'], point: number): void {
    const user = this.members.find((u) => u.id === userId)
    if (user) {
      user.decidePoint(point)

      this.members = this.members.map((u) => {
        if (u.id !== userId) {
          return u
        }

        return user
      })
    }
  }
}
