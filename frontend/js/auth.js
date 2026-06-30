// ==========================================
// AUTH - Autenticação
// ==========================================


// ==========================================
// LOGIN
// ==========================================

async function realizarLogin(email, senha) {

    const resposta = await api.post("/auth/login", {
        email,
        senha
    });

    if (!resposta.ok) {

        switch (resposta.status) {

            case 401:
                mostrarToast("E-mail ou senha inválidos.", "erro");
                break;

            default:
                mostrarToast(
                    resposta.data?.detail || "Erro ao realizar login.",
                    "erro"
                );

        }

        return false;

    }

    salvarToken(resposta.data.access_token);

    // Enquanto o backend não retorna o nome,
    // salvamos o e-mail.
    salvarUsuario(email);

    mostrarToast("Login realizado com sucesso!");

    setTimeout(() => {

        window.location.href = "index.html";

    }, 2000);

    return true;

}



// ==========================================
// CADASTRO
// ==========================================

async function cadastrarUsuario(nome, email, senha, confirmarSenha) {

    if (!nome || !email || !senha || !confirmarSenha) {

        mostrarToast("Preencha todos os campos.", "erro");
        return false;

    }

    if (senha !== confirmarSenha) {

        mostrarToast("As senhas não coincidem.", "erro");
        return false;

    }

    const usuario = {
        nome,
        email,
        senha,
        tipo: "usuario"
    };

    const resposta = await api.post(
        "/auth/usuarios",
        usuario
    );

    if (resposta.ok) {

        mostrarToast(
            "Cadastro realizado com sucesso! Redirecionando para o login..."
        );

        setTimeout(() => {

            window.location.href = "login.html";

        }, 3000);

        return true;

    }

    switch (resposta.status) {

        case 409:

            mostrarToast(
                "Este e-mail já está cadastrado.",
                "erro"
            );

            break;

        case 422:

            mostrarToast(
                "Verifique os dados informados.",
                "erro"
            );

            break;

        default:

            mostrarToast(
                resposta.data?.detail ||
                "Erro ao cadastrar.",
                "erro"
            );

    }

    return false;

}



// ==========================================
// VERIFICAÇÃO DE LOGIN
// ==========================================

function usuarioEstaLogado() {

    return obterToken() !== null;

}



// ==========================================
// PROTEGER PÁGINAS
// ==========================================

function protegerPagina() {

    if (!usuarioEstaLogado()) {

        mostrarToast(
            "Faça login para acessar esta página.",
            "aviso"
        );

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1200);

    }

}



// ==========================================
// LOGOUT
// ==========================================

function sair() {

    confirmarAcao(

        "Encerrar sessão",

        "Deseja realmente sair da sua conta?",

        () => {

            logout();

        }

    );

}