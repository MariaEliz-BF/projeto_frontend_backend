protegerPagina();
mostrarUsuario();

const params = new URLSearchParams(window.location.search);
const pedidoId = params.get("id");

const form = document.getElementById("formPedido");
const clienteInput = document.getElementById("cliente");
const dataInput = document.getElementById("data");
const listaProdutos = document.getElementById("lista-produtos");
const valorTotal = document.getElementById("valorTotal");
const mensagem = document.getElementById("mensagem");

let produtos = [];
let pedido = null;

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function calcularTotal() {

    let total = 0;

    document.querySelectorAll(".quantidade-produto").forEach(input => {

        const qtd = Number(input.value);
        const preco = Number(input.dataset.preco);

        total += qtd * preco;

    });

    valorTotal.textContent = formatarPreco(total);

}

async function carregarPedido() {

    const resposta = await api.get(`/pedidos/${pedidoId}`);

    if (!resposta.ok) {

        mostrarToast("Pedido não encontrado.", "erro");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

        return;

    }

    pedido = resposta.data;

    clienteInput.value = pedido.cliente;
    dataInput.value = pedido.data;

}

async function carregarProdutos() {

    const resposta = await api.get("/doces/");

    if (!resposta.ok) {

        listaProdutos.innerHTML = `
            <div class="alert alert-danger">
                Erro ao carregar produtos.
            </div>
        `;

        return;

    }

    produtos = resposta.data;

    renderizarProdutos();

}

function renderizarProdutos() {

    listaProdutos.innerHTML = "";

    produtos.forEach(produto => {

        const itemPedido = pedido.itens.find(
            item => item.doce.id === produto.id
        );

        const quantidade = itemPedido ? itemPedido.quantidade : 0;

        listaProdutos.innerHTML += `
            <div class="produto-item mb-3 p-3 rounded">

                <div class="row align-items-center">

                    <div class="col-md-7">

                        <strong>${produto.nome}</strong>

                        <div class="text-muted small">

                            ID: ${produto.id}
                            |
                            ${formatarPreco(produto.preco)}
                            |
                            Estoque: ${produto.quantidade}

                        </div>

                    </div>

                    <div class="col-md-5">

                        <label class="form-label small">
                            Quantidade
                        </label>

                        <input
                            type="number"
                            class="form-control quantidade-produto"
                            min="0"
                            max="${produto.quantidade + quantidade}"
                            value="${quantidade}"
                            data-id="${produto.id}"
                            data-preco="${produto.preco}"
                        >

                    </div>

                </div>

            </div>
        `;

    });

    document.querySelectorAll(".quantidade-produto").forEach(input => {

        input.addEventListener("input", () => {

            if (Number(input.value) < 0)
                input.value = 0;

            if (Number(input.value) > Number(input.max))
                input.value = input.max;

            calcularTotal();

        });

    });

    calcularTotal();

}
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    mensagem.innerHTML = "";

    const itens = [];

    document.querySelectorAll(".quantidade-produto").forEach(input => {

        const quantidade = Number(input.value);

        if (quantidade > 0) {

            itens.push({
                doce_id: Number(input.dataset.id),
                quantidade
            });

        }

    });

    if (itens.length === 0) {

        mostrarToast(
            "Adicione pelo menos um doce ao pedido.",
            "erro"
        );

        return;

    }

    const dados = {
        cliente: clienteInput.value.trim(),
        data: dataInput.value,
        itens
    };

    const botao = form.querySelector("button[type='submit']");

    const textoOriginal = botao.innerHTML;

    botao.disabled = true;

    botao.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Salvando...
    `;

    try {

        const resposta = await api.request(
            `/pedidos/${pedidoId}/substituir`,
            {
                method: "PUT",
                body: JSON.stringify(dados)
            }
        );

        if (!resposta.ok) {

            mostrarToast(
                resposta.data?.detail ||
                "Erro ao atualizar pedido.",
                "erro"
            );

            return;

        }

        mostrarToast(
            "Pedido atualizado com sucesso!",
            "sucesso"
        );

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1200);

    } finally {

        botao.disabled = false;
        botao.innerHTML = textoOriginal;

    }

});

document.addEventListener("DOMContentLoaded", async () => {

    if (!pedidoId) {

        mostrarToast(
            "Pedido inválido.",
            "erro"
        );

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1000);

        return;

    }

    await carregarPedido();

    if (!pedido)
        return;

    await carregarProdutos();

});