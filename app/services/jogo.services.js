import pool from '../database/database.js'
import ApiError from '../error/api.error.js'

// --------------------- CRIA ---------------------

export async function criaJogoService(body){
    const { titulo, descricao, genero, plataforma } = body

    const plataformasValidas = [
        'PC',
        'PlayStation',
        'Xbox',
        'Nintendo Switch'
    ];

    if (!Array.isArray(plataforma)){
        throw new ApiError('Plataforma deve ser um array.', 400);
    }

    if (plataforma.length === 0){
        throw new ApiError('Plataforma deve ter pelo menos um valor.', 400);
    }

    for (const p of plataforma) {
        if (!plataformasValidas.includes(p)) {
            throw new ApiError('Plataforma inválida: ' + p, 400);
        }
    }   

    if (!titulo){
        throw new ApiError('Jogo deve ter titulo.', 400)
    }

    await pool.query(`INSERT INTO jogo (titulo, descricao, genero, plataforma) 
        VALUES ($1, $2, $3, $4)`, 
        [titulo, descricao, genero, plataforma]
    )
}

// --------------------- LISTA ---------------------

export async function listaJogoService(genero){

    let query = 'SELECT * FROM jogo'
    const valores = []
    
    if (genero && (typeof genero !== "string" || !isNaN(genero))){ // <-- se for diferente de str ou se for number 
        throw new ApiError('Gênero precisa ser string', 404)
    }

    if (genero) {
        query += ' WHERE genero = $1'
        valores.push(genero)
    }

    const jogos = await pool.query(query, valores)

    return jogos['rows']
}

// --------------------- BUSCA ---------------------

export async function buscaJogoService(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        throw new ApiError('Jogo não existe', 404)
    }

    const jogo = await pool.query(
        `SELECT * FROM jogo WHERE id = $1`,
        [Number(id)]
    )

    if (jogo.rows.length === 0) {
        throw new ApiError('Jogo não existe', 404)
    }

    return jogo.rows[0]
}

// --------------------- EDITA ---------------------

export async function editaJogoService(id, body){

    const { titulo, descricao, genero, plataforma } = body

    const jogo = await pool.query(`SELECT * FROM jogo WHERE id = $1`, [id])

    if (jogo.rows.length <= 0){
        throw new ApiError('Jogo não existe', 404)
    }

    if (!titulo && !descricao && !genero && !plataforma) {
        throw new ApiError('Informe os dados que deseja atualizar.', 400);
    }

    if (titulo == undefined){
        throw new ApiError('Titulo não pode ser undefined.', 400);
    }

    await pool.query(`UPDATE jogo SET titulo = $1 , descricao = $2, genero = $3, plataforma = $4 WHERE id = $5`, 
    [titulo, descricao, genero, plataforma, id])
}

// --------------------- DELETA ---------------------

export async function deletaJogoService(id){

    const jogo = await pool.query(`SELECT * FROM jogo WHERE id = $1`, [id])

    if (jogo.rows.length <= 0){
        throw new ApiError('Jogo não existe', 404)
    }

    await pool.query(`DELETE FROM jogo WHERE id = $1`, [id])
}