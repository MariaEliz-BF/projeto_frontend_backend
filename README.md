# 🍰 Doceria Delivery

Sistema web simples para gerenciamento de uma doceria, desenvolvido com frontend e backend integrados.

O projeto permite cadastrar doces, registrar pedidos, visualizar vendas, gerenciar estoque e controlar o acesso ao sistema por meio de autenticação básica com token JWT.

---

## 📌 Objetivo

O objetivo do projeto é simular um sistema básico de vendas para uma doceria, permitindo:

* Cadastrar doces;
* Listar doces cadastrados;
* Buscar doces por nome ou ID;
* Editar doces;
* Excluir doces;
* Criar pedidos;
* Listar pedidos;
* Buscar pedidos por ID;
* Editar pedidos;
* Excluir pedidos;
* Calcular o valor total dos pedidos;
* Exibir os doces relacionados a cada pedido;
* Utilizar paginação na listagem de pedidos;
* Realizar login com autenticação JWT;
* Proteger páginas internas do frontend;
* Enviar token nas requisições de criação, edição e exclusão;
* Integrar frontend e backend.

---

## 👩‍💻 Tecnologias Utilizadas

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic
* Uvicorn
* Python-Jose

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap 5
* Bootstrap Icons

---

## 🎨 Padrão Visual

### Fontes

* Destaque: `Dancing Script`
* Principal: `Noto Serif`

### Cores

| Elemento        | Cor                   |
| --------------- | --------------------- |
| Fundo           | `#f4f4f4`             |
| Destaques       | `#f4d4d4`             |
| Texto principal | `#7b3b11`             |
| Botões de ação  | tons de rosa e marrom |

---

## 📂 Estrutura do Projeto

```txt
projeto_frontend_backend/
│
├── backend/
│   ├── routes/
│   │   ├── doces.py
│   │   ├── pedidos.py
│   │   └── usuario.py
│   │
│   ├── auth.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── crud.py
│   └── banco.db
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── style.css
│   │
│   ├── doces/
│   │   ├── index.html
│   │   ├── criar.html
│   │   └── editar.html
│   │
│   └── pedidos/
│       ├── index.html
│       ├── criar.html
│       └── editar.html
│
└── README.md
```

---

## ⚙️ Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/MariaEliz-BF/projeto_frontend_backend.git
```

### 2. Entrar na pasta do projeto

```bash
cd projeto_frontend_backend
```

### 3. Entrar na pasta do backend

```bash
cd backend
```

### 4. Criar ambiente virtual

```bash
python -m venv venv
```

### 5. Ativar o ambiente virtual

No Windows PowerShell:

```bash
.\venv\Scripts\Activate.ps1
```

Caso o PowerShell bloqueie a ativação, execute:

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Depois tente ativar novamente:

```bash
.\venv\Scripts\Activate.ps1
```

### 6. Instalar dependências

```bash
pip install fastapi uvicorn sqlalchemy pydantic python-jose
```

### 7. Rodar a API

```bash
python -m uvicorn main:app --reload
```

Ou:

```bash
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

---

## 📚 Swagger da API

Após iniciar a API, acesse:

```txt
http://127.0.0.1:8000/docs
```

No Swagger é possível visualizar e testar as rotas do backend.

---

## 🛍️ Como Executar o Frontend

O frontend deve ser aberto com a extensão **Live Server** do VS Code.

Página de login:

```txt
frontend/login.html
```

Ou pelo navegador:

```txt
http://127.0.0.1:5500/frontend/login.html
```

Página inicial após login:

```txt
frontend/index.html
```

---

## 🔐 Usuário de Teste

Para acessar o sistema, utilize:

```txt
E-mail: admin@email.com
Senha: 123456
```

---

## 📌 Funcionalidades

### Doces

* Listar doces cadastrados;
* Buscar doces por nome;
* Buscar doces por ID no frontend;
* Cadastrar novo doce;
* Editar doce existente;
* Excluir doce;
* Exibir preço formatado em reais;
* Proteger páginas internas sem login;
* Enviar token nas ações de criar, editar e excluir.

Rotas utilizadas:

```txt
GET    /doces/
GET    /doces/?nome=
GET    /doces/{doce_id}
POST   /doces/
PUT    /doces/{doce_id}/substituir
DELETE /doces/{doce_id}
```

---

### Pedidos

* Listar pedidos cadastrados;
* Paginar pedidos de 10 em 10;
* Buscar pedido por ID;
* Criar novo pedido;
* Editar pedido existente;
* Excluir pedido;
* Exibir doces relacionados ao pedido;
* Exibir data no formato brasileiro;
* Exibir valor total do pedido;
* Mostrar mensagem para pedidos sem itens;
* Proteger páginas internas sem login;
* Enviar token nas ações de criar, editar e excluir.

Rotas utilizadas:

```txt
GET    /pedidos/?page=1&limit=10
GET    /pedidos/{pedido_id}
POST   /pedidos/
PUT    /pedidos/{pedido_id}/substituir
DELETE /pedidos/{pedido_id}
```

---

## 🔗 Integração Frontend + Backend

O frontend consome a API utilizando `fetch`.

Exemplo de listagem de doces:

```js
fetch("http://127.0.0.1:8000/doces/")
```

Exemplo de listagem paginada de pedidos:

```js
fetch("http://127.0.0.1:8000/pedidos/?page=1&limit=10")
```

Exemplo de requisição protegida com token:

```js
fetch("http://127.0.0.1:8000/pedidos/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
        cliente,
        data,
        itens
    })
})
```

---

## 🔐 Autenticação

O sistema possui autenticação básica com token JWT.

Fluxo implementado:

* O usuário acessa `login.html`;
* Informa e-mail e senha;
* O frontend envia os dados para a rota `/auth/login`;
* O backend valida as credenciais;
* Se os dados estiverem corretos, retorna um token JWT;
* O frontend armazena o token no `localStorage`;
* O frontend envia o token no cabeçalho `Authorization` nas requisições protegidas;
* As páginas internas verificam se existe token;
* Caso não exista token, o usuário é redirecionado para `login.html`;
* O botão de sair remove o token e o usuário do `localStorage`.

Rota de login:

```txt
POST /auth/login
```

Formato esperado:

```json
{
  "email": "admin@email.com",
  "senha": "123456"
}
```

Resposta esperada:

```json
{
  "access_token": "token_jwt",
  "token_type": "bearer"
}
```

---

## 🧾 Relacionamento entre Entidades

O sistema possui relacionamento entre pedidos e doces por meio da tabela de itens do pedido.

Estrutura simplificada:

```txt
Pedido
  └── ItemPedido
        └── Doce
```

Cada pedido pode possuir vários itens, e cada item está associado a um doce.

Na resposta da API, os pedidos retornam os doces relacionados embutidos nos itens.

Exemplo:

```json
{
  "id": 1,
  "cliente": "Maria",
  "data": "2026-06-04",
  "valor_total": 25.0,
  "itens": [
    {
      "quantidade": 2,
      "doce": {
        "id": 1,
        "nome": "Brigadeiro",
        "preco": 3.5
      }
    }
  ]
}
```

---

## 📄 Paginação

A listagem de pedidos possui paginação.

Exemplo:

```txt
GET /pedidos/?page=1&limit=10
```

Resposta esperada:

```json
{
  "data": [],
  "total": 25,
  "page": 1,
  "limit": 10,
  "pages": 3
}
```

No frontend, a página de pedidos exibe:

* Botão Anterior;
* Botão Próximo;
* Informação da página atual;
* Botões desativados na primeira e na última página.

---

## 🔎 Busca

### Busca de doces

O backend permite buscar doces por nome:

```txt
GET /doces/?nome=brig
```

O frontend também permite buscar doces por ID:

```txt
GET /doces/{doce_id}
```

### Busca de pedidos

O frontend permite buscar pedidos por ID:

```txt
GET /pedidos/{pedido_id}
```

---

## 🧪 Testes Recomendados

Antes da apresentação, recomenda-se testar:

* Login com usuário válido;
* Login com senha incorreta;
* Redirecionamento para `login.html` ao tentar acessar página protegida sem token;
* Criação de doce;
* Edição de doce;
* Exclusão de doce;
* Busca de doce por nome;
* Criação de pedido;
* Edição de pedido;
* Exclusão de pedido;
* Busca de pedido por ID;
* Paginação com mais de 10 pedidos;
* Botão de sair removendo o token e redirecionando para login.

---

## 👥 Integrantes

* Juliana Gonçalves
* Maria Eliz

---

## 🚧 Status do Projeto

Projeto em desenvolvimento para a Sprint 2 da disciplina de Programação Web.
