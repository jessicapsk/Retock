## Detalhamento do Projeto

O Retock é uma aplicação full-stack projetada para otimizar e melhorar a experiência do usuário em diferentes papéis, incluindo administradores, clientes e profissionais. O projeto é dividido em dois principais componentes:

1. **Backend**: Um servidor baseado em Node.js que gerencia requisições de API, autenticação de usuários e lógica de negócios.
2. **Frontend**: Uma aplicação cliente baseada em React que fornece uma interface de usuário intuitiva para diferentes papéis de usuários.

### Propósito
Este projeto tem como objetivo fornecer uma solução robusta e escalável para gerenciar interações e dados de usuários. Ele foi projetado para ser:

- **Modular**: Fácil de estender e manter.
- **Escalável**: Capaz de lidar com um número crescente de usuários e funcionalidades.
- **Amigável ao Usuário**: Oferece uma experiência fluida para todos os papéis de usuários.

### Estrutura do Projeto

#### Backend
O backend é construído com Node.js e TypeScript. Ele inclui os seguintes componentes principais:

- **Controllers**: Gerenciam requisições recebidas e interagem com os serviços.
- **Models**: Definem a estrutura dos dados e interagem com o banco de dados.
- **Routes**: Definem os endpoints da API.
- **Middlewares**: Gerenciam tarefas como autenticação e tratamento de erros.

##### Arquivos Principais
- `Dockerfile`: Define a imagem Docker para o backend.
- `package.json`: Lista dependências e scripts.
- `app.ts`: O ponto de entrada da aplicação.

#### Frontend
O frontend é construído com React e TypeScript. Ele inclui os seguintes componentes principais:

- **Pages**: Representam diferentes visualizações como login, registro e dashboards.
- **Components**: Elementos de interface reutilizáveis.
- **Services**: Gerenciam chamadas de API e lógica de negócios.
- **Types**: Definem tipos do TypeScript para melhor qualidade de código.

##### Arquivos Principais
- `Dockerfile`: Define a imagem Docker para o frontend.
- `App.tsx`: O componente principal da aplicação.
- `routes.tsx`: Define a estrutura de rotas.

### Como Usar

#### Pré-requisitos
- Docker instalado na sua máquina.
- Node.js e npm (se for executar localmente).

#### Executando o Projeto

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Execute `docker-compose up` para iniciar os serviços do backend e frontend.
4. Execute `npm install` no diretório do backend ou do frontend para instalar as dependencias localmente

#### Acessando a Aplicação
- O frontend estará disponível em `http://localhost:3000`.
- A API do backend estará disponível em `http://localhost:5000`.

### Contribuição
Contribuições são bem-vindas! Por favor, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch para sua funcionalidade ou correção de bug.
3. Envie um pull request com uma descrição detalhada das suas alterações.

## Padrão de Projeto Utilizado

O projeto Retock segue o padrão **Monorepo Full-Stack** com separação clara entre **Backend** e **Frontend**, utilizando boas práticas de desenvolvimento modular e escalável. Abaixo estão os principais padrões identificados:

### 1. **Backend**
   - **MVC (Model-View-Controller)**: O backend utiliza o padrão MVC, com:
     - **Controllers** para gerenciar requisições e respostas.
     - **Models** para definir a estrutura de dados e interagir com o banco de dados.
     - **Routes** para organizar os endpoints da API.
   - **Middlewares**: Utilizados para tarefas como autenticação e tratamento de erros, seguindo o padrão de middleware do Express.js.
   - **Docker**: O uso de um `Dockerfile` para criar imagens do backend garante portabilidade e consistência no ambiente de execução.

### 2. **Frontend**
   - **Component-Based Architecture**: O frontend utiliza o padrão de componentes do React, com:
     - **Pages** para representar visualizações completas.
     - **Components** para criar elementos reutilizáveis.
     - **Services** para abstrair chamadas de API e lógica de negócios.
   - **TypeScript**: Adotado para garantir tipagem estática e maior segurança no código.
   - **Routing**: Gerenciado por um arquivo de rotas (`routes.tsx`), seguindo o padrão de Single Page Applications (SPA).

### 3. **Infraestrutura**
   - **Docker Compose**: Utilizado para orquestrar os serviços do backend e frontend, permitindo fácil execução e integração.
   - **12-Factor App**: O projeto segue princípios como:
     - Configuração via variáveis de ambiente (ex.: [`.env`](.env ) ).
     - Dependências explicitamente declaradas no `package.json`.

### 4. **Padrão de Build**
   - **Multi-Stage Docker Build**: O backend utiliza um build multi-stage no Dockerfile, separando o estágio de construção (`builder`) do estágio de produção, otimizando o tamanho da imagem final.

### 5. **Organização Geral**
   - **Separação de Responsabilidades**: Cada camada (backend e frontend) é bem isolada, facilitando manutenção e escalabilidade.
   - **Modularidade**: Código organizado em módulos reutilizáveis, tanto no backend quanto no frontend.

Esse padrão é ideal para projetos modernos que precisam ser escaláveis, modulares e fáceis de manter.