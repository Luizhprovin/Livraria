require('dotenv').config({ quiet: true });

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./models');
const livrosRouter = require('./routes/livros.routes');
const openapi = require('./docs/openapi');

const app = express();
const port = Number(process.env.PORT || 3000);

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));
app.use('/api', livrosRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

async function start() {
  try {
    await sequelize.authenticate();
    app.listen(port, () => {
      console.log(`Livraria API disponível em http://localhost:${port}`);
      console.log(`Swagger disponível em http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao PostgreSQL:', error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  start();
}

module.exports = { app, start };
