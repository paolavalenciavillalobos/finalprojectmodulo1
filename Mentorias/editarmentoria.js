const formulario = document.getElementById('formulario')

let id;

const urlId = async () => {
    const parametroUrl = window.location.search
    const getParametro = new URLSearchParams (parametroUrl)
    id = getParametro.get ('id')
    return id
}

const buscarMentor = async (id) => {
    if(id == null){
        return false
    }
    const response = await fetch (`http://localhost:3000/mentores/${id}`)
    const mentor = await response.json()
    return mentor
}

const buscarMentores = async () => {
    const response = await fetch (`http://localhost:3000/mentores/`)
    const mentores = await response.json()
    return mentores
}

const mentoresSelect = async() => {
    const listaDeMentores = await buscarMentores()
    const mentoresFormulario = document.getElementById('selectMentores')

    listaDeMentores.forEach(theMentor => {
        const option = new Option (theMentor.nome , theMentor.id)
        mentoresFormulario.options.add(option)
    });
    console.log(mentoresFormulario)
}

const carregarMentorias = async () => {
    const response = await fetch(`http://localhost:3000/mentorias/${id}`)
    const mentoria = await response.json()
    console.log(mentoria)
    return mentoria
}

const editarMentorias = async (mentoria) => {
    await fetch(`http://localhost:3000/mentorias/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentoria)
    })
    window.location = 'mentorias.html'
}

const editarFormularioMentorias = async (parametroeditar) => {
    document.getElementById('mentoria').value = parametroeditar.titulo
    document.getElementById('selectMentores').value = parametroeditar.mentor.id
}


const atualizarDadosProntos = async () => {
    urlId()
    console.log(id)
    const mentoriaEditada = await carregarMentorias()
    editarFormularioMentorias(mentoriaEditada)
}

formulario.addEventListener('submit', async(e) => {
    e.preventDefault()

    const mentoria = formulario.elements['mentoria'].value
    const mentor = formulario.elements['selectMentores'].value

    const mentorObjeto = await buscarMentor(mentor)

    console.log(mentoria)

    const mentoriaNova = {
        titulo: mentoria,
        mentor: { 
            nome: mentorObjeto.nome,
            id: mentorObjeto.id

        }
    }

    editarMentorias(mentoriaNova)
})

mentoresSelect()
atualizarDadosProntos()