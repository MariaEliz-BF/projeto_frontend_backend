function realizarLogin(email, senha) {

    return api.post("/auth/login", {
        email,
        senha
    });

}

function salvarSessao(dados, email) {

    localStorage.setItem("token", dados.access_token);
    localStorage.setItem("tipo", dados.tipo);
    localStorage.setItem("usuario", email);

}

function obterToken() {
    return localStorage.getItem("token");
}

function obterUsuario() {
    return localStorage.getItem("usuario");
}

function obterTipoUsuario() {
    return localStorage.getItem("tipo");
}

function usuarioLogado() {
    return obterToken() !== null;
}

function protegerPagina(tipoEsperado = null) {

    const token = obterToken();

    if (!token) {

        window.location.href = "../login.html";
        return;

    }

    if (tipoEsperado) {

        const tipo = obterTipoUsuario();

        if (tipo !== tipoEsperado) {

            alert("Você não tem permissão para acessar esta página.");

            if (tipo === "admin") {

                window.location.href = "../index.html";

            } else {

                window.location.href = "../cliente/home.html";

            }

        }

    }

}

function mostrarUsuario() {

    const span = document.getElementById("usuarioLogado");

    if (!span) return;

    const usuario = obterUsuario();

    if (!usuario) return;

    span.textContent = usuario.replace("@", " • ").split(" • ")[0];

}

async function cadastrarUsuario(nome, email, senha, confirmarSenha) {

    if (senha !== confirmarSenha) {

        mostrarToast("As senhas não coincidem.", "erro");
        return false;

    }

    const resposta = await api.post("/auth/usuarios", {
        nome,
        email,
        senha,
        tipo: "usuario"
    });

    if (!resposta.ok) {

        console.error("Erro do backend:", resposta);

        mostrarToast(
            resposta.data?.detail || "Erro ao criar conta.",
            "erro"
        );

        return false;

    }

    mostrarToast("Conta criada com sucesso!", "sucesso");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);

    return true;

}

function sair() {

    localStorage.removeItem("token");
    localStorage.removeItem("tipo");
    localStorage.removeItem("usuario");

    window.location.href = "http://127.0.0.1:5500/frontend/login.html";

}