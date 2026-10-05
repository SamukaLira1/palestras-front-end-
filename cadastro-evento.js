const select = document.getElementById("palestrantes");
let idEdicao = localStorage.getItem("eventoEditar");

// CARREGAR PALESTRANTES
async function carregarPalestrantes() {

    try {
        const palestrantes = await get("/palestrantes");

        select.innerHTML = "";
        palestrantes.forEach(p => {

            select.innerHTML += `
                <option value="${p.id}">${p.nome}</option> `;

        });

    } catch (erro) {

        console.error("Erro ao carregar palestrantes:", erro);
        alert("Erro ao carregar os palestrantes: " + erro.message);
    }
}


// CARREGAR EVENTO PARA EDIÇÃO
async function carregarEvento() {

    if (!idEdicao) { return;}
    try {

        const evento = await get("/eventos/" + idEdicao);
        document.getElementById("nomeEvento").value = evento.nome;
        document.getElementById("descricao").value = evento.descricao;
        document.getElementById("local").value = evento.local;

        if (evento.data) {document.getElementById("data").value = evento.data.substring(0, 16);}

        const ids = evento.palestrantes.map( p => p.palestrante.id);

        Array.from(select.options).forEach(opcao => {

            if (ids.includes(Number(opcao.value))) {
                opcao.selected = true;
            }

        });

    } catch (erro) {

        console.error("Erro ao carregar evento:", erro);
        alert("Erro ao carregar o evento: " + erro.message);
    }
}


// ENVIAR FORMULÁRIO
document
    .getElementById("formEvento")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const dados = {

            nome: document.getElementById("nomeEvento").value,
            descricao: document.getElementById("descricao").value,
            local: document.getElementById("local").value,
            data: document.getElementById("data").value,
            palestrantes: Array.from(
                select.selectedOptions
            ).map(option => Number(option.value))

        };

        // Mostra no console o que está sendo enviado
        console.log("Dados enviados para o servidor:", dados);


        try {
            let resposta;

            // EDITAR EVENTO
            if (idEdicao) {

                resposta = await put("/eventos/" + idEdicao, dados);
                localStorage.removeItem("eventoEditar");
            }

            // CADASTRAR EVENTO
            else {

                resposta = await post(
                    "/eventos",
                    dados
                );
            }

            console.log(
                "Resposta do servidor:",
                resposta
            );


            alert(resposta.mensagem);

            window.location.href = "index.html";
        } catch (erro) {

            console.error("ERRO AO CADASTRAR/EDITAR EVENTO:", erro);
            alert("Erro ao cadastrar/editar evento: " + erro.message);
        }

    });


// INICIAR PÁGINA
async function iniciar() {
    await carregarPalestrantes();
    await carregarEvento();
}

iniciar();