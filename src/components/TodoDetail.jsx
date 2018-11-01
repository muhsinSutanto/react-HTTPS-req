import React from "react";

const TodoDetail = (props) => {
  return (
    <div>
      Description : {props.description} <br />
      done: {JSON.stringify(props.done)}
    </div>
  );
};

export default TodoDetail;
