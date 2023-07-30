function mentoriasButton() {
	window.location = `mentorias.html`;
}

function mentoresButton() {
	window.location = `../Mentores/mentores.html`;
}

function turmasButton() {
	window.location = `../Turmas/turmas.html`;
}

function alunosButton() {
	window.location = `../Alunos/alunos.html`;
}

function back() {
	window.location = "mentorias.html";
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

const urlId = async () => {
    const parametroUrl = window.location.search
    const getParametro = new URLSearchParams (parametroUrl)
    id = getParametro.get ('id')
    return id
}

const buscarMentor = async (id) => {
    if(id == null){
        return false
    }
    const response = await fetch (`https://api-final-project-pkm5.onrender.com/mentores/${id}`)
    const mentor = await response.json()
    return mentor
}


const buscarMentores = async () => {
    const response = await fetch (`https://api-final-project-pkm5.onrender.com/mentores/`)
    const mentores = await response.json()
    return mentores
}

const mentoresSelect = async() => {
    const listaDeMentores = await buscarMentores()
    const mentoresFormulario = document.getElementById('selectMentores')

    listaDeMentores.forEach(theMentor => {
        const option = new Option (theMentor.nome , theMentor.id)
        mentoresFormulario.options.add(option)
    });
    console.log(mentoresFormulario)
}

const carregarMentorias = async () => {
    const response = await fetch(`https://api-final-project-pkm5.onrender.com/mentorias/${id}`)
    const mentoria = await response.json()
    console.log(mentoria)
    return mentoria
}

const editarMentorias = async (mentoria) => {
    await fetch(`https://api-final-project-pkm5.onrender.com/mentorias/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentoria)
    })
    window.location = 'mentorias.html'
}

const editarFormularioMentorias = async (parametroeditar) => {
    document.getElementById('mentoria').value = parametroeditar.titulo
    document.getElementById('selectMentores').value = parametroeditar.mentor.id
}


const atualizarDadosProntos = async () => {
    urlId()
    console.log(id)
    const mentoriaEditada = await carregarMentorias()
    editarFormularioMentorias(mentoriaEditada)
}

formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    const mentoria = formulario.elements['mentoria'].value
    const mentor = formulario.elements['selectMentores'].value
    /*Pegar o elemento input do html desde o ID*/
    const checkbox = document.getElementById("flexSwitchCheckChecked");
    /*Dar o valor de ativo o inativo pro Status com operador ternario (true/false)*/
    const status = checkbox.checked ? 'ativo' : 'inativo';

    const mentorObjeto = await buscarMentor(mentor)

    console.log(mentoria)

    const mentoriaNova = {
        titulo: mentoria,
        status,
        mentor: { 
            nome: mentorObjeto.nome,
            id: mentorObjeto.id

        }
    }

    editarMentorias(mentoriaNova)
})

mentoresSelect()
atualizarDadosProntos()
usuario()