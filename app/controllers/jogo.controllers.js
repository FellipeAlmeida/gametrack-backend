import { criaJogoService, listaJogoService, buscaJogoService, deletaJogoService, editaJogoService } from '../services/jogo.services.js'

// --------------------- CRIA ---------------------

export async function criaJogo(req, res){
    try{
        const { titulo, capa_url, descricao, genero, plataforma, nota_media, criado_em } = req.body

        await criaJogoService(req.body)
        return res.status(201).json({message: 'Jogo criado com sucesso!'})
    } catch (error) {
        return res.status(error.statusCode || 500).json({erro: error.message})
    }
}

// --------------------- LISTA ---------------------

export async function listaJogo(req, res){
    try{
        const genero = req.query.genero

        const jogos = await listaJogoService(genero)
        return res.status(200).json({jogos: jogos})
    } catch (error) {
        return res.status(error.statusCode || 500).json({erro: error.message})
    }
}

// --------------------- BUSCA ---------------------

export async function buscaJogo(req, res){
    try{
        const id = req.params.id

        const jogo = await buscaJogoService(id)
        return res.status(200).json({jogo: jogo})
    } catch (error) {
        return res.status(error.statusCode || 500).json({erro: error.message})
    }
}

// --------------------- EDITA ---------------------

export async function editaJogo(req, res){
    try{
        const { titulo, capa_url, descricao, genero, plataforma, nota_media, criado_em } = req.body
        const id = req.params.id
        
        await editaJogoService(id, req.body)
        return res.status(200).json({message: 'Jogo editado com sucesso!'})
    } catch (error) {
        return res.status(error.statusCode || 500).json({erro: error.message})
    }
}

// --------------------- DELETA ---------------------

export async function deletaJogo(req, res){
    try{
        const id = req.params.id

        await deletaJogoService(id)
        return res.status(200).json({message: "Jogo deletado com sucesso!"})
    } catch (error) {
        return res.status(error.statusCode || 500).json({erro: error.message})
    }
}
