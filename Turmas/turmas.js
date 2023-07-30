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

const addNovaTurma = () => {
  window.location = 'novaturma.html'
}

const editar = (identificador) => {
  window.location = `editarturma.html?id=${identificador}`
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

const excluir = async (identificador) => {
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
  const contarTurmas = parametroTurmas.length
  parametroTurmas.forEach((elemento, index) => {
    let left = ""
    let right = ""
    if (contarTurmas === index + 1) {
      left = 'bottomleft'
      right = 'bottomright'
    }
    const turmasHtml =
      `
        <tr>
        <td class="left ${left}">${elemento.titulo}</td>
        <td class="left">${elemento.mentor.nome}</td>
        <td class="left">${elemento.mentoria.titulo}</td>
        <td class="center">${elemento.data}</td>
        <td class="center">${elemento.dia}</td>
        <td class="right">${elemento.horaInicio}-${elemento.horaFinal}</td>
        <td class="right">0/${elemento.encontros}</td>
        <td class="rightButton ${right}">
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

const carregarTurmas = async (parametroNãoObrigatorio = null) => {
  let inputText = ''
  if (parametroNãoObrigatorio) {
    inputText = `?q=${parametroNãoObrigatorio}`
    console.log(inputText)
  }

  const response = await fetch(`https://api-final-project-pkm5.onrender.com/turmas${inputText}`)
  const todasAsTurmas = await response.json()
  turmasTabela(todasAsTurmas)
}

search.addEventListener('keyup', (e) => {
  e.preventDefault()
  const inputData = search.value
  console.log(inputData)
  if (inputData === '') {
    carregarTurmas()
  }
  else if (e.key === 'Enter') {
    carregarTurmas(inputData)
  }
})

carregarTurmas()
usuario()
