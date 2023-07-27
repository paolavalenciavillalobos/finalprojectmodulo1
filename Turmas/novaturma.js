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

function back() {
	window.location = "turmas.html";
}

const formulario = document.getElementById('formulario')

const carregarMentor = async (id) => {
    if (id == null) {
        return false
    }
    const response = await fetch(`https://api-final-project-pkm5.onrender.com/mentores/${id}`)
    const mentor = await response.json()
    return mentor
}

const buscarMentores = async () => {
    const response = await fetch(`https://api-final-project-pkm5.onrender.com/mentores/`)
    const mentores = await response.json()
    return mentores
}

const mentoresSelect = async () => {
    const listaDeMentores = await buscarMentores()
    const mentoresFormulario = document.getElementById('selectMentores')

    listaDeMentores.forEach(item => {
        const option = new Option(item.nome, item.id)
        mentoresFormulario.options.add(option)
    });
    console.log(mentoresFormulario)
}

const carregarMentoria = async (id) => {
    if (id == null) {
        return false
    }
    const response = await fetch(`https://api-final-project-pkm5.onrender.com/mentorias/${id}`)
    const mentoria = await response.json()
    return mentoria
}

const buscarMentorias = async () => {
    const response = await fetch(`https://api-final-project-pkm5.onrender.com/mentorias/`)
    const mentorias = await response.json()
    return mentorias
}

const mentoriasSelect = async () => {
    const listaDeMentorias = await buscarMentorias()
    const mentoriasFormulario = document.getElementById('selectMentorias')

    listaDeMentorias.forEach(element => {
        const option = new Option(element.titulo, element.id)
        mentoriasFormulario.options.add(option)
    });
    console.log(mentoriasFormulario)
}

const novaTurma = async (turmaParametro) => {
    try {
        await fetch('https://api-final-project-pkm5.onrender.com/turmas', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(turmaParametro)
        })
        window.location = 'turmas.html'
    } catch (error) {
        console.error(error)
    }
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const mentores = formulario.elements['selectMentores'].value
    const mentorias = formulario.elements['selectMentorias'].value
    const data = formulario.elements['data'].value
    const semana = formulario.elements['selectSemana'].value
    const horaInicio = formulario.elements['horaInicio'].value
    const horaFinal = formulario.elements['horaFim'].value
    const titulo = formulario.elements['turma'].value
    const encontros = formulario.elements['encontros'].value

    const mentorObjeto = await carregarMentor(mentores)
    const mentoriasObjeto = await carregarMentoria(mentorias)

    const newTurma = {
        mentor: {
            nome: mentorObjeto.nome,
            id: mentorObjeto.id
        },
        mentoria: {
            titulo: mentoriasObjeto.titulo,
            id: mentoriasObjeto.id
        },
        data,
        dia: semana,
        horaInicio,
        horaFinal,
        titulo,
        encontros
    }
    novaTurma(newTurma)
}
)

mentoresSelect()
mentoriasSelect()
