import React from "react";

const TodoDetail = props => {
  return (
    <div>
      Description : {props.description} <br />
      done: {JSON.stringify(props.done)}
      <button onClick={() => props.deleteTodo(props.index)}>delete</button>
    </div>
  );
};

export default TodoDetail;
