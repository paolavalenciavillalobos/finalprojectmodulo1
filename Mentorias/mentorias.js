function mentoriasButton() {
	window.location = `mentorias.html`;
}

function mentoresButton() {
	window.location = `../mentores/mentores.html`;
}

function turmasButton() {
	window.location = `../turmas/turmas.html`;
}

function alunosButton() {
	window.location = `../alunos/alunos.html`;
}

function addNovaMentoria () {
    window.location = 'novamentoria.html'
}

function editar(identificador) {
	window.location = `editarmentoria.html?id=${identificador}`
}


const mentorias = (parametromentores) => {
    const tabla = document.querySelector('.my-table tbody')
    tabla.innerHTML = ''
    parametromentores.forEach((item) => {
        const mentoriashtml =
        `
        <tr>
        <td class="left">${item.titulo}</td>
        <td class="center">${item.mentor.nome}</td>
        <td class="right"><div class='status'>${item.status}</div></td>
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
       tabla.innerHTML = tabla.innerHTML + mentoriashtml
    });
    return tabla
}

const statusDiv = () => {
  const divsStatus = document.querySelectorAll('.status');
  divsStatus.forEach((div) => {
      const statusValue = div.textContent.trim() // Obtener el valor del status
      if (statusValue === 'ativo') {
          div.style.backgroundColor = '#D9FEE6'; 
          div.style.color = '#00C247';
      } else if (statusValue === 'inativo') {
          div.style.backgroundColor = '#FFE1E1'; 
          div.style.color = '#FF3333';
      }
  });
}

const carregarTodosOsDados = async () => {
    const response = await fetch ('https://api-final-project-pkm5.onrender.com/mentorias')
    const todosOsDados = await response.json()
    mentorias(todosOsDados)
    statusDiv()
};

const excluir = async (identificador) =>{
	try {
		await fetch(`https://api-final-project-pkm5.onrender.com/mentorias/${identificador}`, {
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



carregarTodosOsDados()