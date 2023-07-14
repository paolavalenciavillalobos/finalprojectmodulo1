function addNovaMentoria () {
    window.location = 'novamentoria.html'
}



const mentorias = (parametromentores) => {
    const tabla = document.querySelector('.my-table tbody')
    tabla.innerHTML = ''
    parametromentores.forEach((item) => {
        const mentoriashtml =
        `
        <tr>
        <td class="left">${item.titulo}</td>
        <td class="center">${item.mentor.nome}</td>
        <td class="right"><div></div></td>
        <td class="right">
          <button class="editButton"onclick="editar(${item.id})">
            <img src="https://i.ibb.co/n6sqKDC/Subtract.png" alt="Subtract">
          </button>
          <button class="deleteButton" onclick="excluir(${item.id})">
            <img src="https://i.ibb.co/Ry7XDt6/delete.png" alt="delete">
          </button>
        </td>
        </tr>
       `
       tabla.innerHTML = tabla.innerHTML + mentoriashtml
    });
}

const carregarTodosOsDados = async () => {
    const response = await fetch ('http://localhost:3000/mentorias')
    const todosOsDados = await response.json()
    mentorias(todosOsDados)
};

carregarTodosOsDados()