function mentoriasButton() {
	window.location = `../Mentorias/mentorias.html`;
}

function mentoresButton() {
	window.location = `../Mentores/mentores.html`;
}

function turmasButton() {
	window.location = `../Turmas/turmas.html`;
}

function alunosButton() {
	window.location = `alunos.html`;
}

function back() {
	window.location = "alunos.html";
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

//Function para apagar o ultimo usuario do array e depois carrgera de novo a pagina de Login

const excluirUser = async (id) =>{
	try {
		await fetch(`https://api-final-project-pkm5.onrender.com/usuario/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
			}
		});
		usuario()
    window.location = '../index.html';
	} catch (error) {
		console.error(error);
	}
};

const formulario = document.getElementById('formulario')

let id;

const searchId = async () => {
    const parametro = window.location.search
    const getParametro = new URLSearchParams(parametro)
    id = getParametro.get('id')
    return id
}

const carregarAlunos = async() => {
    const response = await fetch(`https://api-final-project-pkm5.onrender.com/alunos/${id}`)
    const alunos = await response.json()
    return alunos
}

const editarAluno = async (parametroaluno) => {
    await fetch(`https://api-final-project-pkm5.onrender.com/alunos/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parametroaluno)
    })
    window.location = 'alunos.html'
}

const carregarValores = async (parametro) => {
    document.getElementById('nome').value = parametro.nome 
    document.getElementById('email').value = parametro.email
}

const parametrosId = async () => {
    searchId()
    const data = await carregarAlunos()
    carregarValores(data)
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value


    const alunosUpdate = {
        nome,
        email,
    }

    editarAluno(alunosUpdate)
})

parametrosId()
usuario()