function entrar() {
	window.location = `Mentores/mentores.html`;
}

const formulario = document.getElementById('formulario')

const input = document.getElementById('senha');
const label = document.getElementById('label');
const email = document.getElementById('email');
const emailLabel = document.getElementById('emailLabel');

input.addEventListener('input', () => {
    if (input.value !== '') {
        input.style.borderColor = '#00C247';
        label.style.color = '#00C247';
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


const getUser = async (user) => {
    try {
        await fetch('https://api-final-project-pkm5.onrender.com/Usuario', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        window.location = 'login.html'
    } catch (error) {
        console.error(error)
    }
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = formulario.elements['email'].value
    const senha = formulario.elements['senha'].value

    console.log(email)

    const usuario = {
        email,
        senha,
    }

    getUser(usuario)
})
