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
      inputSearch: '',
      filteredTodos: []
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

  submitTodo = async index => {
    await axios
      .post(`https://ib-api-todo-list.herokuapp.com/todos/`, {
        description: this.state.inputSubmit,
        done: false
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
      this.getAllTodos()
  }

  handleSearch = async (e) => {
    await this.handleOnChange(e)
    axios
      .get(`https://ib-api-todo-list.herokuapp.com/todos/search?description=${this.state.inputSearch}`)
      .then(res => {console.log(res)
              this.setState({
                filteredTodos: res.data
              })})
      .catch(err => console.log(err))
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
        onChange = {this.handleSearch}
       />
       {/* <button onClick={() => this.handleSearch()}>search</button>  */}

        {this.state.inputSearch !== '' && this.state.filteredTodos.map((todo, index) => (
          <TodoDetail 
            description = {todo.description} 
            done={todo.done} 
            index={index}
            deleteTodo={this.deleteTodo}/>
        ))}

        {this.state.inputSearch === '' && this.state.todos.map((todo, index) => (
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
