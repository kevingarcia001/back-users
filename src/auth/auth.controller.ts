
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

interface UserDTO{
    Email: string,
    Password: string
}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Get('log-in')
    login(){
        return 'login correcto'
    }

    @Get('users')
    getUsers(){
        return this.authService.getUsers();
    }

    @Post('sing-up')
    signUp(@Body()  user: UserDTO){
        
        return this.authService.SingUp(user.Email, user.Password);
    }
}
