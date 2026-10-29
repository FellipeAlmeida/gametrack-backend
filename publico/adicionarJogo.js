
import env from './config/config.js'

const form = document.querySelector('#form-jogo')
const mensagem = document.querySelector('#mensagem')
const botao = form.querySelector('button[type="submit"]')

const plataformasAceitas = {
    pc: 'PC',
    playstation: 'PlayStation',
    xbox: 'Xbox',
    'nintendo switch': 'Nintendo Switch'
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    mensagem.textContent = ''

    const titulo = document.querySelector('#titulo').value.trim()
    const descricao = document.querySelector('#descricao').value.trim()
    const genero = document.querySelector('#genero').value.trim()

    const plataformasDigitadas = document.querySelector('#plataforma')
        .value
        .split(',')
        .map(item => item.trim())
        .filter(Boolean)

    const plataforma = plataformasDigitadas.map(item => {
        const chave = item.toLowerCase()
        return plataformasAceitas[chave] || item
    })

    if (!titulo) {
        mensagem.textContent = 'Informe o título do jogo.'
        return
    }

    // Verifica se todas as plataformas são aceitas
    const plataformaInvalida = plataformasDigitadas.find(item => {
        return !plataformasAceitas[item.toLowerCase()]
    })

    if (plataformaInvalida) {
        mensagem.textContent =
            `Plataforma inválida: ${plataformaInvalida}. ` +
            'Use PC, PlayStation, Xbox ou Nintendo Switch.'
        return
    }

    const jogo = {
        titulo,
        descricao,
        genero,
        plataforma
    }

    try {
        botao.disabled = true
        botao.textContent = 'Cadastrando...'

        const resposta = await fetch(`${env.baseUrl}/jogo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jogo)
        })

        const dados = await resposta.json()

        if (!resposta.ok) {
            throw new Error(
                dados.erro ||
                dados.mensagem ||
                dados.message ||
                'Não foi possível cadastrar o jogo.'
            )
        }

        mensagem.textContent = 'Jogo cadastrado com sucesso!'
        form.reset()

        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1000)
    } catch (erro) {
        console.error('Erro ao cadastrar jogo:', erro)
        mensagem.textContent = erro.message
    } finally {
        botao.disabled = false
        botao.textContent = '+ Adicionar jogo'
    }
})
