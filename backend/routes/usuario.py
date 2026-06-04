from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

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