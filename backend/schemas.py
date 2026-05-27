from pydantic import BaseModel


# ---------------- DOCES ----------------

class DoceBase(BaseModel):
    nome: str
    preco: float
    quantidade: int


class DoceCreate(DoceBase):
    pass


class DoceResponse(DoceBase):
    id: int

    class Config:
        from_attributes = True


# ---------------- ITENS DO PEDIDO ----------------

class ItemPedidoCreate(BaseModel):
    doce_id: int
    quantidade: int


# ---------------- PEDIDOS ----------------

class PedidoBase(BaseModel):
    cliente: str
    data: str
    itens: list[ItemPedidoCreate]


class PedidoCreate(PedidoBase):
    pass


class PedidoResponse(BaseModel):
    id: int
    cliente: str
    data: str
    valor_total: float

    class Config:
        from_attributes = True