const API = "http://localhost:3000";


async function get(url) {

    const resposta = await fetch(API + url);
    const texto = await resposta.text();

    console.log("GET", API + url);
    console.log("Resposta:", texto);
    let dados;

    try {
        dados = JSON.parse(texto);
    } catch {
        throw new Error("O servidor não retornou JSON. Resposta recebida: " + texto.substring(0, 100));
    }

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro na requisição");
    }
    return dados;
}



async function post(url, dados) {
    const endereco = API + url;

    console.log("ENDEREÇO:", endereco);
    console.log("DADOS ENVIADOS:", dados);

    const resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    const texto = await resposta.text();

    console.log("STATUS:", resposta.status);
    console.log("RESPOSTA DO SERVIDOR:", texto);

    if (!resposta.ok) {
        throw new Error(
            "Erro " + resposta.status + ": " + texto.substring(0, 200)
        );
    }

    try {
        return JSON.parse(texto);
    } catch {
        throw new Error(
            "O servidor não retornou JSON. Resposta recebida: " +
            texto.substring(0, 200)
        );
    }
}



async function put(url, dados) {

    const resposta = await fetch(API + url, {

        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });


    const texto = await resposta.text();

    console.log("PUT", API + url);
    console.log("Dados enviados:", dados);
    console.log("Resposta:", texto);

    let resultado;

    try {
        resultado = JSON.parse(texto);
    } catch {
        throw new Error("O servidor não retornou JSON. Resposta recebida: " + texto.substring(0, 100));
    }


    if (!resposta.ok) {

        throw new Error(resultado.mensagem || "Erro na requisição");

    }
    return resultado;
}


async function remove(url) {
    const resposta = await fetch(
        API + url,
        {
            method: "DELETE"
        }
    );


    const texto = await resposta.text();
    console.log("DELETE", API + url);
    console.log("Resposta:", texto);

    let resultado;

    try {
        resultado = JSON.parse(texto);
    } catch {

        throw new Error("O servidor não retornou JSON. Resposta recebida: " + texto.substring(0, 100));
    }


    if (!resposta.ok) {

        throw new Error( resultado.mensagem || "Erro na requisição");
    }
    return resultado;
}