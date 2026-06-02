from pydantic import BaseModel
from typing import Optional

#  DOCES 
class DoceBase(BaseModel):
    nome: str
    preco: float
    quantidade: int

class DoceUpdate(BaseModel):
    nome: Optional[str] = None
    preco: Optional[float] = None
    quantidade: Optional[int] = None

class DoceCreate(DoceBase):
    pass


class DoceResponse(DoceBase):
    id: int

    class Config:
        from_attributes = True


#  ITENS DO PEDIDO 
class ItemPedidoCreate(BaseModel):
    doce_id: int
    quantidade: int


# PEDIDOS 

class PedidoBase(BaseModel):
    cliente: str
    data: str
    itens: list[ItemPedidoCreate]


class PedidoCreate(PedidoBase):
    pass

class DocePedidoResponse(BaseModel):
    id: int
    nome: str
    preco: float

    class Config:
        from_attributes = True
class ItemPedidoResponse(BaseModel):
    quantidade: int
    doce: DocePedidoResponse

    class Config:
        from_attributes = True
class PedidoResponse(BaseModel):
    id: int
    cliente: str
    data: str
    valor_total: float
    itens: list[ItemPedidoResponse]

    class Config:
        from_attributes = True

class PedidoUpdate(BaseModel):
    cliente: Optional[str] = None
    data: Optional[str] = None
    itens: Optional[list[ItemPedidoCreate]] = None

