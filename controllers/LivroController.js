const { Livro } = require('../models');

const camposPermitidos = ['nome', 'qtd_paginas', 'categoria', 'autor'];

function selecionarCampos(body) {
  return Object.fromEntries(
    camposPermitidos
      .filter((campo) => body[campo] !== undefined)
      .map((campo) => [campo, body[campo]])
  );
}

function responderErro(res, error) {
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Dados do livro inválidos',
      details: error.errors.map((item) => item.message),
    });
  }

  console.error(error);
  return res.status(500).json({ error: 'Erro interno do servidor' });
}

module.exports = {
  create: async (req, res) => {
    try {
      const livro = await Livro.create(selecionarCampos(req.body));
      res.status(201).json(livro);
    } catch (error) {
      responderErro(res, error);
    }
  },

  findAll: async (req, res) => {
    try {
      const livros = await Livro.findAll({ order: [['id', 'ASC']] });
      res.status(200).json(livros);
    } catch (error) {
      responderErro(res, error);
    }
  },

  findOne: async (req, res) => {
    try {
      const livro = await Livro.findByPk(req.params.id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      res.status(200).json(livro);
    } catch (error) {
      responderErro(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const livro = await Livro.findByPk(req.params.id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }

      const campos = selecionarCampos(req.body);
      if (Object.keys(campos).length === 0) {
        return res.status(400).json({ error: 'Nenhum campo válido foi informado' });
      }

      await livro.update(campos);
      res.status(200).json(livro);
    } catch (error) {
      responderErro(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const livro = await Livro.findByPk(req.params.id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      await livro.destroy();
      res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
      responderErro(res, error);
    }
  },
};



