from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from schemas import LoginRequest, TokenResponse
from auth import criar_token
from database import get_db
from models import Usuario

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/criar-admin")
def criar_admin(db: Session = Depends(get_db)):

    usuario = Usuario(
        email="admin@email.com",
        senha="123456"
    )

    db.add(usuario)
    db.commit()

    return {"mensagem": "Usuário criado"}


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

    if usuario.senha != dados.senha:
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