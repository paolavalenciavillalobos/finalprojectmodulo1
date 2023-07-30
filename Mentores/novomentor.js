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

function back() {
	window.location = "mentores.html";
}

const formulario = document.getElementById('formulario')

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


//function para usar o metodo POST na API

const carregarMentores = async (mentor) => {
    try {
        await fetch('https://api-final-project-pkm5.onrender.com/mentores', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mentor)
        })
        window.location = 'mentores.html' 
    } catch (error) {
        console.error(error)
    }
}

//escuta do formulario

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    //valor de cada input

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value

    console.log(nome)

    //colocar os dados do input na API

    const mentorNovo = {
        nome, //nome na API e igual variable nome
        email,
    }

    carregarMentores(mentorNovo) //passar na function de POST as informaçoes da variable
    
})

usuario()