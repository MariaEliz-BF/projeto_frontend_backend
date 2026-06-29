from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from schemas import (
    LoginRequest,
    TokenResponse,
    UsuarioCreate
)
from auth import criar_token
from database import get_db
from models import Usuario
from security import gerar_hash, verificar_senha

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/criar-admin")
def criar_admin(db: Session = Depends(get_db)):

    usuario = Usuario(
        email="admin@email.com",
        senha=gerar_hash("123456")
    )

    db.add(usuario)
    db.commit()

    return {"mensagem": "Usuário criado"}


@router.post("/usuarios")
def criar_usuario(
    dados: UsuarioCreate,
    db: Session = Depends(get_db)
):

    usuario_existente = db.query(Usuario).filter(
        Usuario.email == dados.email
    ).first()

    if usuario_existente:
        raise HTTPException(
            status_code=409,
            detail="Email já cadastrado"
        )

    usuario = Usuario(
        nome=dados.nome,
        email=dados.email,
        senha=gerar_hash(dados.senha)
    )

    db.add(usuario)
    db.commit()

    return {
        "mensagem": "Usuário criado com sucesso"
    }

@router.post("/login", response_model=TokenResponse)
def login(
    dados: LoginRequest,
    db: Session = Depends(get_db)
):

    usuario = db.query(Usuario).filter(
        Usuario.email == dados.email
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=401,
            detail="Email ou senha inválidos"
        )

    if not verificar_senha(
        dados.senha,
        usuario.senha
    ):
        raise HTTPException(
            status_code=401,
            detail="Email ou senha inválidos"
        )

    print("Usuário encontrado:", usuario.email)

    token = criar_token(
        {"sub": usuario.email}
    )

    print("Token criado:", token)

    return {
        "access_token": token,
        "token_type": "bearer"
    }