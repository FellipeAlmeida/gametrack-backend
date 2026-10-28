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

#### "não preciso de back-end, faço tudo em JavaScript no navegador, inclusive acessar o banco de dados".

**Pontos importantes a serem discutidos:**

- **Segurança:** o código JavaScript executado no navegador pode ser inspecionado. Colocar credenciais do banco de dados no front-end expõe informações sensíveis e pode permitir que terceiros acessem ou modifiquem os dados.

- **Desempenho:** executar operações pesadas no navegador pode prejudicar a experiência do usuário. Um back-end permite centralizar regras de negócio, processar dados e realizar consultas ao banco de forma controlada.

- **Integridade dos dados:** quando as validações e regras de negócio ficam exclusivamente no JavaScript do navegador, os usuários podem contorná-las e enviar dados inválidos diretamente ao banco de dados, caso o acesso direto seja possível. Isso pode comprometer a integridade dos dados.
