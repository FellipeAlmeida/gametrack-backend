import pool from '../database/database.js'
import { criaJogoService } from '../services/jogo.services.js'

export async function criaJogo(req, res){
    try{
        const { titulo, capa_url, descricao, genero, plataforma, nota_media, criado_em } = req.body

        await criaJogoService(req.body)
        return res.status(201).json({message: 'Jogo criado com sucesso!'})
    } catch (error) {
        return res.status(500).json({erro: error.message})
    }
}