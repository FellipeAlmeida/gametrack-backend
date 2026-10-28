# GameTrack Backend

Sistema de Avaliação de games (igual um letterboxd mas de jogo). O sistema não possuirá sistema de login.

## Faixas de Validação

Para esse sistema, foram usados as seguintes faixas de validação:

- nota (deve ser entre 1 a 5)
- plataforma (PC, PlayStation, Xbox, Nintendo Switch)

## Como rodar

Certifique-se de ter o Docker instalado!

**Passo 1** - clone o repositório

```
git clone <url do repo>
```

**Passo 2** - Crie o .env

```
DATABASE_URL=postgresql://postgres:123@db:5432/gametrack-db
POSTGRES_USER=postgres
POSTGRES_DB=gametrack-db
POSTGRES_PASSWORD=123
```

**Passo 3** - Comando Docker

```
Docker compose up -d --build
```

## Saídas da Bancada

## Resposta
