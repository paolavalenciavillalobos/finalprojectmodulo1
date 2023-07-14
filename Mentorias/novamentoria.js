const formulario = document.getElementById('formulario')

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

const novaMentoria = async(mentorparametro) => {
    try {
        await fetch('http://localhost:3000/mentorias', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mentorparametro)
        })
        window.location = 'mentorias.html'
    } catch (error) {
        console.error(error)
    }
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

    novaMentoria(mentoriaNova)
})

mentoresSelect()