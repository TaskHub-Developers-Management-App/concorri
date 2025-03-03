# Concorri

## 📝 Descrição
O Concorri é uma aplicação web desenvolvida para facilitar o gerenciamento de cupons de sorteios de lojas. O sistema permite que os usuários registrem e organizem forma simples e eficiente.

## 🚀 Tecnologias
- Node.js
- npm
- Docker
- Prisma
- React

## ⚙️ Pré-requisitos
- Git
- Node.js (versão LTS recomendada)
- npm (gerenciador de pacotes Node.js)
- Docker

## 📦 Instalação

### Clone o repositório
```bash
git clone https://github.com/TaskHub-Developers-Management-App/concorri.git
```

### Instale as dependências do frontend
```bash
cd web
npm install
```

### Instale as dependências da API
```bash
cd ../api
npm install
```

### Configure o banco de dados
```bash
docker-compose up -d
```

### Execute as migrações
```bash
npx prisma migrate dev
```

### Inicie o servidor API
```bash
npm run dev
```

### Inicie o frontend
```bash
cd ../web
npm run dev
```

## 🌐 Acesso

### Frontend
- URL: http://localhost:3000

### API
- URL: http://localhost:5000

## 📝 Notas
- O frontend roda na porta 3000
- A API roda na porta 3333
- Certifique-se que todas as portas estejam disponíveis antes de iniciar