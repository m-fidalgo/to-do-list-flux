import React, { useState, useEffect } from "react";
import { ToDoService } from "./data/services/ToDoService";
import ToDoList from "./views/components/ToDoList";
import NewToDoItem from "./views/components/NewToDoItem";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  async function getItems() {
    const data = await ToDoService.list();
    setItems(data);
  }

  useEffect(() => {
    getItems();
  }, [items]);

  function add(description) {
    ToDoService.create({
      description: description,
      isChecked: false,
    }).then((newItem) => {
      setItems([...items, { newItem }]);
    });
  }

  function remove(id) {
    const list = items;
    const itemIndex = list.findIndex((item) => item.id === id);
    list.splice(itemIndex, 1);
    setItems(list);

    ToDoService.remove(id);
  }

  function update(newItem) {
    const list = items;
    const itemIndex = list.findIndex((item) => item.id === newItem.id);
    list[itemIndex] = newItem;
    setItems(list);

    ToDoService.update(newItem);
  }

  function clear() {
    const toDo = [];
    const done = [];
    const list = items;

    list.forEach((item) => {
      if (item.isChecked) {
        done.push(item);
      } else {
        toDo.push(item);
      }
    });

    done.forEach((item) => remove(item.id));
    setItems(toDo);
  }

  return (
    <div className="App">
      <NewToDoItem onAdd={add} />
      <hr />
      <button className="tw-btn" onClick={clear}>
        Limpar
      </button>
      <hr />
      <ToDoList items={items} onRemove={remove} onUpdate={update} />
    </div>
  );
}

export default App;
