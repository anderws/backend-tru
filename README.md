# Gerenciamento de APIs de Usuários e Criptomoedas

## Descrição
Esta é uma aplicação para gerenciamento de APIs de usuários e criptomoedas, utilizando:
- **NestJS** para a estrutura do backend
- **Prisma** como ORM
- **SQLite** como banco de dados
- **Jest** para testes automatizados
- **Swagger** para documentação da API, acessível em: [Swagger UI](http://localhost:3000/api)

---

## Endpoints Disponíveis

### **App**
- `GET http://localhost:3000/` - Verifica se a aplicação está em execução

### **Usuários**
- `GET http://localhost:3000/usuarios` - Lista todos os usuários
- `POST http://localhost:3000/usuarios` - Cria um novo usuário
- `GET http://localhost:3000/usuarios/{id}` - Busca um usuário pelo ID
- `DELETE http://localhost:3000/usuarios/{id}` - Deleta um usuário pelo ID
- `PUT http://localhost:3000/usuarios/update-perfil-usuario/{id}` - Atualiza o perfil de um usuário pelo ID
- `GET http://localhost:3000/usuarios/by-perfil/{perfil}` - Busca usuários por perfil (ADMIN ou CLIENTE)

### **Criptomoedas**
- `GET http://localhost:3000/criptomoedas/load` - Carrega as 100 principais criptomoedas
- `GET http://localhost:3000/criptomoedas` - Lista todas as criptomoedas armazenadas
- `DELETE http://localhost:3000/criptomoedas` - Deleta todas as criptomoedas armazenadas
- `GET http://localhost:3000/criptomoedas/{simbolo}` - Busca uma criptomoeda pelo símbolo (ex: btc)

---

## Configuração do Ambiente (.env)
Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```
DATABASE_URL="file:./desafio.db"
COINGECKO_API_KEY=API_KEY_DO_COINGECKO
```

Substitua `API_KEY_DO_COINGECKO` pela sua chave de API do CoinGecko.

---

## Como Executar a Aplicação

### **Instalar dependências**
```sh
yarn install
```

### **Executar a aplicação**
```sh
yarn run start
```

### **Rodar os testes**
```sh
yarn test
```


