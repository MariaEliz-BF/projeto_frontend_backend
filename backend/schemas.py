from pydantic import BaseModel

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


class PedidoBase(BaseModel):
    cliente: str
    valor_total: float
    data: str

class PedidoCreate(PedidoBase):
    pass

class PedidoResponse(PedidoBase):
    id: int

    class Config:
        from_attributes = True
