function mentoriasButton() {
	window.location = `../mentorias/mentorias.html`;
}

function mentoresButton() {
	window.location = `../mentores/mentores.html`;
}

function turmasButton() {
	window.location = `turmas.html`;
}

function alunosButton() {
	window.location = `../alunos/alunos.html`;
}

const addNovaTurma = () => {
  window.location = 'novaturma.html'
}

const editar = (identificador) => {
	window.location = `editarturma.html?id=${identificador}`
}

const excluir = async (identificador) =>{
	try {
		await fetch(`https://api-final-project-pkm5.onrender.com/turmas/${identificador}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
			}
		});
		carregarTodosOsDados()
	} catch (error) {
		console.error(error);
	}
};

const turmasTabela = (parametroTurmas) => {
    const tabla = document.querySelector('.my-table tbody')
    tabla.innerHTML = ''
    parametroTurmas.forEach(elemento => {
        const turmasHtml =
        `
        <tr>
        <td class="left">${elemento.titulo}</td>
        <td class="left">${elemento.mentor.nome}</td>
        <td class="left">${elemento.mentoria.titulo}</td>
        <td class="center">${elemento.data}</td>
        <td class="center">${elemento.dia}</td>
        <td class="right">${elemento.horaInicio}-${elemento.horaFinal}</td>
        <td class="right">0/${elemento.encontros}</td>
        <td class="right"><div></div></td>
        <td class="right">
          <button class="editButton"onclick="editar(${elemento.id})">
            <img src="https://i.ibb.co/n6sqKDC/Subtract.png" alt="Subtract">
          </button>
          <button class="deleteButton" onclick="excluir(${elemento.id})">
            <img src="https://i.ibb.co/Ry7XDt6/delete.png" alt="delete">
          </button>
        </td>
        </tr>
       `
       tabla.innerHTML = tabla.innerHTML + turmasHtml
        
    });
}

const carregarTurmas = async () => {
    const response = await fetch ('https://api-final-project-pkm5.onrender.com/turmas')
    const todasAsTurmas = await response.json()
    turmasTabela(todasAsTurmas)
}

carregarTurmas()
