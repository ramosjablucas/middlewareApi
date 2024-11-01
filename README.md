
# Node.js API Middleware

Este projeto é um **middleware** desenvolvido em **Node.js** para **redirecionar requisições para APIs externas**. Ele é ideal para cenários onde se deseja facilitar a **liberação de acesso a servidores protegidos**. Ao invés de liberar o acesso por VPN para todas as pessoas, basta liberar o acesso ao **IP fixo** deste middleware. Assim, ele faz o redirecionamento seguro das informações para as APIs externas desejadas.

## Funcionalidades

- **API Bridge**: Redireciona requisições para APIs externas de forma controlada.
- **Proteção com API Key**: Apenas clientes autorizados podem acessar os endpoints.
- **Consulta de IP de saída**: Permite verificar o IP de saída do servidor via `httpbin.org/ip`.
- **Healthcheck**: Endpoint simples para verificar se a aplicação está ativa.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para construir o backend.
- **Express**: Framework web para criar APIs HTTP.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **Dotenv**: Gerenciamento de variáveis de ambiente.

## Pré-requisitos

- **Node.js** e **npm** instalados ([Node.js Download](https://nodejs.org)).
- Um editor de texto como **VS Code**.
- **Postman** (opcional) para testar a API.

## Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/node-api-middleware.git
   cd node-api-middleware
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configuração da API Key**:
   - Crie um arquivo `.env` na raiz do projeto:
     ```
     API_KEY=my-secret-api-key
     ```

## Execução do Projeto

1. **Inicie o servidor**:
   ```bash
   node index.js
   ```

2. **Verifique se o servidor está funcionando**:

   - **Healthcheck**:
     ```
     GET http://localhost:3000/health
     ```
     Resposta esperada:
     ```json
     {
       "status": "ok",
       "message": "Aplicação está funcionando corretamente."
     }
     ```

## Endpoints Disponíveis

### 1. Healthcheck  
Verifica se a aplicação está ativa e em execução.

- **URL**: `/health`
- **Método**: `GET`

#### Exemplo de resposta:
```json
{
  "status": "ok",
  "message": "Aplicação está funcionando corretamente."
}
```

### 2. Consulta de IP de Saída

Verifica o **IP público de saída** da aplicação, utilizando a API externa `httpbin.org/ip`.

- **URL**: `/check-ip`
- **Método**: `GET`
- **Header**:
  - `x-api-key`: `my-secret-api-key`

#### Exemplo de resposta:
```json
{
  "message": "IP de saída da aplicação.",
  "ip": "35.225.147.64"
}
```

### 3. API Bridge para ERP

Redireciona uma requisição para uma API externa e retorna a resposta ao cliente.

- **URL**: `/api/bridge`
- **Método**: `POST`
- **Headers**:
  - `x-api-key`: `my-secret-api-key`
  - `Content-Type`: `text/plain`
- **Body**:
  ```json
  {
    "erpUrl": "https://api-do-erp.com/v1/resource",
    "data": "{"bodyExperadoNaAPI":[{"value":"16520"}]}"
  }
  ```

#### Exemplo de resposta:
```json
{
  "result": "sucesso",
  "id": 12345
}
```

## Testando com Postman

1. **Endpoint Healthcheck**:
   - Método: `GET`
   - URL: `http://localhost:3000/health`

2. **Endpoint Consulta de IP**:
   - Método: `GET`
   - URL: `http://localhost:3000/check-ip`
   - Header:
     - `x-api-key`: `my-secret-api-key`

3. **API Bridge para ERP**:
   - Método: `POST`
   - URL: `http://localhost:3000/api/bridge`
   - Headers:
     - `x-api-key`: `my-secret-api-key`
     - `Content-Type`: `text/plain`
   - Body:
     ```json
     {
       "erpUrl": "https://api-do-erp.com/v1/resource",
       "data": "{"bodyExperadoNaAPI":[{"value":"16520"}]}"
     }
     ```

## Estrutura do Projeto

```
node-api-middleware/
│
├── index.js        # Código principal do servidor
├── package.json    # Dependências do projeto
├── .env            # Arquivo de configuração da API Key (criar manualmente)
└── README.md       # Documentação do projeto
```

## Conclusão

Este projeto fornece um middleware simples em **Node.js** com proteção por **API Key**, um **heartbeat** para verificação de status e um **método para consultar o IP de saída**. Ele pode ser utilizado para redirecionar requisições de forma segura, facilitando o acesso a servidores protegidos sem a necessidade de liberar VPN para todos os usuários.

Se você encontrar algum problema ou precisar de ajuda, é só avisar!
