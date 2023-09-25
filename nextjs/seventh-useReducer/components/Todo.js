import { ACTIONS } from "../example/pages/example";

const Todo = ({ todo, dispatch }) => {

  const deleteTodo = () =>{
    //? 8
    dispatch({type: ACTIONS.DELETE_TODO, payload: {id: todo.id}});
  }
  
    return (
        <div>
            <div>{todo.name}</div>
            <button onClick={deleteTodo}>Delete</button>
        </div>
    );
};

export default Todo;


