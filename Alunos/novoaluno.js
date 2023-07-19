const formulario = document.getElementById('formulario')

const carregarAlunos = async (parametroAluno) => {
    try {
        await fetch('http://localhost:3000/alunos', {
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