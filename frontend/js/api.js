const api = {

    async request(endpoint, options = {}) {

        const token = localStorage.getItem("token");

        const headers = {
            ...(options.headers || {})
        };

        if (!(options.body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const resposta = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        const dados = await resposta.json().catch(() => null);

        return {
            ok: resposta.ok,
            status: resposta.status,
            data: dados
        };

    },

    get(endpoint) {
        return this.request(endpoint, {
            method: "GET"
        });
    },

    post(endpoint, body) {
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        });
    },

    put(endpoint, body) {
        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(body)
        });
    },

    patch(endpoint, body) {
        return this.request(endpoint, {
            method: "PATCH",
            body: JSON.stringify(body)
        });
    },

    delete(endpoint) {
        return this.request(endpoint, {
            method: "DELETE"
        });
    }

};