# Sistema de Cadastro de Partidas de Tênis

Este projeto é um sistema de gerenciamento de partidas de tênis. Ele permite o cadastro de clientes, quadras, e o registro de partidas, fornecendo uma interface completa de CRUD (Create, Read, Update, Delete) para todas as tabelas envolvidas.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

- `server`: Backend implementado com Node.js e Express, usando Prisma como ORM para interações com o banco de dados.
- `web`: Frontend criado com React e TypeScript, empregando Vite como ferramenta de construção.

## Modelo de Dados

![Untitled (1)](https://github.com/UFOP-CSI477/csi606-2023-02-atividades-Andre023/assets/89217876/be569cb6-1264-4fc5-aec3-d28798db23c0)

O modelo de dados é composto por três tabelas principais:

- `Clientes`: Armazena informações dos clientes.
- `Partidas`: Registra as partidas de tênis, associando clientes e quadras.
- `Quadras`: Contém informações sobre as quadras disponíveis para partidas.

## Pré-requisitos

Antes de instalar o projeto, você deve ter o Node.js e o npm/yarn instalados em sua máquina.

## Instalação

Primeiramente, clone o repositório do GitHub:

```bash
git clone https://github.com/UFOP-CSI477/csi606-2023-02-atividades-Andre023.git
cd csi606-2023-02-atividades-Andre023/Projeto
```

## Configuração do Backend

Navegue até a pasta do servidor e instale as dependências:

```bash
cd server
npm install
```

Crie um arquivo `.env` baseando-se no `.env.example` e configure as variáveis de ambiente necessárias para o seu ambiente de desenvolvimento.

Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

## Configuração do Frontend

Navegue até a pasta do frontend e instale as dependências:

```bash
cd web/web-vite
npm install
```
## Executando o Projeto

Para executar o backend, utilize:

```bash
npm start
```

Para executar o frontend, em uma nova janela do terminal, use:

```bash
npm run dev
```

O sistema de gerenciamento de partidas de tênis estará acessível através do navegador no endereço http://localhost:5173/.
