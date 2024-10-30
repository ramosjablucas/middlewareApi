const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// API Key definida no código para fins de exemplo
const VALID_API_KEY = '08b7be9f476d46488169b41bef755aea';

// Middleware para validar a API Key
function apiKeyMiddleware(req, res, next) {
  const apiKey = req.header('x-api-key'); // Lê a API Key do header

  if (!apiKey || apiKey !== VALID_API_KEY) {
    return res.status(403).json({ error: 'Acesso negado. API Key inválida ou ausente.' });
  }

  next(); // Chama o próximo middleware ou rota
}

// Middleware para interpretar o corpo da requisição como texto
app.use(express.text({ type: '*/*' }));

// Rota de healthcheck (heartbeat)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Aplicação está funcionando corretamente.' });
});

// Adicionando o middleware de validação de API Key à rota
app.post('/api/bridge', apiKeyMiddleware, async (req, res) => {
  try {
    const { erpUrl, data } = JSON.parse(req.body);

    if (!erpUrl || !data) {
      return res.status(400).json({ error: 'Parâmetros erpUrl e data são obrigatórios.' });
    }

    // Configuração dos headers da requisição para o ERP
    const config = {
      headers: {
        'Authorization': 'Basic c2lzdF9pbnRlZ3JhOkFnaXNEcm9wQDJrMjQ=',
        'Content-Type': 'application/json',
      },
    };

    // Enviando a requisição para a API do ERP
    const response = await axios.post(erpUrl, JSON.parse(data), config);

    // Retornando a resposta do ERP para o chamador
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao processar a requisição:', error.message);
    res.status(500).json({ error: 'Falha ao processar a requisição.', details: error.message });
  }
});

app.post('/api/bridge/get', async (req, res) => {
  const { erpUrl } = JSON.parse(req.body);

  const config = {
    headers: {
      'Authorization': 'Basic c2lzdF9pbnRlZ3JhOkFnaXNEcm9wQDJrMjQ=',
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.get(erpUrl, config);

  res.json(response.data);
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});