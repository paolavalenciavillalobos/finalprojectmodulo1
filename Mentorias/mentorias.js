//Functions para cada botão do html
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

function addNovaMentoria() {
  window.location = 'novamentoria.html'
}

function editar(identificador) {
  window.location = `editarmentoria.html?id=${identificador}`
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
//Pegar pelo ID o Input de pesquisa
const search = document.getElementById('search')

//function para cheiar a tabela com os dados da API do array
const mentorias = (parametromentores) => {
  const tabla = document.querySelector('.my-table tbody')
  tabla.innerHTML = ''
  //saber o tamanho do array para pasar Style no ultimo item da coleção
  const contarMentorias = parametromentores.length
  console.log(contarMentorias)
  parametromentores.forEach((item, index) => { // array da coleção
    let left = ""
    let right = ""
    if (contarMentorias === index + 1) {
      left = 'bottomleft'
      right = 'bottomright'
    }
    const mentoriashtml = //escrita HTML 
      `
        <tr>
        <td class="left ${left}">${item.titulo}</td>
        <td class="center">${item.mentor.nome}</td>
        <td class="center"><div class='status'>${item.status}</div></td>
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
    tabla.innerHTML = tabla.innerHTML + mentoriashtml
  });
  return tabla
}

//Function para dar um cor na div com a info da API

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

//Function para procurar todos os dados da coleção na API
const carregarTodosOsDados = async (parametroNãoObrigatorio = null) => {
  //parametro não obrigatorio para a function de pesquisa
  let inputText = ''
  if (parametroNãoObrigatorio) {
    inputText = `?q=${parametroNãoObrigatorio}`
    console.log(inputText)
  }

  const response = await fetch(`https://api-final-project-pkm5.onrender.com/mentorias${inputText}`)
  const todosOsDados = await response.json()
  mentorias(todosOsDados)
  statusDiv()
};

//function para excluir um item pelo ID
const excluir = async (identificador) => {
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

//escuta do input da pesquisa
search.addEventListener('keyup', (e) => {
  e.preventDefault()
  const inputData = search.value
  console.log(inputData)
  if (inputData === '') {
    carregarTodosOsDados()
  }
  else if (e.key === 'Enter') {
    carregarTodosOsDados(inputData)
  }
})

carregarTodosOsDados()
usuario()