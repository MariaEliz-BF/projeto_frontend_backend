from fastapi import FastAPI
from database import Base, engine
from routes import doces, pedidos 

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(doces.router)
app.include_router(pedidos.router)
