from fastapi import FastAPI

from routes import doces, pedidos

app = FastAPI()

app.include_router(doces.router)
app.include_router(pedidos.router)