// ==========================================
// API - Comunicação com o Backend
// ==========================================

const api = {

    async request(endpoint, options = {}) {

        const token = obterToken();

        const headers = {
            ...options.headers
        };

        // Não adiciona Content-Type quando enviar FormData
        if (!(options.body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {

            const resposta = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers
            });

            let dados = null;

            const contentType = resposta.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                dados = await resposta.json();
            }

            return {
                ok: resposta.ok,
                status: resposta.status,
                data: dados
            };

        } catch (erro) {

            console.error("Erro ao conectar com a API:", erro);

            return {
                ok: false,
                status: 500,
                data: {
                    detail: "Não foi possível conectar ao servidor."
                }
            };

        }

    },



    async get(endpoint) {

        return this.request(endpoint, {
            method: "GET"
        });

    },



    async post(endpoint, body) {

        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        });

    },



    async put(endpoint, body) {

        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(body)
        });

    },



    async patch(endpoint, body) {

        return this.request(endpoint, {
            method: "PATCH",
            body: JSON.stringify(body)
        });

    },



    async delete(endpoint) {

        return this.request(endpoint, {
            method: "DELETE"
        });

    },



    async upload(endpoint, formData) {

        return this.request(endpoint, {
            method: "POST",
            body: formData
        });

    }

};