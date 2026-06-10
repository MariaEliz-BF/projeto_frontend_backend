from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
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
    itens = relationship(
    "ItemPedido",
    back_populates="pedido"
)

class ItemPedido(Base):
    __tablename__ = "itens_pedido"

    id = Column(Integer, primary_key=True, index=True)

    pedido_id = Column(Integer, ForeignKey("pedidos.id"))
    doce_id = Column(Integer, ForeignKey("doces.id"))

    quantidade = Column(Integer)

    pedido = relationship("Pedido")
    doce = relationship("Doce")
    pedido = relationship("Pedido", back_populates="itens")

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    senha = Column(String)