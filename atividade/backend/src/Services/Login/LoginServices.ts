import prismaClient from "../../Prisma";
import { sign } from 'jsonwebtoken'
import { compare } from "bcryptjs";

interface Login {
    email: string
    password: string
}

class LoginServices {
    async execute({ email, password }: Login) {

        const usuario = await prismaClient.usuario.findFirst({
           
            where: {
                email: email
                
            }
        
        })
        console.log(usuario)
        if (!usuario) {
            throw new Error('Usuarios/Senha incorretas')
        }

        
        // const autenticado = await compare(password, usuario.senha)
        // if (!autenticado) {
        //     throw new Error('Usuarios/Senha incorretas')
        // }

        const token = sign({
            id: usuario.id,
            email: usuario.email
        },
            process.env.JWT_SECRET,
            {
                subject: usuario.id,
                expiresIn: '24h'
            }
        )

        return {
            id: usuario.id,
            email: usuario.email,
            token: token
        }
    }
}

export { LoginServices }