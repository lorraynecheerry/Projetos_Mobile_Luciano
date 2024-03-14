import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface LoginClientes {
    email: string
    password: string
}

class LoginClientesServices {
    async execute({ email, password }: LoginClientes) {
        const login = await prismaClient.cliente.findFirst({
            where: {
                email: email
            }
        })
        if (!login) {
            throw new Error('Usuario/Senha incorretos')
        }
        const autenticado = await compare(password, login.senha)
        if (!autenticado) {
            throw new Error('Email/Senha Incorretos')
        }
        const token = sign({
            id: login.id,
            email: login.email
        },
            process.env.JWT_SECRET,
            {
                subject: login.id,
                expiresIn: 1000000
            }
        )
        return {
            id: login.id,
            nome: login.nome,
            email:login.email,
            token: token
        }

    }
}

export { LoginClientesServices }