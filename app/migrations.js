
import pool from './database/database.js'

async function conectaEPopulaBanco() {
    try {
        console.log('Testando conexão com o banco...')
        await pool.query('SELECT 1')

        console.log('Conectado ao banco!')
        console.log('Criando tabelas...')

        // Cria o tipo somente se ele ainda não existir
        await pool.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1
                    FROM pg_type
                    WHERE typname = 'plataforma_enum'
                ) THEN
                    CREATE TYPE plataforma_enum AS ENUM (
                        'PC',
                        'PlayStation',
                        'Xbox',
                        'Nintendo Switch'
                    );
                END IF;
            END
            $$;
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS jogo (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR NOT NULL UNIQUE,
                capa_url VARCHAR,
                descricao TEXT,
                genero VARCHAR,
                plataforma plataforma_enum[],
                nota_media DECIMAL DEFAULT 0,
                criado_em TIMESTAMP DEFAULT NOW()
            );
        `)

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
            );
        `)

        console.log('Tabelas criadas!')
    } catch (error) {
        console.error('Erro ao conectar no banco:', error)
        process.exit(1)
    }
}

conectaEPopulaBanco()
