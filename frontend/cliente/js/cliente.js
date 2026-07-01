const API = "http://127.0.0.1:8000"

let doces = []
let carrinho = {}

function initCardapio() {
    carregarDoces()
    document.getElementById("data").value = new Date().toISOString().split("T")[0]
}

async function carregarDoces() {
    const res = await fetch(`${API}/doces/`)
    doces = await res.json()

    const container = document.getElementById("lista-doces")
    container.innerHTML = ""

    doces.forEach(d => {
        container.innerHTML += `
        <div class="col-md-4">
            <div class="card p-3">
                <h5>${d.nome}</h5>
                <p>R$ ${d.preco}</p>

                <input type="number"
                    min="0"
                    value="0"
                    class="form-control"
                    onchange="atualizarCarrinho(${d.id}, this.value)">
            </div>
        </div>
        `
    })
}

function atualizarCarrinho(id, qtd) {
    qtd = Number(qtd)

    if (qtd <= 0) {
        delete carrinho[id]
    } else {
        carrinho[id] = qtd
    }

    calcularTotal()
}

function calcularTotal() {
    let total = 0

    for (let id in carrinho) {
        const doce = doces.find(d => d.id == id)
        total += doce.preco * carrinho[id]
    }

    document.getElementById("total").innerText =
        total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

async function enviarPedido() {

    const cliente = document.getElementById("cliente").value
    const contato = document.getElementById("contato").value
    const endereco = document.getElementById("endereco").value
    const data = document.getElementById("data").value

    const itens = Object.keys(carrinho).map(id => ({
        doce_id: Number(id),
        quantidade: carrinho[id]
    }))

    if (itens.length === 0) {
        alert("Adicione itens ao pedido")
        return
    }

    const token = localStorage.getItem("token")

    const res = await fetch(`${API}/pedidos/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            cliente,
            data,
            itens
        })
    })

    const msg = document.getElementById("msg")

    if (res.ok) {
        msg.innerHTML = `<div class="alert alert-success">Pedido enviado com sucesso!</div>`
        carrinho = {}
        carregarDoces()
    } else {
        msg.innerHTML = `<div class="alert alert-danger">Erro ao enviar pedido</div>`
    }
}

function sair() {
    localStorage.clear()
    window.location.href = "../login.html"
}