function back() {
	window.location = "mentores.html";
}

//Pegar o formulario desde o Id no html
const formulario = document.getElementById('formulario')

//declarar una variavel global para guardar a informação
let id;


//usar um id unico na url para cada objeto modificavel da API
const parametrosId = async () => {
    console.log(window.location.search)
    const parametro = window.location.search
    const getParametro = new URLSearchParams(parametro)
    id = getParametro.get('id')
    return id

}

//carregar toda a informção da API

const carregarMentores = async () => {
    const response = await fetch(`http://localhost:3000/mentores/${id}`)
    const mentores = await response.json()
    console.log(mentores)
    return mentores
}


//Editar a informação da API
const editarMentores = async (mentor) => {
    await fetch(`http://localhost:3000/mentores/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentor)
    })
    window.location = 'mentores.html'
}

//Pegar os dados do input
const editarFormularioMentores = async (parametroeditar) => {
    document.getElementById('nome').value = parametroeditar.nome
    document.getElementById('email').value = parametroeditar.email
}


const atualizarDadosProntos = async () => {
    parametrosId()
    console.log(id)
    const mentorEditado = await carregarMentores()
    editarFormularioMentores(mentorEditado)
}

//finalmente atualizar os dados na api
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value


    const mentoresUpdate = {
        nome,
        email,
    }

    editarMentores(mentoresUpdate)
})

atualizarDadosProntos()