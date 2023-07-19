const alunos = (parametroAlunos) => {
    const tabla = document.querySelector('.my-table tbody')
    tabla.innerHTML = ''
    parametroAlunos.forEach(element => {
        const alunosHtml =
        `
        <tr>
        <td class="left">${item.nome}</td>
        <td class="center">${item.email}</td>
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
       tabla.innerHTML = tabla.innerHTML + alunosHtml
        
    });
}

const carregarAlunos = async() => {
    const response = await fetch (`http://localhost:3000/alunos`)
    const listaAlunos = await response.json()
    alunos(listaAlunos)
}

carregarAlunos()