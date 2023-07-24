function mentoriasButton() {
	window.location = `../mentorias/mentorias.html`;
}

function mentoresButton() {
	window.location = `../mentores/mentores.html`;
}

function turmasButton() {
	window.location = `../turmas/turmas.html`;
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

const alunos = (parametroAlunos) => {
    const tabla = document.querySelector('.my-table tbody')
    tabla.innerHTML = ''
    parametroAlunos.forEach(item => {
        const alunosHtml =
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
       tabla.innerHTML = tabla.innerHTML + alunosHtml
        
    });
}

const carregarAlunos = async() => {
    const response = await fetch (`https://api-final-project-pkm5.onrender.com/alunos`)
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

carregarAlunos()