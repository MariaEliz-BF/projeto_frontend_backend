console.log("pedidos.js carregado");

let paginaAtual = 1;
const limite = 10;
let totalPaginas = 1;

const tabela = document.getElementById("tabela-pedidos");
const mensagem = document.getElementById("mensagem");
const campoBusca = document.getElementById("campoBusca");
const infoPagina = document.getElementById("infoPagina");
const btnBuscar = document.getElementById("btnBuscar");

function formatarData(data) {

    if (!data) return "";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;

}

function formatarPreco(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

async function carregarPedidos(page = 1) {

    mensagem.innerHTML = "";

    const resposta = await api.get(`/pedidos?page=${page}&limit=${limite}`);

    if (!resposta.ok) {

        mensagem.innerHTML = `
            <div class="alert alert-danger">
                Erro ao carregar pedidos.
            </div>
        `;

        return;

    }

    paginaAtual = resposta.data.page;
    totalPaginas = resposta.data.pages;

    renderizarPedidos(resposta.data.data);

    atualizarPaginacao();

}

function renderizarPedidos(pedidos) {

    tabela.innerHTML = "";

    if (!pedidos.length) {

        tabela.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    Nenhum pedido encontrado.
                </td>
            </tr>
        `;

        return;

    }

    pedidos.forEach(pedido => {

        const itens = pedido.itens.length
            ? pedido.itens
                .map(item => `${item.quantidade}x ${item.doce.nome}`)
                .join("<br>")
            : "Sem itens";

        tabela.innerHTML += `
            <tr>

                <td>${pedido.id}</td>

                <td>${pedido.cliente}</td>

                <td>${formatarData(pedido.data)}</td>

                <td>${itens}</td>

                <td>${formatarPreco(pedido.valor_total)}</td>

                <td>

                    <a href="editar.html?id=${pedido.id}"
                       class="btn btn-sm btn-editar">

                        Editar

                    </a>

                    <button
                        class="btn btn-sm btn-excluir"
                        onclick="excluirPedido(${pedido.id})">

                        Excluir

                    </button>

                </td>

            </tr>
        `;

    });

}

function atualizarPaginacao() {

    infoPagina.textContent =
        `Página ${paginaAtual} de ${totalPaginas}`;

}

function paginaAnterior() {

    if (paginaAtual > 1) {

        carregarPedidos(paginaAtual - 1);

    }

}

function proximaPagina() {

    if (paginaAtual < totalPaginas) {

        carregarPedidos(paginaAtual + 1);

    }

}

async function buscarPedidoPorId() {

    mensagem.innerHTML = "";

    const termo = campoBusca.value.trim().toLowerCase();

    if (!termo) {

        carregarPedidos(1);
        return;

    }

    // Busca por ID
    if (!isNaN(termo)) {

        const resposta = await api.get(`/pedidos/${termo}`);

        if (!resposta.ok) {

            mensagem.innerHTML = `
                <div class="alert alert-warning">
                    Pedido não encontrado.
                </div>
            `;

            return;

        }

        renderizarPedidos([resposta.data]);

        infoPagina.textContent = "Resultado da busca";

        return;

    }

    // Busca por nome do cliente
    const resposta = await api.get(`/pedidos?page=1&limit=1000`);

    if (!resposta.ok) {

        mensagem.innerHTML = `
            <div class="alert alert-danger">
                Erro ao buscar pedidos.
            </div>
        `;

        return;

    }

    const pedidos = resposta.data.data.filter(pedido =>
        pedido.cliente.toLowerCase().includes(termo)
    );

    if (pedidos.length === 0) {

        mensagem.innerHTML = `
            <div class="alert alert-warning">
                Nenhum pedido encontrado.
            </div>
        `;

        return;

    }

    renderizarPedidos(pedidos);

    infoPagina.textContent = `Resultado da busca`;

}

async function excluirPedido(id) {

    confirmarAcao(

        "Excluir pedido",

        `Deseja realmente excluir o pedido #${id}?`,

        async () => {

            const resposta = await api.delete(`/pedidos/${id}`);

            if (!resposta.ok) {

                mostrarToast(
                    resposta.data?.detail || "Erro ao excluir pedido.",
                    "erro"
                );

                return;

            }

            mostrarToast(
                "Pedido excluído com sucesso!",
                "sucesso"
            );

            carregarPedidos(paginaAtual);

        },

        "Excluir"

    );

}

document.addEventListener("DOMContentLoaded", () => {

    protegerPagina("admin");

    mostrarUsuario();

    carregarPedidos();

    btnBuscar.addEventListener(
        "click",
        buscarPedidoPorId
    );

    campoBusca.addEventListener(
        "keydown",
        (e) => {

            if (e.key === "Enter") {

                buscarPedidoPorId();

            }

        }
    );

});