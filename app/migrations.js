import pool from './database/database.js'

async function conectaEPopulaBanco() {
    try {

        console.log("Testando conexão com o banco...")
        await pool.query("SELECT 1")

        console.log("Conectado ao banco!")
        console.log("Criando tabelas...")

        await pool.query(`
            CREATE TABLE IF NOT EXISTS jogo (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR NOT NULL UNIQUE,
                capa_url VARCHAR,
                descricao TEXT,
                genero VARCHAR,
                plataforma VARCHAR,
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

        await pool.query(`INSERT INTO jogo (titulo, capa_url, descricao, genero, plataforma) 
            VALUES('Elden Ring', 'https://upload.wikimedia.org/wikipedia/pt/0/0d/Elden_Ring_capa.jpg', 'Jogo de aventura', 'medieval', 'ps5, pc, xbox') 
            ON CONFLICT (titulo) DO NOTHING`)

        console.log("Tabelas criadas e banco populado!")

    } catch (error) {
        console.error("Erro ao conectar no banco:", error)
        process.exit(1) // PARA O SERVIDOR
    }
}

conectaEPopulaBanco()