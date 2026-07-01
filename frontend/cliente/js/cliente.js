let doces = [];
let carrinho = {};

document.addEventListener("DOMContentLoaded", () => {
    initCardapio();
});

async function initCardapio() {
    await carregarDoces();

    const data = document.getElementById("data");
    if (data) {
        data.value = new Date().toISOString().split("T")[0];
    }
}

/**
 * CARREGA DOCES DO BACKEND
 */
async function carregarDoces() {

    console.log("🔄 carregando doces...");

    const resposta = await api.get("/doces/");

    console.log("📦 resposta doces:", resposta);

    if (!resposta.ok) {
        console.error("Erro backend:", resposta);
        mostrarToast("Erro ao carregar doces", "erro");
        return;
    }

    const container = document.getElementById("lista-doces");

    if (!container) {
        console.error("Container lista-doces não existe");
        return;
    }

    const doces = resposta.data;

    container.innerHTML = "";

    doces.forEach(d => {

        container.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card p-3">
                    <h5>${d.nome}</h5>
                    <p>R$ ${Number(d.preco).toFixed(2)}</p>

                    <input type="number"
                        min="0"
                        value="0"
                        class="form-control"
                        onchange="atualizarCarrinho(${d.id}, this.value)">
                </div>
            </div>
        `;
    });

    console.log("✅ doces renderizados");
}

/**
 * ATUALIZA CARRINHO
 */
function atualizarCarrinho(id, qtd) {

    qtd = Number(qtd);

    if (qtd <= 0) {
        delete carrinho[id];
    } else {
        carrinho[id] = qtd;
    }

    calcularTotal();
}

/**
 * CALCULA TOTAL
 */
function calcularTotal() {

    let total = 0;

    for (let id in carrinho) {

        const doce = doces.find(d => d.id == id);

        if (doce) {
            total += doce.preco * carrinho[id];
        }
    }

    const el = document.getElementById("total");

    if (el) {
        el.innerText = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }
}

/**
 * ENVIAR PEDIDO PARA BACKEND
 */
async function enviarPedido() {

    const cliente = document.getElementById("cliente")?.value?.trim();
    const data = document.getElementById("data")?.value;

    if (!cliente) {
        mostrarToast("Informe o nome do cliente", "erro");
        return;
    }

    const itens = Object.keys(carrinho).map(id => ({
        doce_id: Number(id),
        quantidade: carrinho[id]
    }));

    if (itens.length === 0) {
        mostrarToast("Adicione pelo menos 1 doce", "erro");
        return;
    }

    const resposta = await api.post("/pedidos/", {
        cliente,
        data,
        itens
    });

    if (!resposta.ok) {
        mostrarToast(
            resposta.data?.detail || "Erro ao enviar pedido",
            "erro"
        );
        return;
    }

    mostrarToast("Pedido enviado com sucesso!", "sucesso");

    // reset estado
    carrinho = {};
    await carregarDoces();

    const total = document.getElementById("total");
    if (total) total.innerText = "R$ 0,00";
}

/**
 * SAIR
 */
function sair() {
    localStorage.clear();
    window.location.href = "../login.html";
}