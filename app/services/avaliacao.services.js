import pool from '../database/database.js'
import ApiError from '../error/api.error.js'

function somaAvaliacoes(avaliacoes){
    let count = 0

    for (const avaliacao of avaliacoes.rows){
        count += avaliacao['nota']
    }

    return count
}

// --------------------- CRIA ---------------------

export async function criaAvaliacaoService(body){
    const { jogo_id, nome_avaliador, nota, review } = body

    if (nota < 1 || nota > 5){
        throw new ApiError('Nota deve ser entre 1 a 5.', 400)
    }

    if (!jogo_id || !nome_avaliador || !nota){
        throw new ApiError('Preencha todos os campos obrigatórios.', 400)
    }

    await pool.query(`INSERT INTO avaliacao (jogo_id, nome_avaliador, nota, review) 
        VALUES ($1, $2, $3, $4)`, 
        [jogo_id, nome_avaliador, nota, review]
    )

    const avaliacoes = await pool.query(`SELECT * FROM avaliacao WHERE jogo_id = $1`, [jogo_id])
    const result = somaAvaliacoes(avaliacoes) / avaliacoes.rows.length

    await pool.query(`UPDATE jogo SET nota_media = $1 WHERE id = $2`, [result, jogo_id])
}

// --------------------- LISTA ---------------------

export async function listaAvaliacaoService(jogo_id){
    let query = `SELECT * FROM avaliacao`
    const valores = []

    if (typeof jogo_id !== "number" || isNaN(jogo_id)){ // <-- se for diferente de number ou not a number
        throw new ApiError('ID do jogo deve ser number', 404)
    }

    if (jogo_id){
        query += ` WHERE jogo_id = $1`
        valores.push(jogo_id)
    }

    const avaliacoes = await pool.query(query, valores)

    return avaliacoes['rows']
}

// --------------------- BUSCA ---------------------

export async function buscaAvaliacaoService(id){

    const avaliacao = await pool.query(`SELECT * FROM avaliacao WHERE id = $1`, [id])

    if (avaliacao.rows.length == 0){ 
        throw new ApiError('Avaliacao não existe', 404)
    }

    return avaliacao['rows']
}

// --------------------- EDITA ---------------------

export async function editaAvaliacaoService(id, body){

    const { jogo_id, nome_avaliador, nota, review } = body

    const avaliacao = await pool.query(`SELECT * FROM avaliacao WHERE id = $1`, [id])

    if (avaliacao.rows.length == 0){
        throw new ApiError('Avaliacao não existe', 404)
    }

    if (!jogo_id && !nome_avaliador && !nota && !review) {
        throw new ApiError('Informe os dados que deseja atualizar.', 400);
    }

    await pool.query(`UPDATE avaliacao SET jogo_id = $1, nome_avaliador = $2, nota = $3, review = $4 WHERE id = $5`, 
    [jogo_id, nome_avaliador, nota, review, id])
}

// --------------------- DELETA ---------------------

export async function deletaAvaliacaoService(id){

    const avaliacao = await pool.query(`SELECT * FROM avaliacao WHERE id = $1`, [id])

    if (avaliacao.rows.length == 0){
        throw new ApiError('Avaliacao não existe', 404)
    }

    await pool.query(`DELETE FROM avaliacao WHERE id = $1`, [id])
}