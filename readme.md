# Ignite Call

Uma aplicação moderna de agendamento de chamadas desenvolvida com Next.js, que permite aos usuários registrar sua disponibilidade e receber agendamentos com integração automática ao Google Calendar e Google Meet.

## 📋 Sobre o projeto

O Ignite Call é uma aplicação fullstack de agendamento que simplifica o processo de marcação de reuniões. Os usuários podem:

- Definir sua disponibilidade semanal
- Compartilhar seu link de agendamento
- Receber solicitações de agendamento
- Ter eventos automaticamente criados no Google Calendar
- Gerar salas do Google Meet automaticamente para as reuniões

## 🚀 Tecnologias utilizadas

- **Next.js** - Framework React para desenvolvimento fullstack
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Prisma** - ORM para gerenciamento do banco de dados
- **MySQL** - Sistema de gerenciamento de banco de dados
- **NextAuth.js** - Biblioteca de autenticação
- **Google APIs** - Integração com Google Calendar e Google Meet
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Stitches** - CSS-in-JS para estilização
- **Phosphor Icons** - Biblioteca de ícones
- **Day.js** - Manipulação de datas

## 🎨 Layout

O design da aplicação está disponível no Figma:
- [Layout do projeto](https://www.figma.com/file/WQmyowq4Scf3nmwmVJmuEf/Ignite-Call-(Community))

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [Git](https://git-scm.com)
- [MySQL](https://www.mysql.com/) ou acesso a um banco MySQL

## 🔧 Instalação

1. Clone este repositório:
```bash
git clone https://github.com/seuusuario/ignite-call.git
```

2. Acesse a pasta do projeto:
```bash
cd ignite-call
```

3. Instale as dependências:
```bash
npm install
# ou
yarn install
```

4. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

5. Configure o arquivo `.env.local` com suas credenciais:
```env
# Database
DATABASE_URL="mysql://usuario:senha@localhost:3306/ignite-call"

# Google OAuth
GOOGLE_CLIENT_ID="seu-client-id"
GOOGLE_CLIENT_SECRET="seu-client-secret"

# NextAuth
NEXTAUTH_SECRET="seu-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

6. Execute as migrations do banco de dados:
```bash
npx prisma migrate dev
```

7. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

8. Acesse a aplicação em `http://localhost:3000`

## 🔑 Configuração do Google OAuth

Para utilizar a integração com Google Calendar e Google Meet:

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative as APIs do Google Calendar e Google OAuth2
4. Configure as credenciais OAuth 2.0
5. Adicione as URLs de redirecionamento autorizadas
6. Copie o Client ID e Client Secret para o arquivo `.env.local`

## 📱 Funcionalidades

- ✅ Cadastro e autenticação via Google
- ✅ Configuração de disponibilidade semanal
- ✅ Página pública de agendamento
- ✅ Integração com Google Calendar
- ✅ Criação automática de salas no Google Meet
- ✅ Validação de horários disponíveis
- ✅ Interface responsiva
- ✅ Sistema de notificações

## 🛠️ Scripts disponíveis

```bash
# Desenvolvimento
npm run dev

# Build da aplicação
npm run build

# Iniciar em produção
npm run start

# Executar migrações do banco
npx prisma migrate dev

# Visualizar banco de dados
npx prisma studio
```

## 📂 Estrutura do projeto

```
src/
├── components/     # Componentes reutilizáveis
├── lib/           # Configurações e utilitários
├── pages/         # Páginas da aplicação (Next.js)
│   ├── api/       # API Routes
│   └── ...
├── prisma/        # Schema e migrações do banco
├── styles/        # Estilos globais
└── utils/         # Funções utilitárias
```

## 🤝 Como contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com 💜 durante o bootcamp Ignite da Rocketseat
</p>