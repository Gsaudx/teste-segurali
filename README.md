# Segurali Take-Home

Projeto desenvolvido como teste técnico para a empresa Segurali, consistindo em um CRUD de usuários completo com Backend (Node.js) e Frontend (React) conforme os requisitos enviados pela Francisca.
Autor: Guilherme Saud, 01/01/2026.

## Como Rodar o Projeto

Você tem duas opções para rodar o projeto: **Via Docker (Recomendado para teste rápido)** ou **Via Terminal (Desenvolvimento)**.

> **Nota Importante:** Em ambos os casos, o banco de dados PostgreSQL roda via Docker. A diferença é se a aplicação (Backend/Frontend) roda no seu terminal ou em containers.

---

### Opção 1: Rodar tudo via Docker (Recomendo este)

Esta opção sobe e roda todo o ambiente (Banco, Backend e Frontend) com um único comando.

**Pré-requisitos:**
- Docker e Docker Compose instalados.

**Passo a passo:**
No Windows, certifique-se de que o Docker está aberto ou no Linux, certifique-se de que o processo do Docker está rodando (`sudo systemctl status docker` para ver se está rodando)

1. Então, na raiz do projeto, execute:
   ```bash
   docker-compose up --build
   ```
2. Aguarde os containers subirem.
3. Acesse a aplicação em: `http://localhost:5173`

---

### Opção 2: Rodar via terminal (Desenvolvimento)

Esta opção roda apenas o banco no Docker, e as aplicações Node/React (backend e frontend) no seu terminal. Usei essa para testar a aplicação enquanto desenvolvia.

**Pré-requisitos:**
- Node.js (v18+)
- Docker (apenas para o banco de dados)

#### 1. Subir o Banco de Dados
No Windows, certifique-se de que o Docker está aberto ou no Linux, certifique-se de que o processo do Docker está rodando (`sudo systemctl status docker` para ver se está rodando)

Então, na raiz do projeto:
```bash
docker-compose up -d postgres
```

#### 2. Backend (API)

Em um terminal:
```bash
cd server
npm install # Para instalar as dependências do backend
npx prisma migrate dev  # Para criar as tabelas no banco
npx prisma db seed # (Opcional) Para popular o banco com dados iniciais. Se você rodar de novo, não duplica os dados
npm run dev
```
O servidor iniciará em `http://localhost:3333`. Você pode testar realizando requisições HTTP em um aplicativo como o Postman ou acessar `http://localhost:3333/api-docs` para acessar a documentação gerada pelo Swagger/OpenAPI

#### 3. Frontend (Web)

Em **outro** terminal:
```bash
cd web
npm install # Para instalar as dependências do frontend
npm run dev
```
A aplicação web estará disponível em `http://localhost:5173`. **Para acessar o projeto, você deverá abrir esse link**

---

## Tecnologias Utilizadas

### Backend
- **Node.js & Express**: Base da API.
- **TypeScript**: Tipagem estática e segurança.
- **Prisma (PostgreSQL)**: ORM para interação com banco de dados.
- **Zod**: Validação de dados.
- **Helmet & Rate Limit**: Segurança básica (Headers e proteção contra DDoS simples com rate limit).
- **Swagger (OpenAPI)**: Documentação interativa da API.
- **Arquitetura em Camadas**: Route -> Controller -> Service -> Repository (com Injeção de Dependência).

### Frontend
- **React & Vite**: Performance e experiência de desenvolvimento.
- **TypeScript**: Tipagem compartilhada e segurança.
- **TailwindCSS**: Estilização utilitária e responsiva.
- **TanStack Query (React Query)**: Gerenciamento de estado assíncrono e cache.
- **React Hook Form + Zod**: Gerenciamento de formulários e validação.
- **Axios**: Cliente HTTP.
- **Sonner**: Notificações (Toasts) para feedback de usuário.

## Decisões Técnicas

1.  **Arquitetura do Backend**: Optei por separar as responsabilidades em camadas (Controller, Service, Repository) para facilitar testes unitários futuros e manutenção. O Controller recebe a requisição, o Service concentra as regras de negócio (ex: não permitir email duplicado) e o Repository é a camada de acesso ao banco de dados (nesse caso, abstraída pelo Prisma).
2.  **PostgreSQL**: Escolhido como banco de dados relacional, está rodando via Docker localmente.
3.  **React Query**: Utilizado no frontend para evitar "prop drilling" e gerenciar estados de loading/erro de forma declarativa, além de oferecer cache automático.
4.  **Validação Compartilhada**: O Zod é usado tanto no back quanto no front, assim garanto a consistência nas regras de validação (ex: idade mínima, formato de email).
5. **Visualização do ID nos detalhes**: Pode ser importante. Como se trata de um sistema que registra usuários e permite a busca por ID, achei interessante permitir com que o usuário visualize essa ifnormação, permitindo com que ele utilize-a na busca.
6. **Arquitetura Feature-Based no Frontend**: O frontend foi estruturado para seguir uma organização baseada em funcionalidades (por exemplo: `features/users`), agrupando componentes, hooks e schemas relacionados.
7. **Feedback de Usuário (UX)**: Utilizei toasts (`sonner`) para erros de API e sucessos no frontend.
8. **Injeção de Dependência**: Backend usa Injeção de Dependência manual. `UserController` recebe `UserService`, que recebe `UserRepository`. Isso desacopla as classes e facilita muito a criação de testes unitários com mocks (nesse caso, implementação futura)
9. **Segurança**: `helmet` para proteger headers HTTP e `express-rate-limit` para evitar abusos básicos da API.
10. **Documentação**: Implementei Swagger/OpenAPI (`/api-docs`) para facilitar o consumo da API e testes manuais.

## Pontos de Melhoria Futuros

- **Testes Automatizados**: Implementar testes unitários (backend e frontend) para garantir a integridade das regras de negócio e testes de integração.
- **Acessibilidade (a11y)**: Refinar componentes como o Modal com 'Focus Trap' e melhores atributos ARIA.
- **CI/CD**: Configurar pipeline básico (GitHub Actions) para linting e verificação de tipos.
- **Autenticação**: Adicionar JWT para proteger rotas sensíveis.

## Progresso

- [x] Configuração inicial da estrutura de pastas (server/web)
- [x] Backend: Setup inicial (Node, TS, Express, Zod, Prisma)
- [x] Backend: Configuração do Banco de Dados (SQLite)
- [x] Frontend: Setup inicial (Vite, React, TS, Tailwind)
- [x] Frontend: Configuração do Axios e React Query
- [x] Frontend: Criação de Hooks (useUsers) e Componentes UI (Input, Button, UserCard)
- [x] Frontend: Implementação da Tela Principal (Formulário e Listagem)
- [x] Backend: Implementação da Arquitetura (Repository, Service, Controller)
- [x] Backend: Implementação dos Endpoints (POST /users, GET /users, GET /users/:id)
- [x] Documentação Final (README)
- [x] Dockerização completa (Server + Web)
- [x] Paginação na listagem de usuários
- [x] Reestruturação da arquitetura do Frontend