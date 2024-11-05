import React, { useState } from "react";
import { InputGroup, Input, Button, InputGroupText } from "reactstrap";

const SingleTodo = ({ text, completed, dispatchAction, id, editMode }) => {
  const [inputVal, setInputVal] = useState(text);

  const handleSaveClick = () => {
    if (editMode) {
      if (inputVal.trim() !== "") {
        dispatchAction({
          type: "save_todo",
          payload: { id, text: inputVal },
        });
      } else {
        alert("Type a text in the input box.");
      }
    } else {
      dispatchAction({
        type: "edit_todo",
        payload: id,
      });
    }
  };

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  return (
    <InputGroup style={{ marginBottom: "2px" }}>
      <InputGroupText>
        <Input
          checked={completed}
          onChange={(e) =>
            dispatchAction({
              type: "complete_todo",
              payload: {
                checked: e.target.checked,
                id: id,
              },
            })
          }
          addon
          aria-label="Checkbox for following text input"
          type="checkbox"
        />
      </InputGroupText>
      <Input
        disabled={!editMode}
        value={inputVal}
        className={completed ? "cross" : ""}
        onChange={handleInputChange}
      />
      <Button
        onClick={handleSaveClick}
        color={editMode ? "primary" : "secondary"}
      >
        {editMode ? "Save" : "Edit"}
      </Button>
      <Button
        onClick={() =>
          dispatchAction({
            type: "delete_todo",
            payload: id,
          })
        }
        color="danger"
      >
        Delete
      </Button>
    </InputGroup>
  );
};

export default SingleTodo;
