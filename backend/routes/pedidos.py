from sqlalchemy.orm import Session
from fastapi import Depends

from database import get_db
from models import Pedido
from schemas import PedidoResponse, PedidoCreate
from fastapi import APIRouter
from models import Doce

router = APIRouter(
    prefix="/pedidos",
    tags=["Pedidos"]
)

#//get e get por id pedido
@router.get("/", response_model=list[PedidoResponse])
def listar_pedidos(db: Session = Depends(get_db)):

    pedidos = db.query(Pedido).all()

    return pedidos
@router.get("/{pedido_id}", response_model=PedidoResponse)
def listar_pedido_id(
    pedido_id: int,
    db: Session = Depends(get_db)
):

    pedido = db.query(Pedido).filter(
        Pedido.id == pedido_id
    ).first()

    return pedido

#//restante das operações para pedidos
@router.post("/", response_model=PedidoResponse)
def criar_pedido(pedido: PedidoCreate, db: Session = Depends(get_db)):

    valor_total = 0

    for item in pedido.itens:

        doce = db.query(Doce).filter(
            Doce.id == item.doce_id
        ).first()

        subtotal = doce.preco * item.quantidade

        valor_total += subtotal

        doce.quantidade -= item.quantidade

    novo_pedido = Pedido(
        cliente=pedido.cliente,
        data=pedido.data,
        valor_total=valor_total
    )

    db.add(novo_pedido)

    db.commit()
    db.refresh(novo_pedido)

    return novo_pedido


@router.delete("/{pedido_id}")
def deletar_pedido(pedido_id: int):
    return {"mensagem": f"Pedido {pedido_id} deletado"}

@router.patch("/{pedido_id}")
def atualizar_pedido(pedido_id: int):
    return {"mensagem": f"Pedido {pedido_id} atualizado"}

@router.put("/{pedido_id}/substituir")
def substituir_pedido(pedido_id: int, pedido: PedidoCreate):
    return {"mensagem": f"Pedido {pedido_id} substituído"}

