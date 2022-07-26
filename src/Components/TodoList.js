import React from "react";

const TodoList = ({ data }) => {
    const [todoList, setTodoList] = React.useState(data);

    const [isEditing, setIsEditing] = React.useState(false);

    const [currentTodo, setCurrentTodo] = React.useState({});

    const [input, setInput] = React.useState("");

    const ref = React.useRef(null);

    // Add
    const changeHandler = (event) => {
        setInput(event.currentTarget.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (input !== "") {
            setTodoList([
                {
                    id: todoList.length + 1,
                    task: input.trim(),
                    done: false,
                },
                ...todoList,
            ]);
        }
        setInput("");
    };

    //////////////////////////////

    // Edit
    const editClickHandler = (todo) => {
        setIsEditing(true);
        setCurrentTodo({ ...todo });
        ref.current.focus();
    };

    const onEditChange = (event) => {
        setCurrentTodo({ ...currentTodo, task: event.target.value });
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        updateTodoHandler(currentTodo.id, currentTodo);
    };

    const updateTodoHandler = (id, updatedTodo) => {
        const updatedTask = todoList.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setIsEditing(false);
        setTodoList(updatedTask);
    };

    //////////////////////

    // Delete
    const deleteHandler = (id) => {
        const removeTask = todoList.filter((todo) => {
            return todo.id !== id;
        });
        setTodoList(removeTask);
    };

    // Inline styles

    const myStyle = {
        marginRight: "20px",
    };
    //////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////

    return (
        <div className="TDLContainer">
            <h1>Todo App</h1>

            {isEditing ? (
                <form onSubmit={handleEditFormSubmit}>
                    <div>
                        <input
                            autoFocus
                            name="editTodo"
                            value={currentTodo.task}
                            type="text"
                            onChange={onEditChange}
                            placeholder="Enter task to do here..."
                            ref={ref}
                        />
                    </div>
                    <div style={myStyle}>
                        <button type="submit" className="btnForm">
                            Update
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="btnForm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <input
                        name="todo"
                        value={input}
                        type="text"
                        onChange={changeHandler}
                        placeholder="Enter task to do here..."
                    />
                    <button type="submit" className="btnForm" style={myStyle}>
                        Add
                    </button>
                </form>
            )}

            {todoList.map((todo) => {
                return (
                    <div className="todo">
                        <div>
                            <span key={todo.id}>{todo.task}</span>
                        </div>
                        <div>
                            <button
                                class="btnList"
                                onClick={() => editClickHandler(todo)}
                            >
                                Edit
                            </button>
                            <button
                                class="btnList"
                                onClick={() => deleteHandler(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TodoList;
