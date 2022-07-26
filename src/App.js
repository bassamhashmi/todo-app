import TodoList from "./Components/TodoList";
import "./App.css";
import data from "./data.json";

function App() {
    return (
        <div className="App">
            <TodoList data={data} />
        </div>
    );
}

export default App;
