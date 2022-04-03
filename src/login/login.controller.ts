import { Body, Controller, Post } from '@nestjs/common'
import { UserName } from 'src/types'
import { LoginService } from './login.service'

interface LoginRequest {
  userName: UserName
}
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/getUser')
  async getUser(@Body() { userName }: LoginRequest) {
    const status = await this.loginService.getUser(userName)
    return { ...status }
  }
}
