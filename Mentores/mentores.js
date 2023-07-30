//Functions para cada botão do html
function mentoriasButton() {
	window.location = `../Mentorias/mentorias.html`;
}

function mentoresButton() {
	window.location = `mentores.html`;
}

function turmasButton() {
	window.location = `../Turmas/turmas.html`;
}

function alunosButton() {
	window.location = `../Alunos/alunos.html`;
}


function addNovoMentor() {
	window.location = `novomentor.html`;
}


function editar(identificador) {
	window.location = `editarmentor.html?id=${identificador}`
}

//Pegar pelo ID o Input de pesquisa

const search = document.getElementById('search')

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

//funCtion para cheiar a tabela com os dados da API do array

const mentores = (mentores) => {
	const table = document.querySelector('.my-table tbody')
	table.innerHTML = ''
	//saber o tamanho do array para pasar Style no ultimo item da coleção
	const countMentores = mentores.length
	console.log(countMentores)
	mentores.forEach((item, index) => { // array da coleção
		console.log(index)
		let left = ""
		let right = ""
		if(countMentores === index + 1){
			left = 'bottomleft'
			right = 'bottomright'
		}
		const mentoreshtml = //escrita HTML 
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
		table.innerHTML = table.innerHTML + mentoreshtml //cheiar a tabela com todos os dados do array
		;
})}

//Function para procurar todos os dados da coleção na API
const todosOsMentores = async (parametroNãoObrigatorio = null) => {
	//parametro não obrigatorio para a function de pesquisa
	let inputText = ''
	if(parametroNãoObrigatorio){
		inputText = `?q=${parametroNãoObrigatorio}`
		console.log(inputText)
	}

    const response = await fetch(`https://api-final-project-pkm5.onrender.com/mentores${inputText}`)
    const mentoresData = await response.json()
    mentores(mentoresData)
}

//function para excluir um item pelo ID

const excluir = async (id) =>{
	try {
		await fetch(`https://api-final-project-pkm5.onrender.com/mentores/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
			}
		});
		todosOsMentores()
	} catch (error) {
		console.error(error);
	}
};

//escuta do input da pesquisa
search.addEventListener('keyup', (e) => {
	e.preventDefault()
	const inputData = search.value
	console.log(inputData)
	if (inputData === ''){
		todosOsMentores()
	}
	else if(e.key === 'Enter'){
		todosOsMentores(inputData)
	}
})

todosOsMentores()
usuario()