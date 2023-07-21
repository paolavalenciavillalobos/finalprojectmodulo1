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

const formulario = document.getElementById('formulario')

const carregarAlunos = async (parametroAluno) => {
    try {
        await fetch('https://api-final-project-pkm5.onrender.com/alunos', {
            method: 'POST',
            Headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parametroAluno)
        })
        window.location = 'alunos.html'
    } catch (error) {
        console.error(error)
    }
}

formulario.addEventListener('submit', (e) =>{
    e.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value

    const alunoNovo = {
        nome,
        email,
    }

    carregarAlunos()
})