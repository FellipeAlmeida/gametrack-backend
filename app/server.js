import express from 'express'

export const app = express()

app.get('/', (req, res) => {
    res.send({'status_server': 'active'})
})

app.listen(3000, () => {
    console.log('servidor iniciado!')
})