import { encrypt } from 'src/utils/bcrypt';
import { PrismaService } from './../prismaModule/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private prismaService:PrismaService){}

    getUsers(){
        return this.prismaService.user.findMany();
    }

    async SingUp(Email: string, Password: string){
       try {
        const userFound = await this.prismaService.user.findUnique({
            where:{
                Email,
            }
        });

        const hashedPassword = await encrypt(Password);

        if (userFound) throw new BadRequestException('El usuario ya existe')
        const user = await this.prismaService.user.create({
            data:{
                Email,
                Password : hashedPassword,
                
            }
        })

        const {Password: _, ...userWithoutPassword} = user;

        return userWithoutPassword;
       } catch (error) {
        if(error instanceof BadRequestException){
            throw error;
        }
        throw new Error(error)
       }
    }

}
