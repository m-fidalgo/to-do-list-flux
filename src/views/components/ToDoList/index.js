import React from "react";
import ToDoItem from "../ToDoItem";

function ToDoList(props) {
  function remove(id) {
    props.onRemove(id);
  }

  function update(item) {
    props.onUpdate(item);
  }

  if (props.items.length === 0) {
    return <div>No Items</div>;
  } else {
    return (
      <ul className="todo-list">
        {props.items.map((item) => (
          <ToDoItem
            key={item.id}
            item={item}
            onRemove={remove}
            onUpdate={update}
          />
        ))}
      </ul>
    );
  }
}

export default ToDoList;
