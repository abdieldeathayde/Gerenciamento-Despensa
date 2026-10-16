# Minha Despensa — Full Stack

Aplicação web para organizar despensas compartilhadas, produtos, estoque, validade e listas de compras. O repositório reúne o frontend Angular e a API Java/Spring Boot em uma única estrutura, com PostgreSQL e Docker Compose.

## Stack

- **Frontend:** Angular 20, TypeScript, SCSS, Angular Router e HttpClient
- **Backend:** Java 21, Spring Boot 3.5.6, Spring Web, Spring Data JPA, Bean Validation e Spring Security
- **Banco:** PostgreSQL 16
- **Infraestrutura:** Docker Compose, Nginx e volumes persistentes

## Estrutura

```text
Gerenciamento-Despensa-Fullstack/
├── backend/                 # API Spring Boot
├── frontend/                # SPA Angular
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Executar com Docker

Pré-requisitos: Docker Desktop com containers Linux habilitados.

1. Copie o arquivo de ambiente:

   **Windows PowerShell**
   ```powershell
   Copy-Item .env.example .env
   ```

   **Linux/macOS**
   ```bash
   cp .env.example .env
   ```

2. Edite `.env` e substitua `POSTGRES_PASSWORD` por uma senha local própria.
3. Na raiz do projeto, execute:

   ```bash
   docker compose up --build -d
   ```

4. Abra:
   - Frontend: http://localhost:8080
   - Backend: http://localhost:8081
   - PostgreSQL: `localhost:5432` (somente para ferramentas de desenvolvimento)

Para acompanhar os logs:

```bash
docker compose logs -f
```

Para parar os serviços sem apagar os dados:

```bash
docker compose down
```

Para apagar também os dados do banco (ação destrutiva):

```bash
docker compose down -v
```

## Executar em desenvolvimento sem Docker

### Backend

Requer JDK 21 e Maven:

```bash
cd backend
mvn spring-boot:run
```

A API usa a porta `8081` e, por padrão, espera PostgreSQL em `localhost:5432`. Defina `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME` e `SPRING_DATASOURCE_PASSWORD` se necessário.

### Frontend

Requer Node.js 22 e npm:

```bash
cd frontend
npm ci
npm start
```

O Angular fica normalmente em http://localhost:4200. O ambiente de desenvolvimento usa `http://localhost:8080/api`; ajuste `frontend/src/environments/environment.ts` para `http://localhost:8081/api` se estiver executando a API diretamente na porta 8081.

## Integração frontend/API

Os serviços Angular usam `environment.apiUrl`. No build de produção, o endereço é relativo (`/api`) e o Nginx encaminha as requisições para o serviço `backend` na rede Docker. Isso evita CORS entre navegador e API no cenário do Compose.

## Observações de segurança e produção

- O `SecurityConfig` atual permite chamadas à API para viabilizar a integração demonstrativa. **Autenticação JWT, autorização por usuário e isolamento dos dados por proprietário ainda precisam ser implementados e testados antes de disponibilizar o sistema publicamente.**
- `.env.example` contém apenas valores de desenvolvimento; não publique senhas reais.
- `ddl-auto=update` é prático em desenvolvimento. Para produção, use migrações versionadas (Flyway/Liquibase), backups e `ddl-auto=validate`.
- Adicione testes de integração, rate limiting, logs sem dados sensíveis e HTTPS no ambiente de publicação.

## Testes

Backend:

```bash
cd backend
mvn test
```

Frontend:

```bash
cd frontend
npm test
```

Os comandos de teste devem ser executados após instalar as dependências e configurar o ambiente.

## Autor

**Abdiel Athayde**  
GitHub: https://github.com/abdieldeathayde  
LinkedIn: https://linkedin.com/in/abdieldeathayde
