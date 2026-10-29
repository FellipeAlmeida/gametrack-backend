
import env from './config/config.js'

const lista = document.querySelector('#lista')
const vazio = document.querySelector('#vazio')
const mensagem = document.querySelector('#mensagem')

async function carregarAvaliacoes() {
    lista.innerHTML = ''
    mensagem.textContent = ''
    vazio.hidden = true

    try {
        const resposta = await fetch(`${env.baseUrl}/avaliacao`, {
            cache: 'no-store'
        })

        const dados = await resposta.json()

        if (!resposta.ok) {
            throw new Error(
                dados.erro ||
                dados.mensagem ||
                'Erro ao buscar avaliações.'
            )
        }

        const avaliacoes = Array.isArray(dados)
            ? dados
            : dados.avaliacoes

        if (!Array.isArray(avaliacoes)) {
            throw new Error('A API não retornou uma lista de avaliações.')
        }

        if (avaliacoes.length === 0) {
            vazio.hidden = false
            return
        }

        for (const avaliacao of avaliacoes) {
            const article = document.createElement('article')
            article.className = 'review'

            const body = document.createElement('div')
            body.className = 'review-body'

            const titulo = document.createElement('h2')
            titulo.textContent =
                avaliacao.titulo_jogo ||
                avaliacao.nome_jogo ||
                avaliacao.titulo ||
                `Jogo #${avaliacao.jogo_id}`

            const meta = document.createElement('p')
            meta.className = 'meta'
            meta.textContent = `Jogo ID: ${avaliacao.jogo_id}`

            const estrelas = document.createElement('div')
            estrelas.className = 'stars'

            const nota = Number(avaliacao.nota) || 0
            const notaVisual = Math.max(0, Math.min(5, Math.round(nota)))

            const estrelasTexto = document.createElement('span')
            estrelasTexto.textContent =
                '★'.repeat(notaVisual) + '☆'.repeat(5 - notaVisual)

            const notaTexto = document.createElement('small')
            notaTexto.textContent = `${nota}/5`

            estrelas.append(estrelasTexto, notaTexto)

            const texto = document.createElement('p')
            texto.className = 'text'
            texto.textContent =
                avaliacao.review ||
                avaliacao.comentario ||
                'Sem comentário.'

            const byline = document.createElement('div')
            byline.className = 'byline'

            const autor = document.createElement('span')
            autor.textContent =
                avaliacao.nome_avaliador ||
                avaliacao.avaliador ||
                'Anônimo'

            byline.append(autor)
            body.append(titulo, meta, estrelas, texto, byline)
            article.append(body)
            lista.append(article)
        }
    } catch (erro) {
        console.error('Erro ao carregar avaliações:', erro)
        mensagem.textContent =
            erro.message || 'Não foi possível carregar as avaliações.'
    }
}

carregarAvaliacoes()
