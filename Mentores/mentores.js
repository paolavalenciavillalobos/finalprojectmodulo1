function mentoriasButton() {
	window.location = `../mentorias/mentorias.html`;
}

function mentoresButton() {
	window.location = `mentores.html`;
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
	let inputData = ''
	if(parametroNãoObrigatorio){
		inputData = `?q=${parametroNãoObrigatorio}`
	}

    const response = await fetch(`https://api-final-project-pkm5.onrender.com/mentores${inputData}`)
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