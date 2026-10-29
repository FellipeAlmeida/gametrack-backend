import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import jogoRoutes from './routes/jogo.routes.js'
import avaliacaoRoutes from './routes/avaliacao.routes.js'
import cors from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'publico')))

app.get('/status', (req, res) => {
    res.send({'status_server': 'active'})
})

app.use('/api/jogo', jogoRoutes)
app.use('/api/avaliacao', avaliacaoRoutes)

app.listen(3000, () => {
    console.log('servidor iniciado!')
})