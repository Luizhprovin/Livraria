const livroSchema = {
  type: 'object',
  required: ['nome', 'qtd_paginas', 'categoria', 'autor'],
  properties: {
    id: { type: 'integer', readOnly: true },
    nome: { type: 'string', example: 'Dom Casmurro' },
    qtd_paginas: { type: 'integer', minimum: 1, example: 256 },
    categoria: { type: 'string', example: 'Romance' },
    autor: { type: 'string', example: 'Machado de Assis' },
    createdAt: { type: 'string', format: 'date-time', readOnly: true },
    updatedAt: { type: 'string', format: 'date-time', readOnly: true },
  },
};

const idParameter = {
  in: 'path',
  name: 'id',
  required: true,
  schema: { type: 'integer', minimum: 1 },
};

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Livraria API',
    version: '1.0.0',
    description: 'API REST para cadastro e gerenciamento de livros.',
  },
  servers: [{ url: 'http://localhost:3000' }],
  tags: [{ name: 'Livros' }],
  paths: {
    '/health': {
      get: {
        summary: 'Verifica a disponibilidade da API',
        responses: { 200: { description: 'API disponível' } },
      },
    },
    '/api/livros': {
      get: {
        tags: ['Livros'],
        summary: 'Lista todos os livros',
        responses: {
          200: {
            description: 'Lista de livros',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Livro' } },
              },
            },
          },
        },
      },
      post: {
        tags: ['Livros'],
        summary: 'Cadastra um livro',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Livro' } },
          },
        },
        responses: {
          201: { description: 'Livro criado' },
          400: { description: 'Dados inválidos' },
        },
      },
    },
    '/api/livros/{id}': {
      get: {
        tags: ['Livros'],
        summary: 'Consulta um livro',
        parameters: [idParameter],
        responses: {
          200: { description: 'Livro encontrado' },
          404: { description: 'Livro não encontrado' },
        },
      },
      put: {
        tags: ['Livros'],
        summary: 'Atualiza um livro',
        parameters: [idParameter],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Livro' } },
          },
        },
        responses: {
          200: { description: 'Livro atualizado' },
          400: { description: 'Dados inválidos' },
          404: { description: 'Livro não encontrado' },
        },
      },
      delete: {
        tags: ['Livros'],
        summary: 'Remove um livro',
        parameters: [idParameter],
        responses: {
          200: { description: 'Livro removido' },
          404: { description: 'Livro não encontrado' },
        },
      },
    },
  },
  components: {
    schemas: { Livro: livroSchema },
  },
};
