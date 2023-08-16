# API Rest

Poc de uma API Rest para apresentação de uma arquitetura de microserviço backend.
Em um único container está rodando diversas tecnologias:
- MongoDB
- PM2
- Node.js
- Git para deploy
- NestJs

Dispensando a criação de diversos containers e assim economizando memória e centralizando tudo em um único serviço!

### Recursos
- Mongo Database
- PM2 Cluster Mode (Node.js) e monitoramento
- Testes Unitários
- Testes de Integração
- Lint (Eslint) e Prettier (Code Formatter)
- Padrões de Projeto (Design Patterns) 
- JWT Token Passport Strategy
- Docker para MongoDB Database e PM2 Cluster Mode
- NestJS Framework (Node.js) e Typescript para desenvolvimento da API
- API para CRUD de Usuários, Produtos e Locações
- API para Autenticação e Refresh Token
- Estratégia de execução da aplicação em Cluster Mode (Node.js) ou Local
- Deploy da API no container usando o Git

### Monitoramento com o PM2

O acesso será enviado por e-mail.

![Monitoramento PM2](/../main/public/images/pm2.png?raw=true "Monitoramento PM2")

## Node Engine
- Version >= 18

## Postman Collections
- https://pobsro.postman.co/workspace/Well-Space~530296d8-c915-436a-8433-e8faa742e999/collection/1225563-e33e75a6-3451-4cb0-8e59-67696d72bdf5?action=share&creator=1225563

Entre na pasta do projeto e certifique-se que o não exista nenhum serviço rodando na porta 3000 e 27017.

## Para rodar em Cluster Mode com PM2 

Precisa ter o Docker e Docker Compose instalados

Inicie o serviço com o comando:

`docker-compose up -d`

Para parar o serviço, execute o comando:

`docker-compose down`

## Para rodar localmente somente com o Docker rodando o MongoDB

Inicie o serviço com o comando:

`npm run preview:local`

Para parar o serviço, execute o comando:

`docker-compose down`

## Para rodar localmente sem o Docker

Precisa ter o MongoDB rodando na porta 27017 com o banco de dados "apidb" criado e sem senha de acesso e o Node.js instalado.

Instale os pacotes do projeto com o comando:

`npm install`

Depois inicie a aplicação com o comando:

`npm start:dev`

## Deploy da API no container

Para fazer o deploy da API no container, e ver o git fazendo pull execute o comando:

`npm run deploy:api`

## Débitos Técnicos

- Completar os Testes de Integração
- Completar os Testes Unitários
- Completar o Lint
- Completar o Prettier
- Finalizar as regras de negócio de Locação


