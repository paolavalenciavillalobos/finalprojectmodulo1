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

//pegar pelo id o formulario html
const formulario = document.getElementById('formulario')

//Function que pega os dados do mentor especifico escolhido pelo usuario
const buscarMentor = async (id) => {
    const response = await fetch (`https://api-final-project-pkm5.onrender.com/mentores/${id}`)
    const mentor = await response.json()
    return mentor
}

//chamar os mentores da API para cheiar nossa função mentoresSelect
const buscarMentores = async () => {
    const response = await fetch (`https://api-final-project-pkm5.onrender.com/mentores/`)
    const mentores = await response.json()
    return mentores
}

//Function que cria option no select do html com os dados dos mentores
const mentoresSelect = async() => {
    const listaDeMentores = await buscarMentores()
    const mentoresFormulario = document.getElementById('selectMentores')

    listaDeMentores.forEach(theMentor => {
        const option = new Option (theMentor.nome , theMentor.id)
        mentoresFormulario.options.add(option)
    });
    console.log(mentoresFormulario)
}

//function para usar o metodo POST na API
const novaMentoria = async(mentorparametro) => {
    try {
        await fetch('https://api-final-project-pkm5.onrender.com/mentorias', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mentorparametro)
        })
        window.location = 'mentorias.html'
    } catch (error) {
        console.error(error)
    }
}

//escuta do formulario
formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    //valor de cada input

    const mentoria = formulario.elements['mentoria'].value
    const mentor = formulario.elements['selectMentores'].value
    /*Pegar o elemento input do html desde o ID*/
    const checkbox = document.getElementById("flexSwitchCheckChecked");
    /*Dar o valor de ativo o inativo pro Status com operador ternario (true/false)*/
    const status = checkbox.checked ? 'ativo' : 'inativo';

    const mentorObjeto = await buscarMentor(mentor) //esta variable tem o id do mentor escolhido e procura ele com um callback

    console.log(mentoria)

    //colocar os dados do input na API

    const mentoriaNova = {
        titulo: mentoria, //nome na API e igual variable nome
        status,
        mentor: { 
            nome: mentorObjeto.nome,
            id: mentorObjeto.id

        }
    }

    novaMentoria(mentoriaNova) //passar na function de POST as informaçoes da variable
})

mentoresSelect()
usuario()