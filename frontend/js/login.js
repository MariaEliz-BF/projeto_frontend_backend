document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formLogin");

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const senha = document
            .getElementById("senha")
            .value;

        const resposta = await realizarLogin(email, senha);

        if (!resposta.ok) {

            mostrarToast(
                resposta.data?.detail || "Email ou senha inválidos.",
                "erro"
            );

            return;

        }

        salvarSessao(resposta.data, email);

        if (resposta.data.tipo === "admin") {

            window.location.href = "index.html";

        } else {

            window.location.href = "cliente/home.html";

        }

    });

});