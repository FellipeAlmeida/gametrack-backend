import env from './config/config.js'

const form = document.querySelector('#form-avaliacao')
const selectJogo = document.querySelector('#jogo')
const mensagem = document.querySelector('#mensagem')
const botao = document.querySelector('#botao-enviar')
const saidaNota = document.querySelector('#nota-label')

const nomesNotas = [
    'Fraco',
    'Regular',
    'Bom',
    'Ótimo',
    'Favorito'
]

document.querySelectorAll('input[name="nota"]').forEach(input => {
    input.addEventListener('change', () => {
        saidaNota.textContent =
            `${input.value} de 5 · ${nomesNotas[Number(input.value) - 1]}`
    })
})

async function carregarJogos() {
    try {
        const resposta = await fetch(`${env.baseUrl}/jogo`)
        const dados = await resposta.json()

        if (!resposta.ok) {
            throw new Error(
                dados.erro || dados.mensagem || 'Não foi possível carregar os jogos.'
            )
        }

        const jogos = Array.isArray(dados)
            ? dados
            : dados.jogos

        if (!Array.isArray(jogos)) {
            throw new Error('A API não retornou uma lista de jogos.')
        }

        selectJogo.replaceChildren()

        const opcaoInicial = document.createElement('option')
        opcaoInicial.value = ''
        opcaoInicial.textContent = 'Selecione um jogo'
        selectJogo.append(opcaoInicial)

        for (const jogo of jogos) {
            const opcao = document.createElement('option')
            opcao.value = jogo.id
            opcao.textContent =
                jogo.titulo || jogo.nome || `Jogo #${jogo.id}`

            selectJogo.append(opcao)
        }

        if (jogos.length === 0) {
            opcaoInicial.textContent = 'Nenhum jogo cadastrado'
        }
    } catch (erro) {
        console.error('Erro ao carregar jogos:', erro)
        selectJogo.replaceChildren()

        const opcao = document.createElement('option')
        opcao.value = ''
        opcao.textContent = 'Erro ao carregar jogos'
        selectJogo.append(opcao)

        mensagem.textContent = erro.message
    }
}

form.addEventListener('submit', async event => {
    event.preventDefault()
    mensagem.textContent = ''

    const jogo_id = Number(selectJogo.value)
    const nome_avaliador =
        document.querySelector('#avaliador').value.trim()
    const nota = Number(
        document.querySelector('input[name="nota"]:checked')?.value
    )
    const review =
        document.querySelector('#review').value.trim()

    if (!jogo_id) {
        mensagem.textContent = 'Selecione um jogo.'
        return
    }

    if (!nome_avaliador) {
        mensagem.textContent = 'Informe o nome do avaliador.'
        return
    }

    if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
        mensagem.textContent = 'Selecione uma nota de 1 a 5.'
        return
    }

    const avaliacao = {
        jogo_id,
        nome_avaliador,
        nota,
        review
    }

    try {
        botao.disabled = true
        botao.textContent = 'Publicando...'

        const resposta = await fetch(`${env.baseUrl}/avaliacao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avaliacao)
        })

        const dados = await resposta.json()

        if (!resposta.ok) {
            throw new Error(
                dados.erro ||
                dados.mensagem ||
                dados.message ||
                'Não foi possível publicar a avaliação.'
            )
        }

        mensagem.textContent = 'Avaliação publicada com sucesso!'
        form.reset()
        saidaNota.textContent = '5 de 5 · Favorito'

        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1000)
    } catch (erro) {
        console.error('Erro ao publicar avaliação:', erro)
        mensagem.textContent = erro.message
    } finally {
        botao.disabled = false
        botao.textContent = 'Publicar avaliação'
    }
})

carregarJogos()
