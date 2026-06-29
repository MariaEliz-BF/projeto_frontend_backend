from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr

from fastapi_mail import ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME="mariaeliz.farias@upe.br",
    MAIL_PASSWORD="1234babY@#",
    MAIL_FROM="mariaeliz.farias@upe.br",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)

async def enviar_email(nome: str, email: EmailStr):

    mensagem = MessageSchema(
        subject="Cadastro realizado com sucesso!",
        recipients=[email],
        body=f"""
Olá, {nome}!

Seu cadastro foi realizado com sucesso.

Agora você já pode fazer login utilizando seu e-mail e senha.

atenciosamente, doceria.
""",
        subtype="plain"
    )

    fm = FastMail(conf)
    await fm.send_message(mensagem)