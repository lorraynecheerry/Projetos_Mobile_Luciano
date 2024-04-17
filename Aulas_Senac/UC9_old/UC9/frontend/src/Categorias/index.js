import { useState, useEffect } from "react"
import apiLocal from "../API/apiLocal/api"
import { toast } from "react-toastify"
import {useNavigate } from 'react-router-dom'




export default function CriarCategorias() {
    const navigation = useNavigate()
    const [nome, setNome] = useState('')
    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    async function handlecategoria(e) {
        e.preventDefault()
        try {
            await apiLocal.post('/CriarCategorias', {
                nome
            }, {
                headers: {
                    Authorization: `Bearer ` + `${token}`
                }
            })
            toast.success('Cadastrado com sucesso')
            navigation('/Dashboard')

        } catch (error) {

        }
    }

    return (
        <div>
            <h1>Categorias</h1>
            <form onSubmit={handlecategoria}>

                <input
                    type="text"
                    placeholder="Criar categoria"
                    value={nome}
                    onChange={(e)=> setNome(e.target.value)} />
                <button type="submit">enviar </button>



            </form>

        </div>
    )
}