// ==========================================
// UI - Funções visuais do sistema
// ==========================================


// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

function mostrarToast(mensagem, tipo = "sucesso") {

    const configuracoes = {

        sucesso: {
            cor: "#198754",
            icone: "✅"
        },

        erro: {
            cor: "#dc3545",
            icone: "❌"
        },

        aviso: {
            cor: "#ffc107",
            icone: "⚠️"
        },

        info: {
            cor: "#0d6efd",
            icone: "ℹ️"
        }

    };

    const estilo = configuracoes[tipo] || configuracoes.sucesso;

    Toastify({

        text: `${estilo.icone} ${mensagem}`,

        duration: 4000,

        gravity: "top",

        position: "right",

        close: true,

        stopOnFocus: true,

        newestOnTop: true,

        style: {
            background: estilo.cor,
            borderRadius: "12px",
            fontWeight: "600"
        }

    }).showToast();

}



// ==========================================
// MODAL DE CONFIRMAÇÃO
// ==========================================

function criarModalConfirmacao() {

    if (document.getElementById("modalConfirmacao")) return;

    document.body.insertAdjacentHTML("beforeend", `

<div class="modal fade" id="modalConfirmacao" tabindex="-1" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title" id="tituloModal">
                    Confirmar ação
                </h5>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>

            <div class="modal-body">

                <p id="textoModal" class="mb-0"></p>

            </div>

            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    id="btnCancelarModal"
                    data-bs-dismiss="modal">

                    Cancelar

                </button>

                <button
                    type="button"
                    class="btn btn-excluir"
                    id="btnConfirmarModal">

                    Confirmar

                </button>

            </div>

        </div>

    </div>

</div>

`);

}



// ==========================================
// MODAL DE CONFIRMAÇÃO
// ==========================================

function confirmarAcao(
    titulo,
    mensagem,
    callback,
    textoBotao = "Confirmar"
) {

    criarModalConfirmacao();

    document.getElementById("tituloModal").textContent = titulo;

    document.getElementById("textoModal").textContent = mensagem;

    const modalElemento = document.getElementById("modalConfirmacao");

    const modal = new bootstrap.Modal(modalElemento, {
    backdrop: "static",
    keyboard: false
});

    const botaoAntigo = document.getElementById("btnConfirmarModal");

    const novoBotao = botaoAntigo.cloneNode(true);

    const btnCancelar = document.getElementById("btnCancelarModal");

    botaoAntigo.parentNode.replaceChild(
        novoBotao,
        botaoAntigo
    );

    novoBotao.textContent = textoBotao;
    novoBotao.addEventListener("click", async () => {

        novoBotao.disabled = true;

        novoBotao.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Processando...
        `;

        try {

            btnCancelar.disabled = true;
            await callback();

        }

        finally {
            
            modal.hide();

            novoBotao.disabled = false;
            btnCancelar.disabled = false;

            novoBotao.innerHTML = textoBotao;
        }

    });

    modal.show();

}