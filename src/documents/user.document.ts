import { UserName } from 'src/types'

export class UserDocument {
  static collectionName = 'users'
  userName: UserName
  age: number
}
