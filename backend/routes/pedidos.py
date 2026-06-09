from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException

from database import get_db
from models import Pedido, Doce, ItemPedido
from schemas import PedidoPaginadoResponse, PedidoResponse, PedidoCreate, PedidoUpdate
from fastapi import APIRouter
import math
from auth import verificar_token

router = APIRouter(
    prefix="/pedidos",
    tags=["Pedidos"]
)

#//get e get por id pedido
@router.get("/", response_model=PedidoPaginadoResponse)
def listar_pedidos(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):

    skip = (page - 1) * limit

    pedidos = (
        db.query(Pedido)
        .offset(skip)
        .limit(limit)
        .all()
    )

    total = db.query(Pedido).count()

    return {
        "data": pedidos,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": math.ceil(total / limit)
    }
@router.get("/{pedido_id}", response_model=PedidoResponse)
def listar_pedido_id(
    pedido_id: int,
    db: Session = Depends(get_db)
):

    pedido = db.query(Pedido).filter(
        Pedido.id == pedido_id
    ).first()
    if pedido is None:
        raise HTTPException(
            status_code=404,
            detail="pedido não encontrado"
        )
    return pedido


#//restante das operações para pedidos
@router.post("/", response_model=PedidoResponse)
def criar_pedido(
    pedido: PedidoCreate,
    db: Session = Depends(get_db),
    usuario: str = Depends(verificar_token)
):

    valor_total = 0

    novo_pedido = Pedido(
        cliente=pedido.cliente,
        data=pedido.data,
        valor_total=0
    )

    db.add(novo_pedido)

    db.commit()
    db.refresh(novo_pedido)

    for item in pedido.itens:

        doce = db.query(Doce).filter(
            Doce.id == item.doce_id
        ).first()

        if doce is None:
            raise HTTPException(
                status_code=404,
                detail="Doce não encontrado"
            )

        if doce.quantidade < item.quantidade:
            raise HTTPException(
                status_code=400,
                detail=f"Estoque insuficiente para {doce.nome}"
            )

        subtotal = doce.preco * item.quantidade

        valor_total += subtotal

        doce.quantidade -= item.quantidade

        item_pedido = ItemPedido(
            pedido_id=novo_pedido.id,
            doce_id=item.doce_id,
            quantidade=item.quantidade
        )

        db.add(item_pedido)

    novo_pedido.valor_total = valor_total

    db.commit()

    db.refresh(novo_pedido)

    return novo_pedido


@router.delete("/{pedido_id}")
def deletar_pedido(
    pedido_id: int,
    db: Session = Depends(get_db)
):

    pedido = db.query(Pedido).filter(
        Pedido.id == pedido_id
    ).first()

    if not pedido:
        raise HTTPException(
            status_code=404,
            detail="Pedido não encontrado"
        )

    db.delete(pedido)

    db.commit()

    return {
        "mensagem": f"Pedido {pedido_id} deletado"
    }

@router.patch("/{pedido_id}")
def atualizar_pedido(
    pedido_id: int,
    pedido: PedidoUpdate,
    db: Session = Depends(get_db)
):

    pedido_db = db.query(Pedido).filter(
        Pedido.id == pedido_id
    ).first()

    if pedido_db is None:
        raise HTTPException(
            status_code=404,
            detail="Pedido não encontrado"
        )

    if pedido.cliente is not None:
        pedido_db.cliente = pedido.cliente

    if pedido.data is not None:
        pedido_db.data = pedido.data

    if pedido.itens is not None:

        db.query(ItemPedido).filter(
            ItemPedido.pedido_id == pedido_id
        ).delete(synchronize_session=False)

        for item in pedido.itens:

            novo_item = ItemPedido(
                pedido_id=pedido_id,
                doce_id=item.doce_id,
                quantidade=item.quantidade
            )

            db.add(novo_item)

    db.commit()
    db.refresh(pedido_db)

    return pedido_db

@router.put("/{pedido_id}/substituir")
def substituir_pedido(pedido_id: int, pedido: PedidoCreate, db: Session = Depends(get_db)):
    pedido_db = db.query(Pedido).filter(
        Pedido.id == pedido_id
    ).first()

    if not pedido_db:
        raise HTTPException(
            status_code=404,
            detail="Pedido não encontrado"
        )

    # Atualiza os campos do pedido
    pedido_db.cliente = pedido.cliente
    pedido_db.data = pedido.data

    # Remove os itens antigos
    db.query(ItemPedido).filter(ItemPedido.pedido_id == pedido_id).delete(synchronize_session=False)

    # Adiciona os novos itens
    for item in pedido.itens:
        novo_item = ItemPedido(
            pedido_id=pedido_id,
            doce_id=item.doce_id,
            quantidade=item.quantidade
        )
        db.add(novo_item)

    db.commit()
    db.refresh(pedido_db)

    return pedido_db

