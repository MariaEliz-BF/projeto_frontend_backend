from sqlalchemy.orm import Session
from models import Doce
from schemas import TarefaCreate, TarefaUpdate

def criar_doce(db: Session, doce: DoceCreate):
    db_doce = Doce(nome=doce.nome, preco=doce.preco, quantidade=doce.quantidade)
    db.add(db_doce)
    db.commit()
    db.refresh(db_doce)
    return db_doce

def obter_doces(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Doce).offset(skip).limit(limit).all()

def listar_doces(db: Session):
    return db.query(Doce).all()

def atualizar_doce(db: Session, doce_id: int, doce: DoceUpdate):
    db_doce = db.query(Doce).filter(Doce.id == doce_id).first()
    if db_doce is None:
        return None
    db_doce.nome = doce.nome
    db_doce.preco = doce.preco
    db_doce.quantidade = doce.quantidade
    db.commit()
    db.refresh(db_doce)
    return db_doce

def deletar_doce(db: Session, doce_id: int):
    db_doce = db.query(Doce).filter(Doce.id == doce_id).first()
    if db_doce is None:
        return None
    db.delete(db_doce)
    db.commit()
    return db_doce

def substituir_doce(db: Session, doce_id: int, doce: DoceCreate):
    db_doce = db.query(Doce).filter(Doce.id == doce_id).first()
    if db_doce is None:
        return None
    db_doce.nome = doce.nome
    db_doce.preco = doce.preco
    db_doce.quantidade = doce.quantidade
    db.commit()
    db.refresh(db_doce)
    return db_doce