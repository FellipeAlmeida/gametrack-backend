
import express from 'express'
import path from 'node:path'
import cors from 'cors'
import jogoRoutes from './routes/jogo.routes.js'
import avaliacaoRoutes from './routes/avaliacao.routes.js'

export const app = express()

app.use(cors())
app.use(express.json())

// Servir os arquivos estáticos do frontend
app.use(express.static(path.join(process.cwd(), 'publico')))

// Rota de saúde do servidor
app.get('/health', (req, res) => {
    res.json({ status_server: 'active' })
})

// Rotas da API
app.use('/api/jogo', jogoRoutes)
app.use('/api/avaliacao', avaliacaoRoutes)

// Fallback para as rotas do React Router (Express 5)
app.get(/^(?!\/api(?:\/|$)).*/, (req, res) => {
    res.sendFile(path.join(process.cwd(), 'publico', 'index.html'))
})

app.listen(3000, () => {
    console.log('servidor iniciado na porta 3000!')
})
