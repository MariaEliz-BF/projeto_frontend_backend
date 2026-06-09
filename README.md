 🍰 Doceria Delivery

Sistema web simples para gerenciamento de uma doceria, desenvolvido com frontend e backend integrados.
O projeto permite cadastrar doces, registrar pedidos, visualizar vendas e gerenciar os dados salvos no sistema.

- FastAPI
- SQLAlchemy
- SQLite
- HTML
- CSS
- JavaScript
- Bootstrap

---

 📌 Objetivo

O objetivo do projeto é simular um sistema básico de vendas para uma doceria, permitindo:

- cadastrar doces;
- listar doces cadastrados;
- editar doces;
- excluir doces;
- criar pedidos;
- listar pedidos;
- editar pedidos;
- excluir pedidos;
- calcular o valor total dos pedidos;
- exibir os doces relacionados a cada pedido;
- integrar frontend e backend.

---

👩‍💻 Tecnologias Utilizadas

Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn

 Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons

---

 🎨 Padrão Visual

 Fontes

- Destaque: Dancing Script
- Principal: Noto Serif

 Cores

| Elemento | Cor |
|---|---|
| Fundo | `#f4f4f4` |
| Destaques | `#f4d4d4` |
| Texto principal | `#7b3b11` |

---

 📂 Estrutura do Projeto

```txt
projeto_frontend_backend/
│
├── backend/
│   ├── routes/
│   │   ├── doces.py
│   │   ├── pedidos.py
│   │   └── usuario.py
│   │
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
│   ├── pedidos/
│   ├── index.html
│   ├── criar.html
│   └── editar.html
└── README.md
```

---

 ⚙️ Como Executar o Projeto

 1. Clonar o repositório

```bash
git clone [URL_DO_REPOSITORIO](https://github.com/MariaEliz-BF/projeto_frontend_backend.git)
```

---

 2. Entrar na pasta do backend

```bash
cd backend
```

---

 3. Criar ambiente virtual

```bash
python -m venv venv
```

---

 4. Ativar ambiente virtual

 Windows

```bash
.\venv\Scripts\Activate.ps1
```

---

 5. Instalar dependências

```bash
pip install fastapi uvicorn sqlalchemy pydantic
```

---

 6. Rodar a API

```bash
python -m uvicorn main:app --reload
```

---

 📚 Swagger da API

Após iniciar a API:

```txt
http://127.0.0.1:8000/docs
```

---

 🛍️ Frontend

Abrir com Live Server:

```txt
frontend/vendas/index.html
```

ou:

```txt
http://127.0.0.1:5500/frontend/vendas/index.html
```

---

 📌 Funcionalidades


Doces

- Listar doces cadastrados;
- Buscar doces por nome;
- Buscar doces por ID no frontend;
- Cadastrar novo doce;
- Editar doce existente;
- Excluir doce;
- Exibir preço formatado em reais.
Rotas utilizadas:
GET    /doces/
GET    /doces/?nome=
GET    /doces/{doce_id}
POST   /doces/
PUT    /doces/{doce_id}/substituir
DELETE /doces/{doce_id}

Pedidos

- Listar pedidos cadastrados;
- Paginar pedidos de 10 em 10;
- Buscar pedido por ID;
- Criar novo pedido;
- Editar pedido existente;
- Excluir pedido;
- Exibir doces relacionados ao pedido;
- Exibir data no formato brasileiro;
- Exibir valor total do pedido;
- Mostrar mensagem para pedidos sem itens.
Rotas utilizadas:
GET    /pedidos/?page=1&limit=10
GET    /pedidos/{pedido_id}
POST   /pedidos/
PUT    /pedidos/{pedido_id}/substituir
DELETE /pedidos/{pedido_id}

---

🔗 Integração Frontend + Backend

O frontend consome a API utilizando:

```js
fetch("http://127.0.0.1:8000/doces/")
```

e

```js
fetch("http://127.0.0.1:8000/pedidos/")
```

---

🔐 Autenticação

O projeto possui início da implementação de autenticação.
Atualmente existe o modelo de usuário e uma rota para criação de usuário administrador:

POST /auth/criar-admin

Usuário de teste planejado:

E-mail: admin@email.com
Senha: 123456

Ainda está em desenvolvimento:
- Login com JWT;
- Retorno de access_token;
- Armazenamento do token no localStorage;
- Envio do token no cabeçalho Authorization;
- Proteção das rotas POST, PUT/PATCH e DELETE;
- Botão de sair;
- Bloqueio de páginas protegidas sem login.

---

🧾 Relacionamento entre Entidades

O sistema possui relacionamento entre pedidos e doces por meio da tabela de itens do pedido.
Estrutura simplificada:
Pedido
  └── ItemPedido
        └── Doce

Cada pedido pode possuir vários itens, e cada item está associado a um doce.
Na resposta da API, os pedidos retornam os doces relacionados embutidos nos itens.

---
📄 Paginação

A listagem de pedidos possui paginação.
Exemplo:

GET /pedidos/?page=1&limit=10

Resposta esperada:

{
  "data": [],
  "total": 25,
  "page": 1,
  "limit": 10,
  "pages": 3
}

No frontend, a página de pedidos exibe:
Botão Anterior;
Botão Próximo;
Informação da página atual;
Botões desativados nos extremos.
---
🔎 Busca
Busca de doces
O backend permite buscar doces por nome:

GET /doces/?nome=brig

O frontend também permite buscar por ID usando:

GET /doces/{doce_id}
Busca de pedidos

Atualmente o frontend permite buscar pedidos por ID:

GET /pedidos/{pedido_id}

Busca de pedidos por cliente ou data ainda pode ser implementada no backend.
---
#👥 Integrantes

- Juliana Gonçalves
- Maria Eliz

---

 🚧 Status do Projeto

Projeto em desenvolvimento.
