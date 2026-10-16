# Arquitetura

```text
Navegador
   |
   v
Nginx (frontend:80 / host:8080)
   |-- arquivos estáticos Angular
   |
   +-- /api/* --> Spring Boot (backend:8081)
                         |
                         v
                   PostgreSQL (database:5432)
                         |
                    volume persistente
```

O Nginx encaminha `/api/` para o backend na rede privada criada pelo Docker Compose. As portas publicadas podem ser alteradas no `.env`.
