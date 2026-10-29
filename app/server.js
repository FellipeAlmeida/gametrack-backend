import express from 'express'
import jogoRoutes from './routes/jogo.routes.js'
import avaliacaoRoutes from './routes/avaliacao.routes.js'
import cors from 'cors'

export const app = express()

app.get('/', (req, res) => {
    res.send({'status_server': 'active'})
})

app.use(cors())
app.use(express.json()); 
app.use('/api', jogoRoutes)
app.use('/api', avaliacaoRoutes)

app.listen(3000, () => {
    console.log('servidor iniciado!')
})