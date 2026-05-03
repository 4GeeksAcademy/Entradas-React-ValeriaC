import React from "react";
import { useEffect, useState } from "react";

const Home = () => {

	const [list, setList] = useState([])
	const [input, setInput] = useState("")

	async function getTask() {
		let result = await fetch("https://playground.4geeks.com/todo/users/Valeria123")
		let data = await result.json()

		setList(data.todos)
		console.log(list)
	}

	async function addTask() {
		let result = await fetch("https://playground.4geeks.com/todo/todos/Valeria123", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				"label": input,
				"is_done": false,
			})
		})

		await getTask()

	}

	async function deleteTask(id) {
		let result = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
		})

		await getTask()
	}

	async function clearAll() {

		list.forEach((tarea) => {
			deleteTask(tarea.id)
		})

	}

	useEffect(() => {
		getTask()
	}, [])


	return (
		<div className="container text-center mt-5 w-50">
			<h1>Lista de tareas</h1>

			<div>
				<input
					className=""
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

			<div className="w-50 mx-auto">
				{list.map((tarea, index) => (
					<div key={index} className="d-flex justify-content-between align-items-center border-bottom py-2 fs-5">
						{tarea.label}

						<button onClick={() => deleteTask(tarea.id)}>X</button>
					</div>
				))}
			</div>
			<div className="mt-3">
				<button onClick={() => clearAll()}>Limpiar todo</button>
			</div>

		</div>
	);
};

export default Home;