const form = document.getElementById("formPalestrante");


form.addEventListener("submit", async(e)=>{
e.preventDefault();


const nome = document.getElementById("nome").value;
const email = document.getElementById("email").value;


// validação extra de email

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailValido.test(email)){

alert("Digite um e-mail válido");
return;
}




const resposta =
await post("/palestrantes",{nome, email});

alert(resposta.mensagem);

if(resposta.palestrante){
form.reset();
}


});