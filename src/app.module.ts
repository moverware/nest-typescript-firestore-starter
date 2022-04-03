import { Module } from '@nestjs/common'
import { FirestoreModule } from './firestore/firestore.module'
import { LoginModule } from './login/login.module'

@Module({
  imports: [LoginModule, FirestoreModule.register()],
})
export class AppModule {}
