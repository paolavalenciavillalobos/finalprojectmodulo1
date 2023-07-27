function mentoriasButton() {
	window.location = `../Mentorias/mentorias.html`;
}

function mentoresButton() {
	window.location = `../Mentores/mentores.html`;
}

function turmasButton() {
	window.location = `../Turmas/turmas.html`;
}

function alunosButton() {
	window.location = `alunos.html`;
}

function back() {
	window.location = "alunos.html";
}

const formulario = document.getElementById('formulario')
console.log(formulario)

const buscarMentoria = async (id) => {
    if(id == null){
        return false
    }
    const response = await fetch (`https://api-final-project-pkm5.onrender.com/mentorias/${id}`)
    const mentoria = await response.json()
    return mentoria
}

const buscarMentorias = async () => {
    const response = await fetch (`https://api-final-project-pkm5.onrender.com/mentorias/`)
    const mentorias = await response.json()
    return mentorias
}

const mentoriasSelect = async() => {
    const listaDeMentorias = await buscarMentorias()
    console.log(buscarMentorias)
    const mentoriasFormulario = document.getElementById('selectMentorias')

    listaDeMentorias.forEach(item => {
        const option = new Option (item.titulo , item.id)
        mentoriasFormulario.options.add(option)
    });
    console.log(mentoriasFormulario)
    console.log(mentoriasSelect)
}

const carregarAlunos = async (parametroAluno) => {
    try {
        await fetch('https://api-final-project-pkm5.onrender.com/alunos', {
            method: 'POST',
            headers: {
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

formulario.addEventListener('submit', async(e) =>{
    e.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value
    const mentoria = formulario.elements['selectMentorias'].value

    console.log(nome)

    const mentoriaObjeto = await buscarMentoria(mentoria)

    const alunoNovo = {
        nome,
        email,
        mentoria:{
            titulo: mentoriaObjeto.titulo,
            id: mentoriaObjeto.id
        }
    }

    carregarAlunos(alunoNovo)
})

mentoriasSelect()