import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import TodoDetail from './components/TodoDetail';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    this.getAllTodos();
  }

  getAllTodos = () => {
    axios
      .get("https://ib-api-todo-list.herokuapp.com/todos")
      .then(res =>
        this.setState({
          todos : res.data.data
        })
      )
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div> 
        <h1> Todo List</h1>
        {this.state.todos.map(todo => (
          <TodoDetail description = {todo.description} done={todo.done} />
        ))}
      </div>
    );
  }
}

export default App;
