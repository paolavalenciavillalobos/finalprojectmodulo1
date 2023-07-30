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

function editar(identificador) {
	window.location = `editaraluno.html?id=${identificador}`
}

function addNovoAluno () {
  window.location = 'novoaluno.html'
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

const search = document.getElementById('search')

const alunos = (parametroAlunos) => {
    const tabla = document.querySelector('.my-table tbody')
    tabla.innerHTML = ''
	const contarAlunos = parametroAlunos.length
    parametroAlunos.forEach((item, index) => {
		let left = ""
		let right = ""
		if(contarAlunos === index + 1){
			left = 'bottomleft'
			right = 'bottomright'
		}
        const alunosHtml =
        `
        <tr>
        <td class="left ${left}">${item.nome}</td>
        <td class="center">${item.email}</td>
        <td class="right ${right}">
          <button class="editButton"onclick="editar(${item.id})">
            <img src="https://i.ibb.co/n6sqKDC/Subtract.png" alt="Subtract">
          </button>
          <button class="deleteButton" onclick="excluir(${item.id})">
            <img src="https://i.ibb.co/Ry7XDt6/delete.png" alt="delete">
          </button>
        </td>
        </tr>
       `
       tabla.innerHTML = tabla.innerHTML + alunosHtml
        
    });
}

const carregarAlunos = async(parametroNãoObrigatorio = null) => {
  let inputText = ''
	if(parametroNãoObrigatorio){
		inputText = `?q=${parametroNãoObrigatorio}`
		console.log(inputText)
	}

    const response = await fetch (`https://api-final-project-pkm5.onrender.com/alunos${inputText}`)
    const listaAlunos = await response.json()
    alunos(listaAlunos)
}

const excluir = async (identificador) =>{
	try {
		await fetch(`https://api-final-project-pkm5.onrender.com/alunos/${identificador}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
			}
		});
		carregarAlunos()
	} catch (error) {
		console.error(error);
	}
};

search.addEventListener('keyup', (e) => {
	e.preventDefault()
	const inputData = search.value
	console.log(inputData)
	if (inputData === ''){
		carregarAlunos()
	}
	else if(e.key === 'Enter'){
		carregarAlunos(inputData)
	}
})

carregarAlunos()
usuario()