import { CollectionReference } from '@google-cloud/firestore'
import { Inject, Injectable } from '@nestjs/common'
import { UserDocument } from 'src/documents/user.document'
import { UserName } from 'src/types'

interface UserResponse {
  user?: { userName: UserName; age: number }
  status: 'success' | 'not found'
}
@Injectable()
export class LoginService {
  constructor(
    @Inject(UserDocument.collectionName)
    private readonly userCollection: CollectionReference<UserDocument>,
  ) {}

  async getUser(userName: UserName): Promise<UserResponse> {
    const userDocRef = this.userCollection.where('userName', '==', userName)
    const userDocSnapshot = await userDocRef.get()
    if (userDocSnapshot.empty) {
      return { status: 'not found' }
    }
    const userDoc = userDocSnapshot.docs[0].data()
    return {
      status: 'success',
      user: { userName: userDoc.userName, age: userDoc.age },
    }
  }
}
