import { criaAvaliacaoService, listaAvaliacaoService, buscaAvaliacaoService, editaAvaliacaoService, deletaAvaliacaoService} from '../services/avaliacao.services.js'

// --------------------- CRIA ---------------------

export async function criaAvaliacao(req, res){
    try{
        const { jogo_id, nome_avaliador, nota, review } = req.body

        await criaAvaliacaoService(req.body)
        return res.status(201).json({message: 'Avaliação criada com sucesso!'})
    } catch (error) {
        return res.status(500).json({erro: error.message})
    }
}

// --------------------- LISTA ---------------------

export async function listaAvaliacao(req, res){
    try{
        const avaliacoes = await listaAvaliacaoService(req.body)
        return res.status(201).json({avaliacoes: avaliacoes})
    } catch (error) {
        return res.status(500).json({erro: error.message})
    }
}

// --------------------- BUSCA ---------------------

export async function buscaAvaliacao(req, res){
    try{
        const id = req.params.id

        const avaliacao = await buscaAvaliacaoService(id)
        return res.status(201).json({avaliacao: avaliacao})
    } catch (error) {
        return res.status(500).json({erro: error.message})
    }
}

// --------------------- EDITA ---------------------

export async function editaAvaliacao(req, res){
    try{
        const { jogo_id, nome_avaliador, nota, review } = req.body
        const id = req.params.id

        await editaAvaliacaoService(id, req.body)
        return res.status(201).json({message: 'Avaliação editada com sucesso!'})
    } catch (error) {
        return res.status(500).json({erro: error.message})
    }
}

// --------------------- DELETA ---------------------

export async function deletaAvaliacao(req, res){
    try{
        const id = req.params.id

        await deletaAvaliacaoService(id)
        return res.status(201).json({message: 'Avaliação deletada com sucesso!'})
    } catch (error) {
        return res.status(500).json({erro: error.message})
    }
}