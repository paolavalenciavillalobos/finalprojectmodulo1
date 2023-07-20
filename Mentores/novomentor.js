function back() {
	window.location = "mentores.html";
}

const formulario = document.getElementById('formulario')


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

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value

    console.log(nome)

    const mentorNovo = {
        nome,
        email,
    }

    carregarMentores(mentorNovo)
})