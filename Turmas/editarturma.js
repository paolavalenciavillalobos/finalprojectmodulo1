function mentoriasButton() {
	window.location = `../Mentorias/mentorias.html`;
}

function mentoresButton() {
	window.location = `../Mentores/mentores.html`;
}

function turmasButton() {
	window.location = `turmas.html`;
}

function alunosButton() {
	window.location = `../Alunos/alunos.html`;
}

function back() {
	window.location = "turmas.html";
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
        const optionText = `${theMentor.nome} (${theMentor.email})`;
        const option = new Option(optionText, theMentor.id);
        mentoresFormulario.options.add(option)
    });
    console.log(mentoresFormulario)
}

const buscarMentoria = async (id) => {
    if(id == null){
        return false
    }
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
    const mentoriasFormulario = document.getElementById('selectMentorias')

    listaDeMentorias.forEach(item => {
        const option = new Option (item.titulo , item.id)
        mentoriasFormulario.options.add(option)
    });
    console.log(mentoriasFormulario)
}

const carregarTurma = async () => {
    const response = await fetch(`https://api-final-project-pkm5.onrender.com/turmas/${id}`)
    const turma = await response.json()
    console.log(turma)
    return turma
}

const editarTurma = async (parametroTurma) => {
    await fetch(`https://api-final-project-pkm5.onrender.com/turmas/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parametroTurma)
    })
    window.location = 'turmas.html'
}

const valoresTurma = async (parametroValores) => {
    document.getElementById('selectMentores').value = parametroValores.mentor.nome
    document.getElementById('selectMentorias').value = parametroValores.mentoria.titulo
    document.getElementById('data').value = parametroValores.data
    document.getElementById('selectSemana').value = parametroValores.dia
    document.getElementById('horaInicio').value = parametroValores.horaInicio
    document.getElementById('horaFim').value = parametroValores.horaFinal
    document.getElementById('turma').value = parametroValores.titulo
    document.getElementById('encontros').value = parametroValores.encontros
    document.getElementById('link').value = parametroValores.link
}

const atualizarDadosProntos = async () => {
    urlId()
    console.log(id)
    const turmaEditada = await carregarTurma()
    valoresTurma(turmaEditada)
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const mentores = formulario.elements['selectMentores'].value
    const mentorias = formulario.elements['selectMentorias'].value
    const data = formulario.elements['data'].value
    const semana = formulario.elements['selectSemana'].value
    const horaInicio = formulario.elements['horaInicio'].value
    const horaFinal = formulario.elements['horaFim'].value
    const titulo = formulario.elements['turma'].value
    const encontros = formulario.elements['encontros'].value
    const link = formulario.elements['link'].value

    const mentorObjeto = await buscarMentor(mentores)
    const mentoriasObjeto = await buscarMentoria(mentorias)

    const editTurma = {
        mentor: {
            nome: mentorObjeto.nome,
            id: mentorObjeto.id
        },
        mentoria: {
            titulo: mentoriasObjeto.titulo,
            id: mentoriasObjeto.id
        },
        data,
        dia: semana,
        horaInicio,
        horaFinal,
        titulo,
        encontros,
        link
    }
    editarTurma(editTurma)
}
)

mentoresSelect()
mentoriasSelect()
atualizarDadosProntos()
usuario()