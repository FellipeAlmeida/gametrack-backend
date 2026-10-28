import pool from '../database/database.js'
import ApiError from '../error/api.error.js'

// --------------------- CRIA ---------------------

export async function criaJogoService(body){
    const { titulo, capa_url, descricao, genero, plataforma } = body

    if (!titulo){
        throw new ApiError('Jogo deve ter titulo.', 400)
    }

    await pool.query(`INSERT INTO jogo (titulo, capa_url, descricao, genero, plataforma) 
        VALUES ($1, $2, $3, $4, $5)`, 
        [titulo, capa_url, descricao, genero, plataforma]
    )
}

// --------------------- LISTA ---------------------

export async function listaJogoService(genero){

    let query = 'SELECT * FROM jogo'
    const valores = []

    if (genero) {
        query += ' WHERE genero = $1'
        valores.push(genero)
    }

    const jogos = await pool.query(query, valores)

    if (jogos.rows.length <= 0){
        throw new ApiError('Sem jogos disponiveis.', 404)
    }

    return jogos['rows']
}

// --------------------- BUSCA ---------------------

export async function buscaJogoService(id){

    const jogo = await pool.query(`SELECT * FROM jogo WHERE id = $1`, [id])

    if (jogo.rows.length == 0){ 
        throw new ApiError('Jogo não existe', 404)
    }

    return jogo['rows']
}

// --------------------- EDITA ---------------------

export async function editaJogoService(id, body){

    const { titulo, capa_url, descricao, genero, plataforma } = body

    const jogo = await pool.query(`SELECT * FROM jogo WHERE id = $1`, [id])

    if (jogo.rows.length <= 0){
        throw new ApiError('Jogo não existe', 404)
    }

    if (!titulo && !capa_url && !descricao && !genero && !plataforma) {
        throw new ApiError('Informe os dados que deseja atualizar.', 400);
    }

    if (titulo == undefined){
        throw new ApiError('Titulo não pode ser undefined.', 400);
    }

    await pool.query(`UPDATE jogo SET titulo = $1, capa_url = $2, descricao = $3, genero = $4, plataforma = $5 WHERE id = $6`, 
    [titulo, capa_url, descricao, genero, plataforma, id])
}

// --------------------- DELETA ---------------------

export async function deletaJogoService(id){

    const jogo = await pool.query(`SELECT * FROM jogo WHERE id = $1`, [id])

    if (jogo.rows.length <= 0){
        throw new ApiError('Jogo não existe', 404)
    }

    await pool.query(`DELETE FROM jogo WHERE id = $1`, [id])
}