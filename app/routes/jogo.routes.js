import { Router } from 'express'
import { criaJogo, editaJogo, deletaJogo, buscaJogo, listaJogo } from '../controllers/jogo.controllers.js'

const jogoRoutes = Router()

jogoRoutes.post('/', criaJogo)
jogoRoutes.get('/', listaJogo)
jogoRoutes.get('/:id', buscaJogo)
jogoRoutes.patch('/:id', editaJogo)
jogoRoutes.delete('/:id', deletaJogo)

export default jogoRoutes