# 🍰 Doceria Delivery

Sistema web simples para gerenciamento de uma doceria, desenvolvido com frontend e backend integrados.

O projeto permite cadastrar doces, registrar pedidos, visualizar vendas, gerenciar os dados salvos no sistema e utilizar autenticação básica com token JWT.

* FastAPI
* SQLAlchemy
* SQLite
* HTML
* CSS
* JavaScript
* Bootstrap

---

## 📌 Objetivo

O objetivo do projeto é simular um sistema básico de vendas para uma doceria, permitindo:

* cadastrar doces;
* listar doces cadastrados;
* editar doces;
* excluir doces;
* criar pedidos;
* listar pedidos;
* editar pedidos;
* excluir pedidos;
* calcular o valor total dos pedidos;
* exibir os doces relacionados a cada pedido;
* integrar frontend e backend;
* realizar login com autenticação JWT;
* proteger páginas internas sem login;
* enviar token nas ações de criar, editar e excluir.

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

* Destaque: Dancing Script
* Principal: Noto Serif

### Cores

| Elemento        | Cor       |
| --------------- | --------- |
| Fundo           | `#f4f4f4` |
| Destaques       | `#f4d4d4` |
| Texto principal | `#7b3b11` |

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

---

### 2. Entrar na pasta do backend

```bash
cd projeto_frontend_backend/backend
```

---

### 3. Criar ambiente virtual

```bash
python -m venv venv
```

---

### 4. Ativar ambiente virtual

Windows PowerShell:

```bash
.\venv\Scripts\Activate.ps1
```

Caso o PowerShell bloqueie a ativação:

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Depois tente novamente:

```bash
.\venv\Scripts\Activate.ps1
```

---

### 5. Instalar dependências

```bash
pip install fastapi uvicorn sqlalchemy pydantic python-jose
```

---

### 6. Rodar a API

```bash
python -m uvicorn main:app --reload
```

Ou:

```bash
.\venv\Scripts\python.exe -m uvicorn main:app --reload
```

---

## 📚 Swagger da API

Após iniciar a API:

```txt
http://127.0.0.1:8000/docs
```

---

## 🛍️ Frontend

Abrir com Live Server:

```txt
frontend/login.html
```

Ou:

```txt
http://127.0.0.1:5500/frontend/login.html
```

Após o login, o sistema redireciona para:

```txt
frontend/index.html
```

---

## 🔐 Usuário de Teste

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

Exemplo:

```js
fetch("http://127.0.0.1:8000/doces/")
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

O projeto possui autenticação básica com JWT.

O fluxo funciona da seguinte forma:

* O usuário acessa `login.html`;
* O frontend envia e-mail e senha para `/auth/login`;
* O backend valida as credenciais;
* Se estiver correto, retorna um token JWT;
* O frontend armazena o token no `localStorage`;
* O token é enviado no cabeçalho `Authorization` nas requisições protegidas;
* As páginas internas verificam se há token;
* Se não houver token, o usuário é redirecionado para `login.html`;
* O botão de sair remove o token e o usuário do `localStorage`.

Rota de login:

```txt
POST /auth/login
```

Exemplo de corpo da requisição:

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
* Botões desativados nos extremos.

---

## 🔎 Busca

### Busca de doces

O backend permite buscar doces por nome:

```txt
GET /doces/?nome=brig
```

O frontend também permite buscar por ID usando:

```txt
GET /doces/{doce_id}
```

### Busca de pedidos

Atualmente o frontend permite buscar pedidos por ID:

```txt
GET /pedidos/{pedido_id}
```

Busca de pedidos por cliente ou data ainda pode ser implementada no backend.

---

## 👥 Integrantes

* Juliana Gonçalves
* Maria Eliz

---

## 🚧 Status do Projeto

Projeto em desenvolvimento para a Sprint 2 da disciplina de Programação Web.
