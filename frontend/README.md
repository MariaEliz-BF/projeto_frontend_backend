 🍰 Doceria Delivery

Sistema simples de delivery para doceria desenvolvido com:

- FastAPI
- SQLAlchemy
- SQLite
- HTML
- CSS
- JavaScript
- Bootstrap

---

 📌 Objetivo

O projeto simula um sistema básico de vendas para uma doceria, permitindo:

- cadastro de doces
- listagem de produtos
- criação de pedidos
- cálculo automático do valor total
- baixa automática no estoque
- integração entre frontend e backend

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
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── crud.py
│   └── banco.db
│
├── frontend/
│   ├── vendas/
│   │   └── index.html
│   └── style.css
│
└── README.md
```

---

 ⚙️ Como Executar o Projeto

 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
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

- cadastrar doces
- listar doces
- editar doces
- deletar doces

 Pedidos

- selecionar múltiplos produtos
- escolher quantidade
- calcular total automaticamente
- criar pedido
- atualizar estoque automaticamente

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

#👥 Integrantes

- Juliana Gonçalves
- Maria Eliz

---

 🚧 Status do Projeto

Projeto em desenvolvimento.