import ToDoItem from "./ToDoItem";
import { useState } from "react";

const ToDoList = () => {
    const [list, setList] = useState([]);
    const [valor, setValor] = useState("");

    const eliminar = (index) => {
        setList(list.filter((_, i) => i !== index));
    }

    return (
        <div className="container mt-5 w-25 h-75">
            <h1>To Do List</h1>
            <input type="text" placeholder="Escribe tu tarea..." value={valor} onChange={(e) =>
                setValor(e.target.value)} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setList([...list, valor]);
                        setValor("");
                    }
                }} />

            {list.length === 0 ? <p>No hay tareas, añadir tareas</p> : list.map((tarea, index) => (
               <ToDoItem tarea={tarea} key={index} index={index} eliminar={eliminar} /> 
            ))}

            <p className="text-muted small">{list.length} tareas pendientes</p>
        </div>
    );
};

export default ToDoList;
