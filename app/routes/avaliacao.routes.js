import { Router } from 'express'
import { criaAvaliacao, editaAvaliacao, deletaAvaliacao, buscaAvaliacao, listaAvaliacao } from '../controllers/avaliacao.controllers.js'

const avaliacaoRoutes = Router()

avaliacaoRoutes.post('/avaliacao', criaAvaliacao)
avaliacaoRoutes.get('/avaliacao', listaAvaliacao)
avaliacaoRoutes.get('/avaliacao/:id', buscaAvaliacao)
avaliacaoRoutes.patch('/avaliacao/:id', editaAvaliacao)
avaliacaoRoutes.delete('/avaliacao/:id', deletaAvaliacao)

export default avaliacaoRoutes