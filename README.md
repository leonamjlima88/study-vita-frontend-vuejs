# study-vita-app

Cadastro de oportunidades de vendas.
Domínios:
- Clientes
- Vendedores
- Produtos
- Oportunidades de Venda

## Camadas do projeto

### views
Páginas do projeto

### Store
Gerenciamento de estado com Pinia

### Services
Consulta da API e possíveis regras de negócio do front-end

## O que não foi feito?
- Autenticação, login
- Plano de testes
- Permissão de acesso a rotas

Observação: Devida a falta de experiência no frontend, não fiz a componentização da maneira que deveria ser feito. Pretendo estudar mais a fundo frontend com vuejs.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Configuração do arquivo .env
NODE_ENV=development
VUE_APP_URL=url configurada na API. Exemplo: http://study-vita-backend-laravel.test/api
VUE_APP_LOCALE=linguagem de retorno das requisições. Exemplo: pt_br
VUE_APP_PAGE_CONFIG_LIMIT=Limite de registros por tela. Exemplo: 10
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
