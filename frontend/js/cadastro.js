const formulario = document.getElementById("formCadastro");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const botao = formulario.querySelector("button[type='submit']");

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    botao.disabled = true;

    const textoOriginal = botao.innerHTML;

    botao.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Criando conta...
    `;

    try {

        const sucesso = await cadastrarUsuario(
            nome,
            email,
            senha,
            confirmarSenha
        );

        if (sucesso) {
            formulario.reset();
        }

    } finally {

        botao.disabled = false;
        botao.innerHTML = textoOriginal;

    }

});