const formulario = document.getElementById('formulario')

let id;

const searchId = async () => {
    const parametro = window.location.search
    const getParametro = new URLSearchParams(parametro)
    id = getParametro.get('id')
    return id
}

const carregarAlunos = async() => {
    const response = await fetch(`http://localhost:3000/alunos/${id}`)
    const alunos = await response.json()
    return alunos
}

const editarAluno = async (parametroaluno) => {
    await fetch(`http://localhost:3000/mentores/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parametroaluno)
    })
    window.location = 'alunos.html'
}

const carregarValores = async (parametro) => {
    document.getElementById('nome').value = parametro.nome 
    document.getElementById('email').value = parametro.email
}

const parametrosId = async () => {
    searchId()
    const data = await carregarAlunos()
    editarAluno(data)
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value


    const alunosUpdate = {
        nome,
        email,
    }

    editarAluno(alunosUpdate)
})

parametrosId()