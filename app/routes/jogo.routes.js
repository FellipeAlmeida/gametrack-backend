import { Router } from 'express'
import { criaJogo } from '../controllers/jogo.controllers.js'

const jogoRoutes = Router()

jogoRoutes.post('/', criaJogo)

export default jogoRoutes