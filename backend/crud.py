from sqlalchemy.orm import Session
from models import Doce, Pedido
from schemas import TarefaCreate, TarefaUpdate
#//funções para doces
def criar_doce(db: Session, doce: DoceCreate):
    db_doce = Doce(nome=doce.nome, preco=doce.preco, quantidade=doce.quantidade)
    db.add(db_doce)
    db.commit()
    db.refresh(db_doce)
    return db_doce

def listar_doces_id(db: Session, skip: int = 0, limit: int = 100):
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

#//funções para pedidos
def criar_pedido(db: Session, pedido: PedidoCreate):
    db_pedido = Pedido(cliente=pedido.cliente, valor_total=pedido.valor_total, data=pedido.data)
    db.add(db_pedido)
    db.commit()
    db.refresh(db_pedido)
    return db_pedido

def listar_Pedido_Id(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Pedido).offset(skip).limit(limit).all()

def listar_pedidos(db: Session):
    return db.query(Pedido).all()

def atualizar_pedido(db: Session, pedido_id: int, pedido: PedidoUpdate):
    db_pedido = db.query(Pedido).filter(Pedido.id == pedido_id).first()
    if db_pedido is None:
        return None
    db_pedido.cliente = pedido.cliente
    db_pedido.valor_total = pedido.valor_total
    db_pedido.data = pedido.data
    db.commit()
    db.refresh(db_pedido)
    return db_pedido

def deletar_pedido(db: Session, pedido_id: int):
    db_pedido = db.query(Pedido).filter(Pedido.id == pedido_id).first()
    if db_pedido is None:
        return None
    db.delete(db_pedido)
    db.commit()
    return db_pedido

def substituir_pedido(db: Session, pedido_id: int, pedido: PedidoCreate):   
    db_pedido = db.query(Pedido).filter(Pedido.id == pedido_id).first()
    if db_pedido is None:
        return None
    db_pedido.cliente = pedido.cliente
    db_pedido.valor_total = pedido.valor_total
    db_pedido.data = pedido.data
    db.commit()
    db.refresh(db_pedido)
    return db_pedido

