from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Doce
from schemas import DoceCreate, DoceResponse

router = APIRouter(
    prefix="/doces",
    tags=["Doces"]
)
#//buscar e buscar por id
@router.get("/", response_model=list[DoceResponse])
def listar_doces(): 
    return {"doces": "Lista de doces"}

@router.get("/{doce_id}",response_model=DoceResponse)
def listar_doces_id(doce_id: int):
    return {"doce": f"Detalhes do doce {doce_id}"}
#//restante operações para doces
@router.post("/", response_model=DoceResponse)
def criar_doce(doce: DoceCreate, db: Session = Depends(get_db)):

    novo_doce = Doce(
        nome=doce.nome,
        preco=doce.preco,
        quantidade=doce.quantidade
    )

    db.add(novo_doce)
    db.commit()
    db.refresh(novo_doce)

    return novo_doce

@router.patch("/{doce_id}", response_model=DoceResponse)
def atualizar_doce(doce_id: int, doce: DoceCreate):
    return {"mensagem": f"Doce {doce_id} atualizado"}   

@router.delete("/{doce_id}")
def deletar_doce(doce_id: int):
    return {"mensagem": f"Doce {doce_id} deletado"}

@router.put("/{doce_id}/substituir", response_model=DoceResponse)
def substituir_doce(doce_id: int, doce: DoceCreate):
    return {"mensagem": f"Doce {doce_id} substituído"}