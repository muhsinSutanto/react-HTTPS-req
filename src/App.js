import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import TodoDetail from './components/TodoDetail';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      inputSubmit: '',
      inputSearch: ''
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

  deleteTodo = async index => {
    await axios
      .delete(`https://ib-api-todo-list.herokuapp.com/todos/${index}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    this.getAllTodos();
  }

  submitTodo = index => {
    axios
      .post(`https://ib-api-todo-list.herokuapp.com/todos/`, {
        description: this.state.inputSubmit,
        done: false
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    this.getAllTodos();
  }



  handleOnChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    return (
      <div> 
        <h1> Todo List</h1>
        <p> description </p>
       <input
        type = 'text'
        name = 'inputSubmit'
        value = {this.state.inputSubmit}
        onChange = {this.handleOnChange}
       /> 

       <button onClick={() => this.submitTodo()}> submit </button>
        <p> Search </p>
       <input
        type = 'text'
        name = 'inputSearch'
        value = {this.state.inputSearch}
        onChange = {this.handleOnChange}
       /> 

        {this.state.todos.map((todo, index) => (
          <TodoDetail 
            description = {todo.description} 
            done={todo.done} 
            index={index}
            deleteTodo={this.deleteTodo}/>
        ))}
      </div>
    );
  }
}

export default App;
