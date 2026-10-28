import pool from '../database/database.js'

// --------------------- CRIA ---------------------

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

// --------------------- LISTA ---------------------

export async function listaJogoService(){
    const jogos = await pool.query(`SELECT * FROM jogo`)

    if (jogos.rows.length <= 0){
        throw new Error('Sem jogos disponiveis.')
    }

    return jogos['rows']
}

// --------------------- BUSCA ---------------------

export async function buscaJogoService(id){

    const jogo = await pool.query(`SELECT * FROM jogo WHERE id = $1`, [id])

    if (jogo.rows.length == 0){ 
        throw new Error('Jogo não existe')
    }

    return jogo['rows']
}

// --------------------- EDITA ---------------------

export async function editaJogoService(id, body){

    const { titulo, capa_url, descricao, genero, plataforma } = body

    const jogo = await pool.query(`SELECT * FROM jogo WHERE id = $1`, [id])

    if (jogo.rows.length <= 0){
        throw new Error('Jogo não existe')
    }

    if (!titulo && !capa_url && !descricao && !genero && !plataforma) {
        throw new Error('Informe os dados que deseja atualizar.');
    }

    if (titulo == undefined){
        throw new Error('Titulo não pode ser undefined.');
    }

    await pool.query(`UPDATE jogo SET titulo = $1, capa_url = $2, descricao = $3, genero = $4, plataforma = $5 WHERE id = $6`, 
    [titulo, capa_url, descricao, genero, plataforma, id])
}

// --------------------- DELETA ---------------------

export async function deletaJogoService(id){

    const jogo = await pool.query(`SELECT * FROM jogo WHERE id = $1`, [id])

    if (jogo.rows.length <= 0){
        throw new Error('Jogo não existe')
    }

    await pool.query(`DELETE FROM jogo WHERE id = $1`, [id])
}