import pool from './database/database.js'

async function conectaEPopulaBanco() {
    try {

        console.log("Testando conexão com o banco...")
        await pool.query("SELECT 1") // retorna 1, apenas teste pra ve se o banco ta vivo

        console.log("Conectado ao banco!")
        console.log("Criando tabelas...")

        await pool.query(`
            CREATE TYPE plataforma_enum AS ENUM (
                'PC',
                'PlayStation',
                'Xbox',
                'Nintendo Switch'
            );`)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS jogo (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR NOT NULL UNIQUE,
                descricao TEXT,
                genero VARCHAR,
                plataforma plataforma_enum[],
                nota_media DECIMAL DEFAULT 0,
                criado_em TIMESTAMP DEFAULT NOW()
            );`)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS avaliacao (
                id SERIAL PRIMARY KEY,
                jogo_id INT NOT NULL,
                nome_avaliador VARCHAR NOT NULL,
                nota INT NOT NULL CHECK (nota BETWEEN 1 AND 5),
                review TEXT,
                criado_em TIMESTAMP DEFAULT NOW(),

                CONSTRAINT fk_avaliacao_jogo
                    FOREIGN KEY (jogo_id)
                    REFERENCES jogo(id)
            );`)

        console.log("Tabelas criadas!")

    } catch (error) {
        console.error("Erro ao conectar no banco:", error)
        process.exit(1) // mata o processo impedindo que a aplicacao suba com o banco invalido
    }
}

conectaEPopulaBanco()