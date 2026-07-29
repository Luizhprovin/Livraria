# Livraria API

[![CI](https://github.com/Luizhprovin/Livraria/actions/workflows/ci.yml/badge.svg)](https://github.com/Luizhprovin/Livraria/actions/workflows/ci.yml)

<p>
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=FFFFFF">
  <img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=FFFFFF">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=FFFFFF">
  <img alt="Sequelize" src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=FFFFFF">
  <img alt="Swagger" src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=000000">
</p>

API REST para cadastrar e gerenciar livros. O projeto demonstra organização em rotas, controllers e models, persistência com PostgreSQL, migrações com Sequelize e documentação interativa com OpenAPI/Swagger.

## Funcionalidades

- Cadastro, listagem, consulta, atualização e remoção de livros.
- Validação dos campos persistidos e proteção contra mass assignment.
- Configuração do banco por variáveis de ambiente, sem credenciais no código.
- Migrações reproduzíveis com Sequelize CLI.
- Documentação interativa disponível em `/api-docs`.
- Health check em `/health`.
- Verificação automatizada de sintaxe e vulnerabilidades no GitHub Actions.

## Endpoints

| Método | Rota | Finalidade |
| --- | --- | --- |
| `GET` | `/health` | Verifica a disponibilidade da API |
| `POST` | `/api/livros` | Cadastra um livro |
| `GET` | `/api/livros` | Lista os livros |
| `GET` | `/api/livros/:id` | Consulta um livro |
| `PUT` | `/api/livros/:id` | Atualiza um livro |
| `DELETE` | `/api/livros/:id` | Remove um livro |

## Como executar

### Pré-requisitos

- Node.js 20.18 ou superior
- npm 10 ou superior
- PostgreSQL

### Instalação

```bash
git clone https://github.com/Luizhprovin/Livraria.git
cd Livraria
npm install
cp .env.example .env
```

Edite o arquivo `.env` com as credenciais do seu PostgreSQL. Depois, crie o banco, execute a migração e inicie a API:

```bash
npm run db:create
npm run db:migrate
npm run dev
```

A API estará disponível em `http://localhost:3000` e a documentação Swagger em `http://localhost:3000/api-docs`.

### Exemplo de cadastro

```json
{
  "nome": "Dom Casmurro",
  "qtd_paginas": 256,
  "categoria": "Romance",
  "autor": "Machado de Assis"
}
```

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia a API com reinicialização nativa do Node.js |
| `npm start` | Inicia a API |
| `npm run db:create` | Cria o banco configurado |
| `npm run db:migrate` | Aplica as migrações |
| `npm run db:undo` | Desfaz a última migração |
| `npm run check` | Valida sintaxe e executa a auditoria de segurança |

## Estrutura

```text
Livraria/
├── .github/                 # CI e atualizações automáticas
├── config/                  # configuração do Sequelize
├── controllers/             # regras das operações CRUD
├── docs/                    # especificação OpenAPI
├── migrations/              # versionamento do banco
├── models/                  # modelos do Sequelize
├── routes/                  # rotas HTTP
├── .env.example
├── index.js
└── package.json
```

## Limitações e próximos passos

- A API ainda não possui autenticação ou autorização.
- Testes de integração devem ser adicionados com um banco isolado.
- Paginação, filtros e busca textual podem ampliar a consulta ao catálogo.
- Um deploy público pode facilitar a demonstração do projeto.

---

Desenvolvido por [Luiz Henrique Provin](https://github.com/Luizhprovin).
