import { InputGroup, Input, Button, List } from "reactstrap";
import SingleTodo from "./components/SingleTodo";
import { useRef } from "react";
import { useMyCustomHook } from "./hooks/custom";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const [state, dispatch] = useMyCustomHook();

  const handleAddTodo = () => {
    const value = inputRef.current.value;

    if (value.trim() !== "") {
      dispatch({
        type: "add_new_todo",
        payload: value,
      });
    } else {
      alert("Type a text in the input box.");
    }
    inputRef.current.value = "";
  };

  return (
    <div className="App">
      <h1>Todo List React App</h1>
      <InputGroup>
        <Input innerRef={inputRef} />
        <Button onClick={handleAddTodo} color="primary">
          Add Todo
        </Button>
      </InputGroup>
      <main>
        <List style={{ padding: "0" }}>
          {Object.entries(state.todos).map(([todoId, todoValue]) => {
            const editMode = todoId === state.editId;

            return (
              <SingleTodo
                key={todoId}
                id={todoId}
                dispatchAction={dispatch}
                {...todoValue}
                editMode={editMode}
              />
            );
          })}
        </List>
      </main>
      <footer>
        <Button
          onClick={() =>
            dispatch({
              type: "clear_all",
            })
          }
          color="danger"
        >
          Clear All Todos
        </Button>
        <Button
          onClick={() =>
            dispatch({
              type: "clear_completed_todos",
            })
          }
          color="danger"
        >
          Clear Completed Todos
        </Button>
      </footer>
    </div>
  );
}

export default App;
