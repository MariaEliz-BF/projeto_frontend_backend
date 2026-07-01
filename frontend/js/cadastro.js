const formulario = document.getElementById("formCadastro");

console.log("Cadastro.js carregado");

if (formulario) {

    formulario.addEventListener("submit", async (event) => {

        event.preventDefault();

        console.log("Submit disparou");

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        console.log({ nome, email, senha, confirmarSenha });

        const sucesso = await cadastrarUsuario(
            nome,
            email,
            senha,
            confirmarSenha
        );

        console.log("Resultado:", sucesso);

    });

}