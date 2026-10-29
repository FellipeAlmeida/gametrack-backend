import { Router } from 'express'
import { criaJogo, editaJogo, deletaJogo, buscaJogo, listaJogo } from '../controllers/jogo.controllers.js'

const jogoRoutes = Router()

jogoRoutes.post('/jogo', criaJogo)
jogoRoutes.get('/jogo', listaJogo)
jogoRoutes.get('/jogo/:id', buscaJogo)
jogoRoutes.patch('/jogo/:id', editaJogo)
jogoRoutes.delete('/jogo/:id', deletaJogo)

export default jogoRoutes