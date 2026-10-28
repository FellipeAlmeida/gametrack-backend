import { Router } from 'express'
import { criaAvaliacao, editaAvaliacao, deletaAvaliacao, buscaAvaliacao, listaAvaliacao } from '../controllers/avaliacao.controllers.js'

const avaliacaoRoutes = Router()

avaliacaoRoutes.post('/', criaAvaliacao)
avaliacaoRoutes.get('/', listaAvaliacao)
avaliacaoRoutes.get('/:id', buscaAvaliacao)
avaliacaoRoutes.patch('/:id', editaAvaliacao)
avaliacaoRoutes.delete('/:id', deletaAvaliacao)

export default avaliacaoRoutes