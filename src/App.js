import React, { Component } from "react";
import ToDoList from "./views/components/ToDoList";
import NewToDoItem from "./views/components/NewToDoItem";
import ToDoActions from "./data/actions/ToDoActions";
import ToDoStore from "./data/stores/ToDoStore";
import "./App.css";

async function getToDoState() {
  return {
    items: await ToDoStore.getAll(),
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this._onChange = this._onChange.bind(this);
    this._onChange();
  }

  componentDidMount() {
    ToDoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ToDoStore.removeChangeListener(this._onChange);
  }

  async _onChange() {
    const data = await getToDoState();
    this.setState(data);
  }

  render() {
    return (
      <div className="App">
        <NewToDoItem onAdd={ToDoActions.create} />
        <hr />
        <button className="tw-btn" onClick={ToDoActions.clear}>
          Limpar
        </button>
        <hr />
        <ToDoList
          items={this.state.items}
          onRemove={ToDoActions.remove}
          onUpdate={ToDoActions.update}
        />
      </div>
    );
  }
}

export default App;
