import pool from '../database/database.js'

export async function criaJogoService(body){
    const { titulo, capa_url, descricao, genero, plataforma } = body

    if (!titulo){
        throw new Error('Jogo deve ter titulo.')
    }

    await pool.query(`INSERT INTO jogo (titulo, capa_url, descricao, genero, plataforma) 
        VALUES ($1, $2, $3, $4, $5)`, 
        [titulo, capa_url, descricao, genero, plataforma]
    )
}