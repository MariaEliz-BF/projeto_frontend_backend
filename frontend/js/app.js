// ==========================================
// CONFIGURAÇÕES GERAIS DO SISTEMA
// ==========================================

// URL do Backend
const API_URL = "http://127.0.0.1:8000";

// Produção
// const API_URL = "https://seu-backend.onrender.com";



// ==========================================
// TOKEN
// ==========================================

function salvarToken(token) {
    localStorage.setItem("token", token);
}

function obterToken() {
    return localStorage.getItem("token");
}

function removerToken() {
    localStorage.removeItem("token");
}



// ==========================================
// USUÁRIO
// ==========================================

function salvarUsuario(usuario) {

    if (usuario.includes("@")) {

        usuario = usuario.split("@")[0];

    }

    localStorage.setItem("usuario", usuario);

}

function obterUsuario() {
    return localStorage.getItem("usuario");
}

function removerUsuario() {
    localStorage.removeItem("usuario");
}

function salvarTipoUsuario(tipo) {
    localStorage.setItem("tipoUsuario", tipo);
}

function obterTipoUsuario() {
    return localStorage.getItem("tipoUsuario");
}

function removerTipoUsuario() {
    localStorage.removeItem("tipoUsuario");
}


// ==========================================
// UTILIDADES
// ==========================================

function limparSessao() {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

}

function usuarioLogado() {

    return obterToken() !== null;

}



// ==========================================
// LOGOUT
// ==========================================

function logout() {

    limparSessao();
    removerTipoUsuario();

    window.location.href = "login.html";

}
