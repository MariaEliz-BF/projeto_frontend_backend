from fastapi import FastAPI
from database import engine
from models import Base, Doce, Pedido
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi import Depends

from schemas import DoceCreate, DoceResponse, PedidoCreate, PedidoResponse

from database import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI(title="API de Doces")

Base.metadata.create_all(bind=engine)
#//buscar e buscar por id
@app.get("/doces", response_model=list[DoceResponse])
def listar_doces(db: Session = Depends(get_db)):
    return db.query(Doce).all()

@app.get("/doces/{doce_id}",response_model=DoceResponse)
def listar_doces_id(doce_id: int, db: Session = Depends(get_db)):
    return db.query(Doce).filter(Doce.id == doce_id).first()
#//restante operações para doces

@app.post("/doces", response_model=DoceResponse)
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

@app.patch("/doces/{doce_id}", response_model=DoceResponse)
def atualizar_doce(doce_id: int, doce: DoceCreate, db: Session = Depends(get_db)):
    doce_atualizado = db.query(Doce).filter(Doce.id == doce_id).first()
    if doce_atualizado:
        doce_atualizado.nome = doce.nome
        doce_atualizado.preco = doce.preco
        doce_atualizado.quantidade = doce.quantidade
        db.commit()
        db.refresh(doce_atualizado)
    return doce_atualizado

@app.delete("/doces/{doce_id}")
def deletar_doce(doce_id: int, db: Session = Depends(get_db)):
    doce_a_deletar = db.query(Doce).filter(Doce.id == doce_id).first()
    if doce_a_deletar:
        db.delete(doce_a_deletar)
        db.commit()
    return {"mensagem": f"Doce {doce_id} deletado"}

@app.put("/doces/{doce_id}/substituir", response_model=DoceResponse)
def substituir_doce(doce_id: int, doce: DoceCreate, db: Session = Depends(get_db)):
    doce_a_substituir = db.query(Doce).filter(Doce.id == doce_id).first()
    if doce_a_substituir:
        doce_a_substituir.nome = doce.nome
        doce_a_substituir.preco = doce.preco
        doce_a_substituir.quantidade = doce.quantidade
        db.commit()
        db.refresh(doce_a_substituir)
    return doce_a_substituir
#//get e get por id pedido
@app.get("/pedidos", response_model=list[PedidoResponse])
def listar_pedidos(db: Session = Depends(get_db)):
    return db.query(Pedido).all()

@app.get("/pedidos/{pedido_id}", response_model=PedidoResponse)
def listar_Pedido_Id(pedido_id: int, db: Session = Depends(get_db)):
    return db.query(Pedido).filter(Pedido.id == pedido_id).first()

#//restante das operações para pedidos
@app.post("/pedidos", response_model=PedidoResponse)
def criar_pedido(pedido: PedidoCreate, db: Session = Depends(get_db)):
    novo_pedido = Pedido(
        cliente=pedido.cliente,
        valor_total=pedido.valor_total,
        data=pedido.data
    )
    db.add(novo_pedido)
    db.commit()
    db.refresh(novo_pedido)
    return novo_pedido



@app.delete("/pedidos/{pedido_id}")
def deletar_pedido(pedido_id: int, db: Session = Depends(get_db)):
    pedido_a_deletar = db.query(Pedido).filter(Pedido.id == pedido_id).first()
    if pedido_a_deletar:
        db.delete(pedido_a_deletar)
        db.commit()
    return {"mensagem": f"Pedido {pedido_id} deletado"}

@app.patch("/pedidos/{pedido_id}")
def atualizar_pedido(pedido_id: int, pedido: PedidoCreate, db: Session = Depends(get_db)):
    pedido_atualizado = db.query(Pedido).filter(Pedido.id == pedido_id).first()
    if pedido_atualizado:
        pedido_atualizado.cliente = pedido.cliente
        pedido_atualizado.data = pedido.data
        db.commit()
        db.refresh(pedido_atualizado)
    return pedido_atualizado

@app.put("/pedidos/{pedido_id}/substituir", response_model=PedidoResponse)
def substituir_pedido(pedido_id: int, pedido: PedidoCreate, db: Session = Depends(get_db)):
    pedido_a_substituir = db.query(Pedido).filter(Pedido.id == pedido_id).first()
    if pedido_a_substituir:
        pedido_a_substituir.cliente = pedido.cliente
        pedido_a_substituir.data = pedido.data
        db.commit()
        db.refresh(pedido_a_substituir)
    return pedido_a_substituir



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)