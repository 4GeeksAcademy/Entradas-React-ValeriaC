const ToDoItem = ({tarea, eliminar, index}) => {
    return (
        <div className="todo-item d-flex align-items-center justify-content-between">
            <span>{tarea}</span>
            <button className="btn-eliminar" onClick={() =>eliminar(index)}>X</button>
        </div>
    );
};

export default ToDoItem;
