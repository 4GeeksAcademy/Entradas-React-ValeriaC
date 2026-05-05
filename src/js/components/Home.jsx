import React from "react";
import { useEffect, useState } from "react";

const Home = () => {

	const [list, setList] = useState([])
	const [input, setInput] = useState("")

	const [editInput, setEditInput] = useState("")
	const [editId, setEditId] = useState("")


	async function getTask() {
		let result = await fetch("https://playground.4geeks.com/todo/users/valeria77")
		let data = await result.json()

		setList(data.todos)
	}

	async function addTask() {
		let result = await fetch("https://playground.4geeks.com/todo/todos/valeria77", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				"label": input,
				"is_done": false,
			})
		})

		getTask()

	}

	async function deleteTask(id) {
		let result = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
		})

		getTask()
	}

	async function clearAll() {

		list.forEach((tarea) => {
			deleteTask(tarea.id)
		})

	}

	async function editTask(id) {
		let result = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				"label": editInput,
				"is_done": false,
			})
		})

		getTask()
	
	}

	useEffect(() => {
		getTask()
	}, [])


	return (
		<div className="container">
			<h1 className="text-center my-3">Lista de tareas</h1>

			<div>
				<input
					className="form-control form-control-lg"
					type="text"
					placeholder="Añadir tarea..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							addTask()
							setInput("")
						}
					}}
				/>
			</div>

			<div>
				{list.map((tarea, index) => (
					<div key={index} className="d-flex align-items-center border-bottom py-2">
						<span className="me-auto fs-5">{tarea.label}</span>

						<button onClick={() => deleteTask(tarea.id)}>x</button>

						<button data-bs-toggle="modal" data-bs-target="#editModal" 
						onClick={() => {
								setEditId(tarea.id)
								setEditInput("")
							}}
							>Editar</button>
						

					</div>
				))}

				<div className="modal fade" id="editModal" tabIndex="-1">
					<div className="modal-dialog">
						<div className="modal-content p-3">
							<input
								type="text"
								className="form-control mb-3"
								placeholder="Editar tarea..."
								value={editInput}
								onChange={(e) => setEditInput(e.target.value)}
							/>
							<button className="btn btn-primary" onClick={() => editTask(editId)}>Guardar</button>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-3">
				<button onClick={() => clearAll()}>Limpiar todo</button>
			</div>

		</div>
	);
};


export default Home;