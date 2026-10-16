# 🥫 Sistema de Despensa

Sistema web para gerenciamento e organização de despensas, desenvolvido com o objetivo de facilitar o controle de produtos e permitir uma gestão mais prática dos itens armazenados.

A aplicação está sendo estruturada para oferecer cadastro de usuários, autenticação e gerenciamento de despensas, com possibilidade de evolução para o compartilhamento entre usuários.

## 🚀 Tecnologias utilizadas

### Frontend

* Angular 20
* TypeScript
* HTML5
* CSS3
* Reactive Forms
* Angular Router
* HttpClient para integração com a API REST

### Backend

* Java 21
* Spring Boot 3.5.6
* Spring Web
* Spring Data JPA
* Spring Security
* API REST

### Banco de dados e ferramentas

* PostgreSQL
* Maven
* Git e GitHub
* Docker e Docker Compose (quando configurados no projeto)

## ✨ Funcionalidades

### Autenticação e usuários

* Cadastro de usuários com nome, e-mail e senha.
* Login com validação dos campos.
* Validação de dados dos formulários.
* Mensagens de sucesso e erro.
* Preparação para autenticação utilizando JWT.

### Gerenciamento de despensas

* Estrutura planejada para cadastro e organização de despensas.
* Preparação para gerenciamento dos produtos armazenados.
* Possibilidade de evolução para múltiplas despensas e compartilhamento entre usuários.

> **Observação:** as funcionalidades descritas como planejadas ou em desenvolvimento dependem da implementação correspondente no backend e no frontend.

## 📂 Estrutura do projeto

A estrutura pode variar conforme a organização dos diretórios do repositório.

```text
gerenciamento-despensa/
├── frontend/
│   └── src/
│       └── app/
│           ├── auth/
│           │   ├── login/
│           │   ├── cadastro/
│           │   └── auth.service.ts
│           └── app.routes.ts
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   └── pom.xml
├── docker-compose.yml
└── README.md
```

## ⚙️ Pré-requisitos

Instale as ferramentas necessárias antes de executar o projeto:

* Node.js compatível com a versão do Angular utilizada.
* Angular CLI 20.
* JDK 21.
* Maven ou Maven Wrapper.
* PostgreSQL.
* Git.

Docker é opcional caso o ambiente seja executado sem contêineres.

## 🔧 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
cd gerenciamento-despensa
```

Substitua `URL_DO_REPOSITORIO` pela URL real do GitHub.

### 2. Executar o backend

Acesse o diretório do backend:

```bash
cd backend
```

Configure a conexão com o PostgreSQL no arquivo `application.properties` ou `application.yml`, conforme a configuração do projeto.

Exemplo de configuração:

```properties
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/despensa}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD}
```

Configure também a senha do banco de dados por variável de ambiente.

Execute a aplicação com o Maven Wrapper:

**Windows:**

```powershell
.\mvnw.cmd spring-boot:run
```

**Linux/macOS:**

```bash
./mvnw spring-boot:run
```

O endereço padrão do backend Spring Boot é:

```text
http://localhost:8080
```

### 3. Executar o frontend

Em outro terminal, acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação Angular:

```bash
npm start
```

Caso o projeto não tenha o script `start` configurado, utilize:

```bash
npx ng serve
```

A aplicação estará disponível, normalmente, em:

```text
http://localhost:4200
```

## 🔌 Integração com a API

O frontend utiliza o serviço de autenticação para enviar as informações de login e cadastro ao backend.

Endpoints previstos para a autenticação:

| Método | Endpoint             | Finalidade         |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/login`    | Autenticar usuário |
| POST   | `/api/auth/register` | Cadastrar usuário  |

Os endpoints são referências de integração e devem corresponder às rotas efetivamente implementadas no backend.

## 🔐 Segurança

O projeto deve adotar boas práticas de segurança, incluindo:

* Armazenamento seguro de senhas com algoritmo de hash apropriado, como BCrypt.
* Validação de entradas no frontend e no backend.
* Autenticação e autorização no servidor.
* Proteção de endpoints privados.
* Configuração adequada de CORS.
* Uso de variáveis de ambiente para credenciais.
* HTTPS em ambientes de produção.

O armazenamento de tokens no `localStorage`, caso utilizado, possui riscos de exposição em ataques XSS e deve ser avaliado antes da publicação.

## 🧪 Testes

Para validar o projeto, recomenda-se executar:

**Backend:**

```bash
./mvnw test
```

No Windows:

```powershell
.\mvnw.cmd test
```

**Frontend:**

```bash
npm test
```

O comando de testes do frontend depende dos scripts configurados no `package.json`.

## 🛣️ Próximas melhorias

* [ ] Finalizar o cadastro e o login integrados à API.
* [ ] Implementar autenticação e autorização com Spring Security e JWT.
* [ ] Implementar recuperação de senha.
* [ ] Desenvolver o CRUD de despensas.
* [ ] Implementar cadastro, edição e exclusão de produtos.
* [ ] Adicionar controle de quantidades e validade dos produtos.
* [ ] Implementar compartilhamento de despensas.
* [ ] Criar testes automatizados.
* [ ] Configurar Docker Compose para frontend, backend e banco de dados.
* [ ] Preparar o deploy em ambiente de produção.

## 👨‍💻 Autor

**Abdiel Athayde**

* GitHub: [github.com/abdieldeathayde](https://github.com/abdieldeathayde)
* LinkedIn: [linkedin.com/in/abdieldeathayde](https://linkedin.com/in/abdieldeathayde)

---

Desenvolvido como projeto de estudo e aplicação prática de desenvolvimento web, APIs REST, persistência de dados e autenticação de usuários.
