
import pool from '../database/database.js'
import ApiError from '../error/api.error.js'

// --------------------- CRIA ---------------------


export async function criaJogoService(body) {
    const { titulo, capa_url, descricao, genero, plataforma } = body
    const notaRecebida = body.nota_media

    const plataformasValidas = [
        'PC',
        'PlayStation',
        'Xbox',
        'Nintendo Switch'
    ]

    // Validar título
    if (typeof titulo !== 'string' || titulo.trim().length < 2) {
        throw new ApiError(
            'O título deve ter pelo menos 2 caracteres.',
            400
        )
    }

    // Validar nota: aceitar número ou string numérica
    let notaMedia = 0

    if (notaRecebida !== undefined) {
        if (
            notaRecebida === null ||
            notaRecebida === '' ||
            typeof notaRecebida === 'boolean'
        ) {
            throw new ApiError(
                'A nota deve ser um número entre 0 e 5.',
                400
            )
        }

        notaMedia = Number(notaRecebida)

        if (
            !Number.isFinite(notaMedia) ||
            notaMedia < 0 ||
            notaMedia > 5
        ) {
            throw new ApiError(
                'A nota deve ser um número entre 0 e 5.',
                400
            )
        }
    }

    // Validar plataforma
    if (!Array.isArray(plataforma)) {
        throw new ApiError('Plataforma deve ser um array.', 400)
    }

    if (plataforma.length === 0) {
        throw new ApiError(
            'Plataforma deve ter pelo menos um valor.',
            400
        )
    }

    for (const p of plataforma) {
        if (!plataformasValidas.includes(p)) {
            throw new ApiError('Plataforma inválida: ' + p, 400)
        }
    }

    // Criar jogo
    await pool.query(
        `INSERT INTO jogo
            (titulo, capa_url, descricao, genero, plataforma, nota_media)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
            titulo.trim(),
            capa_url,
            descricao,
            genero,
            plataforma,
            notaMedia
        ]
    )
}


// --------------------- LISTA ---------------------

export async function listaJogoService(genero) {
    let query = 'SELECT * FROM jogo'
    const valores = []

    if (genero) {
        query += ' WHERE genero = $1'
        valores.push(genero)
    }

    const jogos = await pool.query(query, valores)

    return jogos.rows
}

// --------------------- BUSCA ---------------------


export async function buscaJogoService(id) {
    if (!/^\d+$/.test(String(id))) {
        throw new ApiError('Jogo não existe', 404)
    }

    const jogo = await pool.query(
        'SELECT * FROM jogo WHERE id = $1',
        [id]
    )

    if (jogo.rows.length === 0) {
        throw new ApiError('Jogo não existe', 404)
    }

    return jogo.rows
}


// --------------------- EDITA ---------------------

export async function editaJogoService(id, body) {
    const { titulo, capa_url, descricao, genero, plataforma } = body

    const jogo = await pool.query(
        'SELECT * FROM jogo WHERE id = $1',
        [id]
    )

    if (jogo.rows.length === 0) {
        throw new ApiError('Jogo não existe', 404)
    }

    if (!titulo && !capa_url && !descricao && !genero && !plataforma) {
        throw new ApiError(
            'Informe os dados que deseja atualizar.',
            400
        )
    }

    if (titulo === undefined) {
        throw new ApiError('Titulo não pode ser undefined.', 400)
    }

    await pool.query(
        `UPDATE jogo
         SET titulo = $1, capa_url = $2, descricao = $3,
             genero = $4, plataforma = $5
         WHERE id = $6`,
        [titulo, capa_url, descricao, genero, plataforma, id]
    )
}

// --------------------- DELETA ---------------------

export async function deletaJogoService(id) {
    const jogo = await pool.query(
        'SELECT * FROM jogo WHERE id = $1',
        [id]
    )

    if (jogo.rows.length === 0) {
        throw new ApiError('Jogo não existe', 404)
    }

    await pool.query(
        'DELETE FROM jogo WHERE id = $1',
        [id]
    )
}

