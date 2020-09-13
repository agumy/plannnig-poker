export class User {
  id: string
  name: string
  point: number
  isDecided: boolean

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.point = 0
    this.isDecided = false
  }

  decidePoint(point: number) {
    this.point = point
    this.isDecided = true
  }
}
