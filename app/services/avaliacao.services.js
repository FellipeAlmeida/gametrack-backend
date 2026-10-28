import pool from '../database/database.js'

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

    if (!jogo_id || !nome_avaliador || !nota){
        throw new Error('Preencha todos os campos obrigatórios.')
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

export async function listaAvaliacaoService(){
    const avaliacoes = await pool.query(`SELECT * FROM avaliacao`)

    if (avaliacoes.rows.length <= 0){
        throw new Error('Sem avaliações disponiveis.')
    }

    return avaliacoes['rows']
}

// --------------------- BUSCA ---------------------

export async function buscaAvaliacaoService(id){

    const avaliacao = await pool.query(`SELECT * FROM avaliacao WHERE id = $1`, [id])

    if (avaliacao.rows.length <= 0){ 
        throw new Error('Avaliacao não existe')
    }

    return avaliacao['rows']
}

// --------------------- EDITA ---------------------

export async function editaAvaliacaoService(id, body){

    const { jogo_id, nome_avaliador, nota, review } = body

    const avaliacao = await pool.query(`SELECT * FROM avaliacao WHERE id = $1`, [id])

    if (avaliacao.rows.length <= 0){
        throw new Error('Avaliacao não existe')
    }

    if (!jogo_id && !nome_avaliador && !nota && !review) {
        throw new Error('Informe os dados que deseja atualizar.');
    }

    await pool.query(`UPDATE avaliacao SET jogo_id = $1, nome_avaliador = $2, nota = $3, review = $4 WHERE id = $5`, 
    [jogo_id, nome_avaliador, nota, review, id])
}

// --------------------- DELETA ---------------------

export async function deletaAvaliacaoService(id){

    const avaliacao = await pool.query(`SELECT * FROM avaliacao WHERE id = $1`, [id])

    if (avaliacao.rows.length <= 0){
        throw new Error('Avaliacao não existe')
    }

    await pool.query(`DELETE FROM avaliacao WHERE id = $1`, [id])
}