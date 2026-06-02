from fastapi import APIRouter, Depends
from projeto_frontend_backend.backend import crud
from sqlalchemy.orm import Session
from fastapi import HTTPException
from database import get_db
from models import Doce
from schemas import DoceCreate, DoceResponse, DoceUpdate

router = APIRouter(
    prefix="/doces",
    tags=["Doces"]
)
#//buscar e buscar por id
@router.get("/doces")
def listar_doces(
    nome: str = None,
    db: Session = Depends(get_db)
):
    return crud.listar_doces(
        db=db,
        nome=nome
    )

@router.get("/{doce_id}", response_model=DoceResponse)
def listar_doces_id(
    doce_id: int,
    db: Session = Depends(get_db)
):

    doce = db.query(Doce).filter(
        Doce.id == doce_id
    ).first()

    if doce is None:
        raise HTTPException(
            status_code=404,
            detail="Doce não encontrado"
        )

    return doce

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

@router.patch("/{doce_id}", response_model=DoceUpdate)
def atualizar_doce(
    doce_id: int,
    doce: DoceUpdate,
    db: Session = Depends(get_db)
):

    doce_db = db.query(Doce).filter(
        Doce.id == doce_id
    ).first()

    if doce_db is None:
        raise HTTPException(
            status_code=404,
            detail="Doce não encontrado"
        )

    if doce.nome is not None:
        doce_db.nome = doce.nome

    if doce.preco is not None:
        doce_db.preco = doce.preco

    if doce.quantidade is not None:
        doce_db.quantidade = doce.quantidade

    db.commit()
    db.refresh(doce_db)

    return doce_db

@router.delete("/{doce_id}")
def deletar_doce(doce_id: int, db: Session = Depends(get_db)):
    doce = db.query(Doce).filter(Doce.id == doce_id).first()
    if doce is None:
        raise HTTPException(
            status_code=404,
            detail="Doce não encontrado"
        )
    db.delete(doce)
    db.commit()
    return {"mensagem": f"Doce {doce_id} deletado"}

@router.put("/{doce_id}/substituir", response_model=DoceResponse)
def substituir_doce(doce_id: int, doce: DoceCreate, db: Session = Depends(get_db)):
    doce_db = db.query(Doce).filter(Doce.id == doce_id).first()
    if doce_db is None:
        raise HTTPException(
            status_code=404,
            detail="Doce não encontrado"
        )
    doce_db.nome = doce.nome
    doce_db.preco = doce.preco
    doce_db.quantidade = doce.quantidade
    db.commit()
    db.refresh(doce_db)
    return doce_db