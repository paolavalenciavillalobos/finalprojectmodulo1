//pegar o formulario pelo id
const formulario = document.getElementById('formulario')

//pegar os elementos dentro formulario pelo id
const input = document.getElementById('senha');
const label = document.getElementById('label');
const email = document.getElementById('email');
const emailLabel = document.getElementById('emailLabel');

//escuta dos input
input.addEventListener('input', () => {
    if (input.value !== '') {
        input.style.borderColor = '#00C247';//add color no border
        label.style.color = '#00C247';//add color na letra
    } else {
        input.style.borderColor = ''; 
        label.style.color = ''; 
    }
});

email.addEventListener('input', () => {
    if (email.value !== '') {
        email.style.borderColor = '#00C247';
        emailLabel.style.color = '#00C247';
    } else {
        email.style.borderColor = ''; 
        emailLabel.style.color = ''; 
    }
});

//metodo post para pegar guardar os dados do input
const getUser = async (user) => {
    try {
        await fetch('https://api-final-project-pkm5.onrender.com/usuario', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        window.location = 'Mentores/mentores.html'//mandar para a pagina inicial do app
    } catch (error) {
        console.error(error)
    }
}

//escuta do formulario para mandar os dados do input
formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = formulario.elements['email'].value//pegar o valor do input
    const senha = formulario.elements['senha'].value

    console.log(email)

    const usuario = {
        email,
        senha,
    }

    getUser(usuario)
})
