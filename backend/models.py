from sqlalchemy import Column, Integer, String, Float
from database import Base

class Doce(Base):
    __tablename__ = "doces"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    preco = Column(Float)
    quantidade = Column(Integer)

class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True, index=True)
    cliente = Column(String)
    valor_total = Column(Float)
    data = Column(String)