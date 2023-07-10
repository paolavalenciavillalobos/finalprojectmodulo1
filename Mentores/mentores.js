

const mentores = (mentores) => {
	const table = document.querySelector('.my-table tbody')
	table.innerHTML = ''
	mentores.forEach((item) => {
		const mentoreshtml =
		 `
		 <td class="left">${item.nome}</td>
		 <td class="center">${item.email}</td>
		 <td class="right">
		   <button class="editButton">
			 <img src="https://i.ibb.co/n6sqKDC/Subtract.png" alt="Subtract">
		   </button>
		   <button class="deleteButton">
			 <img src="https://i.ibb.co/Ry7XDt6/delete.png" alt="delete">
		   </button>
		 </td>
		`
		table.innerHTML = table.innerHTML + mentoreshtml
		;
})}

const todosOsMentores = async () => {
    const response = await fetch(`http://localhost:3000/mentores`)
    const mentoresData = await response.json()
    mentores(mentoresData)
}

todosOsMentores()