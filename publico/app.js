const lista = document.querySelector('#lista')
const vazio = document.querySelector('#vazio')
const filtro = document.querySelector('#filtro')
const form = document.querySelector('#form')
const mensagem = document.querySelector('#mensagem')

async function carregar() {
  const resposta = await fetch('/api/filmes?genero=' + encodeURIComponent(filtro.value))
  const filmes = await resposta.json()
  lista.innerHTML = ''
  vazio.hidden = filmes.length > 0
  filmes.forEach((f) => {
    const li = document.createElement('li')
    const titulo = document.createElement('span')
    titulo.textContent = f.titulo
    const info = document.createElement('small')
    info.textContent = `${f.genero} · ${f.ano} · nota ${f.nota}`
    li.append(titulo, info)
    lista.append(li)
  })
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const dados = Object.fromEntries(new FormData(form))
  const resposta = await fetch('/api/filmes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...dados, ano: Number(dados.ano), nota: Number(dados.nota) })
  })
  const corpo = await resposta.json()
  if (resposta.ok) {
    mensagem.className = 'ok'
    mensagem.textContent = 'Filme cadastrado.'
    form.reset()
    carregar()
  } else {
    mensagem.className = 'erro'
    mensagem.textContent = corpo.erro || corpo.mensagem || 'Erro ao cadastrar.'
  }
})

filtro.addEventListener('change', carregar)
carregar()
