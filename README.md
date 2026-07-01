🍰 Doceria Delivery
Sistema web para gerenciamento de uma doceria, desenvolvido com frontend e backend integrados. O projeto permite o gerenciamento completo de doces e pedidos, com autenticação segura via JWT.

🚀 Acesso ao Projeto
Frontend (Produção): https://projetofrontendbackend.netlify.app/login.html

Backend: (Insira aqui a URL pública do seu serviço de backend, ex: Render, Railway, etc.)

📌 Objetivo
Simular um sistema de vendas para uma doceria, com foco em:

Gerenciamento de estoque (CRUD de doces);

Gestão de vendas (CRUD de pedidos);

Cálculo automático de valores totais;

Autenticação e proteção de rotas via JWT;

Integração entre interface (SPA) e API REST.

👩‍💻 Tecnologias Utilizadas
Backend
Framework: FastAPI

ORM: SQLAlchemy

Banco de Dados: SQLite

Autenticação: JWT (Python-Jose)

Validacão: Pydantic

Frontend
Estrutura: HTML5, CSS3, JavaScript

Interface: Bootstrap 5 & Bootstrap Icons

UX: Toastify (Notificações)

🔗 Estrutura do Projeto
Plaintext
projeto_frontend_backend/
├── backend/            # API FastAPI (Rotas, Auth, DB)
└── frontend/           # Interface (Login, Doces, Pedidos)
⚙️ Como Executar Localmente
1. Backend
Bash
cd backend
python -m venv venv
# Ativação: .\venv\Scripts\Activate.ps1 (Windows)
pip install fastapi uvicorn sqlalchemy pydantic python-jose
python -m uvicorn main:app --reload
Swagger/API Docs: http://127.0.0.1:8000/docs

2. Frontend
Abra o arquivo frontend/login.html utilizando a extensão Live Server do VS Code ou um servidor local.

🔐 Autenticação e Segurança
Hash de Senhas: Utilização de bcrypt para armazenamento seguro.

Proteção de Rotas: Acesso às telas internas bloqueado sem token JWT válido.

Credenciais de Teste:

E-mail: admin@email.com

Senha: 123456

🛠️ Funcionalidades Implementadas
Doces
Listagem, busca por nome/ID, cadastro, edição e exclusão.

Rotas: GET, POST, PUT, DELETE em /doces/.

Pedidos
Listagem paginada (10 itens/página), busca por ID, criação, edição e exclusão.

Exibição de valor total e relacionamento com doces.

Rotas: GET, POST, PUT, DELETE em /pedidos/.

Integração
Uso de fetch para consumo da API.

Cabeçalho Authorization: Bearer <token> enviado em requisições protegidas.

Uso de localStorage para persistência do token.

👥 Integrantes
Juliana Gonçalves

Maria Eliz

🚧 Status do Projeto
Projeto finalizado (Sprint 3), com melhorias em UX (Toasts, Modais de confirmação) e segurança (Criptografia e JWT).
