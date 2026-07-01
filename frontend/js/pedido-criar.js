protegerPagina("admin");
mostrarUsuario();

const listaProdutos = document.getElementById("lista-produtos");
const valorTotal = document.getElementById("valorTotal");
const mensagem = document.getElementById("mensagem");
const formPedido = document.getElementById("formPedido");
const btnSalvar = document.getElementById("btnSalvar");
const inputData = document.getElementById("data");

inputData.value = new Date().toISOString().split("T")[0];

let inputsQuantidade = [];

function formatarPreco(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

async function carregarProdutos() {

    listaProdutos.innerHTML = `
        <div class="alert alert-info">
            Carregando produtos...
        </div>
    `;

    const resposta = await api.get("/doces/");

    if (!resposta.ok) {

        listaProdutos.innerHTML = `
            <div class="alert alert-danger">
                Não foi possível carregar os doces.
            </div>
        `;

        return;

    }

    const produtos = resposta.data;

    if (!produtos.length) {

        listaProdutos.innerHTML = `
            <div class="alert alert-warning">
                Nenhum doce cadastrado.
            </div>
        `;

        return;

    }

    listaProdutos.innerHTML = "";

    produtos.forEach(produto => {

        listaProdutos.innerHTML += `

        <div class="produto-item mb-3 p-3 rounded">

            <div class="row align-items-center">

                <div class="col-md-7">

                    <strong>${produto.nome}</strong>

                    <div class="text-muted small">

                        ID: ${produto.id}
                        <br>

                        ${formatarPreco(produto.preco)}

                        <br>

                        Estoque: ${produto.quantidade}

                    </div>

                </div>

                <div class="col-md-5 mt-2 mt-md-0">

                    <label class="form-label">

                        Quantidade

                    </label>

                    <input
                        type="number"
                        class="form-control quantidade-produto"
                        value="0"
                        min="0"
                        max="${produto.quantidade}"
                        data-id="${produto.id}"
                        data-preco="${produto.preco}">

                </div>

            </div>

        </div>

        `;

    });

    configurarInputs();

}

function configurarInputs() {

    inputsQuantidade = document.querySelectorAll(".quantidade-produto");

    inputsQuantidade.forEach(input => {

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

function calcularTotal() {

    let total = 0;

    inputsQuantidade.forEach(input => {

        total +=
            Number(input.value) *
            Number(input.dataset.preco);

    });

    valorTotal.textContent =
        formatarPreco(total);

}

formPedido.addEventListener("submit", async (e) => {

    e.preventDefault();

    mensagem.innerHTML = "";

    const cliente =
        document.getElementById("cliente").value.trim();

    const data =
        document.getElementById("data").value;

    const itens = [];

    inputsQuantidade.forEach(input => {

        if (Number(input.value) > 0) {

            itens.push({

                doce_id: Number(input.dataset.id),

                quantidade: Number(input.value)

            });

        }

    });

    if (!itens.length) {

        mostrarToast(
            "Selecione pelo menos um doce.",
            "erro"
        );

        return;

    }

    btnSalvar.disabled = true;

    btnSalvar.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Salvando...
    `;

    const resposta = await api.post("/pedidos/", {

        cliente,
        data,
        itens

    });

    btnSalvar.disabled = false;

    btnSalvar.innerHTML = "Salvar Pedido";

    if (!resposta.ok) {

        mostrarToast(
            resposta.data?.detail || "Erro ao salvar pedido.",
            "erro"
        );

        return;

    }

    mostrarToast(
        "Pedido cadastrado com sucesso!",
        "sucesso"
    );

    setTimeout(() => {

        window.location.href = "index.html";

    }, 1200);

});

carregarProdutos();