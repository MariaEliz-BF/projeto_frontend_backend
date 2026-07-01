const formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const botao = formulario.querySelector("button[type='submit']");

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {

        mostrarToast("Preencha e-mail e senha.", "erro");
        return;

    }

    botao.disabled = true;

    const textoOriginal = botao.innerHTML;

    botao.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Entrando...
    `;

    try {

        await realizarLogin(email, senha);

    } finally {

        botao.disabled = false;
        botao.innerHTML = textoOriginal;

    }

});