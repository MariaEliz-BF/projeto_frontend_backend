// ==========================================
// DOCES.JS
// Módulo responsável pelo CRUD de doces
// ==========================================

let tabela;
let campoBusca;
let formCriar;
let formEditar;

document.addEventListener("DOMContentLoaded", () => {

    protegerPagina();

    inicializarComponentes();

    mostrarUsuario();

    identificarPagina();

});


// ==========================================
// INICIALIZAÇÃO
// ==========================================

function inicializarComponentes() {
    tabela = document.getElementById("tabela-doces");
    campoBusca = document.getElementById("campoBusca");
    formCriar = document.getElementById("formDoce"); 
    formEditar = document.getElementById("formDoce");
}


// ==========================================
// IDENTIFICA QUAL PÁGINA ESTÁ ABERTA
// ==========================================

function identificarPagina() {

    if (tabela) {

        iniciarListagem();

    }

    if (formCriar) {

        iniciarCadastro();

    }

    if (formEditar) {

        iniciarEdicao();

    }

}


// ==========================================
// EXIBE USUÁRIO
// ==========================================

function mostrarUsuario() {

    const span = document.getElementById("usuarioLogado");

    if (!span) return;

    const usuario = obterUsuario();

    span.textContent = usuario
        ? `Bem-vindo(a), ${usuario}`
        : "Usuário";

}



// ==========================================
// LISTAGEM
// ==========================================

function iniciarListagem() {

    carregarDoces();

    const botaoBuscar = document.getElementById("btnBuscar");

    if (botaoBuscar) {

        botaoBuscar.addEventListener("click", () => {

            carregarDoces(campoBusca.value);

        });

    }

    if (campoBusca) {

        campoBusca.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                carregarDoces(campoBusca.value);

            }

        });

        campoBusca.addEventListener("input", () => {

            if (campoBusca.value.trim() === "") {

                carregarDoces();

            }

        });

    }

}



// ==========================================
// BUSCAR DOCES
// ==========================================

async function carregarDoces(busca = "") {

    tabela.innerHTML = `

        <tr>

            <td colspan="5" class="text-center">

                Carregando...

            </td>

        </tr>

    `;

    let endpoint = "/doces/";

    busca = busca.trim();

    if (busca !== "") {

        if (isNaN(busca)) {

            endpoint = `/doces/?nome=${encodeURIComponent(busca)}`;

        }

        else {

            endpoint = `/doces/${busca}`;

        }

    }

    const resposta = await api.get(endpoint);

    if (!resposta.ok) {

        tabela.innerHTML = `

            <tr>

                <td colspan="5" class="text-center">

                    Nenhum doce encontrado.

                </td>

            </tr>

        `;

        return;

    }

    let doces = [];

    if (Array.isArray(resposta.data)) {

        doces = resposta.data;

    }

    else {

        doces = [resposta.data];

    }

    renderizarTabela(doces);

}



// ==========================================
// RENDERIZA TABELA
// ==========================================

function renderizarTabela(doces) {

    tabela.innerHTML = "";

    if (doces.length === 0) {

        tabela.innerHTML = `

            <tr>

                <td colspan="5" class="text-center">

                    Nenhum doce encontrado.

                </td>

            </tr>

        `;

        return;

    }

    doces.forEach(doce => {

        const linha = document.createElement("tr");

        linha.innerHTML = `

            <td>${doce.id}</td>

            <td>${doce.nome}</td>

            <td>

                ${Number(doce.preco).toLocaleString("pt-BR", {

                    style: "currency",

                    currency: "BRL"

                })}

            </td>

            <td>${doce.quantidade}</td>

            <td>

                <a
                    href="editar.html?id=${doce.id}"
                    class="btn btn-editar btn-sm me-2">

                    Editar

                </a>

                <button
                    class="btn btn-excluir btn-sm">

                    Excluir

                </button>

            </td>

        `;

        linha
            .querySelector(".btn-excluir")
            .addEventListener("click", () => {

                excluirDoce(
                    doce.id,
                    doce.nome
                );

            });

        tabela.appendChild(linha);

    });

}

// ==========================================
// CADASTRO
// ==========================================

function iniciarCadastro() {

    formCriar.addEventListener("submit", salvarNovoDoce);

}

async function salvarNovoDoce(event) {

    event.preventDefault();

    const botao = event.target.querySelector("button[type='submit']");
    const textoOriginal = botao.innerHTML;

    botao.disabled = true;

    botao.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Salvando...
    `;

    const nome = document.getElementById("nome").value.trim();
    const preco = Number(document.getElementById("preco").value);
    const quantidade = Number(document.getElementById("quantidade").value);

    if (!nome || preco < 0 || quantidade < 0) {

        mostrarToast(
            "Preencha os dados corretamente.",
            "erro"
        );

        botao.disabled = false;
        botao.innerHTML = textoOriginal;

        return;

    }

    const resposta = await api.post("/doces/", {
        nome,
        preco,
        quantidade
    });

    botao.disabled = false;
    botao.innerHTML = textoOriginal;

    if (!resposta.ok) {

        mostrarToast(
            resposta.data?.detail || "Erro ao cadastrar doce.",
            "erro"
        );

        return;

    }

    mostrarToast("Doce cadastrado com sucesso!");

    formCriar.reset();

}



// ==========================================
// EDIÇÃO
// ==========================================

async function iniciarEdicao() {

    const parametros = new URLSearchParams(window.location.search);

    const id = parametros.get("id");

    if (!id) {

        mostrarToast("Doce não encontrado.", "erro");

        setTimeout(() => {

            location.href = "index.html";

        }, 1500);

        return;

    }

    const resposta = await api.get(`/doces/${id}`);

    if (!resposta.ok) {

        mostrarToast("Doce não encontrado.", "erro");

        return;

    }

    document.getElementById("nome").value =
        resposta.data.nome;

    document.getElementById("preco").value =
        resposta.data.preco;

    document.getElementById("quantidade").value =
        resposta.data.quantidade;

    formEditar.addEventListener("submit", async function(event){

        event.preventDefault();

        const botao = event.target.querySelector("button[type='submit']");
        const textoOriginal = botao.innerHTML;

        botao.disabled = true;

        botao.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Salvando...
        `;

        const resposta = await api.put(

            `/doces/${id}/substituir`,

            {

                nome: document.getElementById("nome").value.trim(),

                preco: Number(document.getElementById("preco").value),

                quantidade: Number(document.getElementById("quantidade").value)

            }

        );

        botao.disabled = false;

        botao.innerHTML = textoOriginal;

        if (!resposta.ok) {

            mostrarToast(
                resposta.data?.detail || "Erro ao atualizar doce.",
                "erro"
            );

            return;

        }

        mostrarToast("Doce atualizado com sucesso!");

        setTimeout(() => {

            location.href = "index.html";

        }, 1500);

    });

}



// ==========================================
// EXCLUSÃO
// ==========================================

function excluirDoce(id, nome) {

    confirmarAcao(

        "Excluir doce",

        `Deseja realmente excluir "${nome}"?`,

        async () => {

            const resposta = await api.delete(`/doces/${id}`);

            if (!resposta.ok) {

                mostrarToast(
                    resposta.data?.detail || "Erro ao excluir doce.",
                    "erro"
                );

                return;

            }

            mostrarToast("Doce excluído com sucesso!");

            carregarDoces();

        }

    );

}