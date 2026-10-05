async function carregarEventos(){


const eventos = await get("/eventos");
const lista=document.getElementById("listaEventos");

lista.innerHTML="";


eventos.forEach(evento=>{


let palestrantes = evento.palestrantes
.map(p=>p.palestrante.nome)
.join(", ");



lista.innerHTML += `

<div class="card">


<p>
<b>nome:</b> ${evento.nome}
</p>


<p>
<b>descrição:</b> ${evento.descricao}
</p>


<p>
<b>palestrante:</b> ${palestrantes}
</p>


<p>
<b>local:</b> ${evento.local}
</p>


<button onclick="editar(${evento.id})">
Editar
</button>


<button onclick="excluir(${evento.id})">
Excluir
</button>



</div>

`;

});


}



function editar(id){

localStorage.setItem("eventoEditar",id);

window.location.href="cadastro-evento.html";


}



async function excluir(id){


if(confirm("Deseja realmente excluir este evento?")){


await remove("/eventos/"+id);


alert("Evento excluído com sucesso");


carregarEventos();


}


}



carregarEventos();