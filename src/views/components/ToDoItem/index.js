import React, { useRef } from "react";

function ToDoItem(props) {
  const input = useRef();

  function remove() {
    props.onRemove(props.item.id);
  }

  function update() {
    const item = props.item;
    item.description = input.current.value;
    props.onUpdate(item);
  }

  function check() {
    const item = props.item;
    item.isChecked = !item.isChecked;
    props.onUpdate(item);
  }

  return (
    <li className="todo-list-item">
      <input
        className="tw-check"
        type="checkbox"
        checked={props.item.isChecked}
        onChange={check}
      />
      <input
        className="tw-input"
        type="text"
        disabled={props.item.isChecked}
        defaultValue={props.item.description}
        ref={input}
        onBlur={update}
      />
      <button className="tw-btn" onClick={remove}>
        X
      </button>
    </li>
  );
}

export default ToDoItem;
