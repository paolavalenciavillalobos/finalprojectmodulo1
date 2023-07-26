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


function addNovoMentor() {
	window.location = `novomentor.html`;
}


function editar(identificador) {
	window.location = `editarmentor.html?id=${identificador}`
}

const search = document.getElementById('search')


const mentores = (mentores) => {
	const table = document.querySelector('.my-table tbody')
	table.innerHTML = ''
	mentores.forEach((item) => {
		const mentoreshtml =
		 `
		 <tr>
		 <td class="left">${item.nome}</td>
		 <td class="center">${item.email}</td>
		 <td class="right">
		   <button class="editButton"onclick="editar(${item.id})">
			 <img src="https://i.ibb.co/n6sqKDC/Subtract.png" alt="Subtract">
		   </button>
		   <button class="deleteButton" onclick="excluir(${item.id})">
			 <img src="https://i.ibb.co/Ry7XDt6/delete.png" alt="delete">
		   </button>
		 </td>
		 </tr>
		`
		table.innerHTML = table.innerHTML + mentoreshtml
		;
})}

const todosOsMentores = async (parametroNãoObrigatorio = null) => {
	let inputText = ''
	if(parametroNãoObrigatorio){
		inputText = `?q=${parametroNãoObrigatorio}`
		console.log(inputText)
	}

    const response = await fetch(`https://api-final-project-pkm5.onrender.com/mentores${inputText}`)
    const mentoresData = await response.json()
    mentores(mentoresData)
}

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