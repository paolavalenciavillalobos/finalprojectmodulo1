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
console.log(formulario)

const buscarMentoria = async (id) => {
    const response = await fetch (`https://api-final-project-pkm5.onrender.com/mentorias/${id}`)
    const mentoria = await response.json()
    return mentoria
}

const buscarMentorias = async () => {
    const response = await fetch (`https://api-final-project-pkm5.onrender.com/mentorias/`)
    const mentorias = await response.json()
    return mentorias
}

const mentoriasSelect = async() => {
    const listaDeMentorias = await buscarMentorias()
    console.log(buscarMentorias)
    const mentoriasFormulario = document.getElementById('selectMentorias')

    listaDeMentorias.forEach(item => {
        const option = new Option (item.titulo , item.id)
        mentoriasFormulario.options.add(option)
    });
    console.log(mentoriasFormulario)
    console.log(mentoriasSelect)
}

const carregarAlunos = async (parametroAluno) => {
    try {
        await fetch('https://api-final-project-pkm5.onrender.com/alunos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parametroAluno)
        })
       window.location = 'alunos.html'
    } catch (error) {
        console.error(error)
    }
}

formulario.addEventListener('submit', async(e) =>{
    e.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value
    const mentoria = formulario.elements['selectMentorias'].value

    console.log(nome)

    const mentoriaObjeto = await buscarMentoria(mentoria)

    const alunoNovo = {
        nome,
        email,
        mentoria:{
            titulo: mentoriaObjeto.titulo,
            id: mentoriaObjeto.id
        }
    }

    carregarAlunos(alunoNovo)
})

mentoriasSelect()
usuario()