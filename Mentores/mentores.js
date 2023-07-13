function mentorias() {
	window.location = `mentorias.html`;
}

function mentores() {
	window.location = `mentores.html`;
}



function addNovoMentor() {
	//e.preventDefault()
	window.location = `novomentor.html`;
}


function editar(identificador) {
	window.location = `editarmentor.html?id=${identificador}`
}


//document.getElementById('novoMentor').addEventListener('click', novoMentor);



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

const todosOsMentores = async () => {
    const response = await fetch(`http://localhost:3000/mentores`)
    const mentoresData = await response.json()
    mentores(mentoresData)
}

const excluir = async (id) =>{
	try {
		await fetch(`http://localhost:3000/mentores/${id}`, {
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

todosOsMentores()