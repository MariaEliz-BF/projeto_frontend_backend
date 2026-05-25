from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Pedido
from schemas import PedidoCreate, PedidoResponse

router = APIRouter(
    prefix="/pedidos",
    tags=["Pedidos"]
)

#//get e get por id pedido
@router.get("/", response_model=list[PedidoResponse])
def listar_pedidos():
    return {"pedidos": "Lista de pedidos"}

@router.get("/{pedido_id}", response_model=PedidoResponse)
def listar_Pedido_Id(pedido_id: int):
    return {"pedido": f"Detalhes do pedido {pedido_id}"}

#//restante das operações para pedidos
@router.post("/", response_model=PedidoResponse)
def criar_pedido(pedido: PedidoCreate):
    return {"mensagem": "Pedido criado"}



@router.delete("/{pedido_id}")
def deletar_pedido(pedido_id: int):
    return {"mensagem": f"Pedido {pedido_id} deletado"}

@router.patch("/{pedido_id}")
def atualizar_pedido(pedido_id: int):
    return {"mensagem": f"Pedido {pedido_id} atualizado"}

@router.put("/{pedido_id}/substituir", response_model=PedidoResponse)
def substituir_pedido(pedido_id: int, pedido: PedidoCreate):
    return {"mensagem": f"Pedido {pedido_id} substituído"}

