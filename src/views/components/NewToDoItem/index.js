import React, { useState } from "react";

function NewToDoItem(props) {
  const [description, setDescription] = useState("");

  function add(e) {
    e.preventDefault();
    if (description) {
      props.onAdd(description);
      setDescription("");
    }
  }

  return (
    <form onSubmit={add}>
      <input
        className="tw-input"
        type="text"
        placeholder="Novo Item"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="tw-btn">Adicionar</button>
    </form>
  );
}

export default NewToDoItem;
