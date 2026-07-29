'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Livro.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    qtd_paginas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 }
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    }
  }, {
    sequelize,
    modelName: 'Livro',
  });
  return Livro;
};
