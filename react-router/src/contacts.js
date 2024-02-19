import axios from "axios";

export async function getTodos() {
  const data = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return data;
}

export async function createTodo() {
  console.log("react query code to create contact");
}
