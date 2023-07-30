function mentoriasButton() {
	window.location = `Mentorias/mentorias.html`;
}

function mentoresButton() {
	window.location = `mentores.html`;
}

function turmasButton() {
	window.location = `Turmas/turmas.html`;
}

function alunosButton() {
	window.location = `Alunos/alunos.html`;
}

function back() {
	window.location = "mentores.html";
}

//Function para pegar o ultimo user do Array e fazer integração do login com a API

const emailUser = (users) => {
	const dados = document.getElementById('dados')
	dados.innerHTML = ''
	if (users.length > 0) {
		const ultimoUsuario = users[users.length - 1]; // obter o ultimo usuario do array
	
		const divEmail = `
		  <p id="userName">Bem-vindo   <button class="sair" onclick="excluirUser(${ultimoUsuario.id})">Sair</button></p>
		  <p id="userMail">${ultimoUsuario.email}</p>
		`;
	
		dados.innerHTML = divEmail;
	  }
	};


//Pegar os dados do Usuario cadastrados na API
const usuario = async () => {
	const response = await fetch(`https://api-final-project-pkm5.onrender.com/usuario`)
    const usuarioData = await response.json()
    emailUser(usuarioData)
}

//Pegar o formulario desde o Id no html
const formulario = document.getElementById('formulario')

//declarar una variavel global para guardar a informação
let id;


//usar um id unico na url para cada objeto modificavel da API
const parametrosId = async () => {
    console.log(window.location.search)
    const parametro = window.location.search
    const getParametro = new URLSearchParams(parametro)
    id = getParametro.get('id')
    return id

}

//carregar a informção da API

const carregarMentores = async () => {
    const response = await fetch(`https://api-final-project-pkm5.onrender.com/mentores/${id}`)
    const mentores = await response.json()
    console.log(mentores)
    return mentores
}


//Editar a informação da API
const editarMentores = async (mentor) => {
    await fetch(`https://api-final-project-pkm5.onrender.com/mentores/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentor)
    })
    window.location = 'mentores.html'
}

//Carregar os valores da API no input
const editarFormularioMentores = async (parametroeditar) => {
    document.getElementById('nome').value = parametroeditar.nome
    document.getElementById('email').value = parametroeditar.email
}

//função para preencher os dados certos
const atualizarDadosProntos = async () => {
    parametrosId() //chama o ID do mentor
    console.log(id)
    const mentorEditado = await carregarMentores() //carrega a info dos mentores
    editarFormularioMentores(mentorEditado) //passa a informação dos mentores na função
}

//finalmente atualizar os dados na api
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value


    const mentoresUpdate = {
        nome,
        email,
    }

    editarMentores(mentoresUpdate)
})

atualizarDadosProntos()
usuario()