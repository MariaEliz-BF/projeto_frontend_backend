from fastapi import FastAPI
from database import engine
from models import Base, Doce
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
def listar_doces(): 
    return {"doces": "Lista de doces"}

@app.get("/doces/{doce_id}",response_model=DoceResponse)
def listar_doces_id(doce_id: int):
    return {"doce": f"Detalhes do doce {doce_id}"}
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
def atualizar_doce(doce_id: int, doce: DoceCreate):
    return {"mensagem": f"Doce {doce_id} atualizado"}   

@app.delete("/doces/{doce_id}")
def deletar_doce(doce_id: int):
    return {"mensagem": f"Doce {doce_id} deletado"}

@app.put("/doces/{doce_id}/substituir", response_model=DoceResponse)
def substituir_doce(doce_id: int, doce: DoceCreate):
    return {"mensagem": f"Doce {doce_id} substituído"}
#//get e get por id pedido
@app.get("/pedidos", response_model=list[PedidoResponse])
def listar_pedidos():
    return {"pedidos": "Lista de pedidos"}

@app.get("/pedidos/{pedido_id}", response_model=PedidoResponse)
def listar_Pedido_Id(pedido_id: int):
    return {"pedido": f"Detalhes do pedido {pedido_id}"}

#//restante das operações para pedidos
@app.post("/pedidos", response_model=PedidoResponse)
def criar_pedido(pedido: PedidoCreate):
    return {"mensagem": "Pedido criado"}



@app.delete("/pedidos/{pedido_id}")
def deletar_pedido(pedido_id: int):
    return {"mensagem": f"Pedido {pedido_id} deletado"}

@app.patch("/pedidos/{pedido_id}")
def atualizar_pedido(pedido_id: int):
    return {"mensagem": f"Pedido {pedido_id} atualizado"}

@app.put("/pedidos/{pedido_id}/substituir", response_model=PedidoResponse)
def substituir_pedido(pedido_id: int, pedido: PedidoCreate):
    return {"mensagem": f"Pedido {pedido_id} substituído"}



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)