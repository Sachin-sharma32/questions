import React from "react";
//19 -> Form - the default behavior of form is to send a request to server
// react-router-dom provides a way to prevent this default behavior
// the request will be send to "action"
import { Form } from "react-router-dom";

import { createTodo, getTodo } from "../contacts.js";

//20
export async function action() {
  const todo = createTodo();
  return { todo };
}

//23 -> params - the dynamic route params
export async function loader({ params }) {
  const contact = await getTodo(params.contactId);
  //48 -> if the path like /contact/something not found then this error will be caught by the errorElement of the route
  // to make the error message more meaningful  and short
  if(!contact){
    throw new Response("",{
        status:404,
        statusText:"Not Found"
    })
  }
  return { contact };
}

const Contact = () => {
  return (
    <div>
      {/* //21 */}
      {/* // react router will automatically revalidate the data in loader after the "action" is complete */}
      <Form method="post">
        <button type="submit">Create Todo</button>
      </Form>

      {/* //30 -> action='delete' - this will send the request to /contact/:contactId/destroy */}
      {/* make destroy.tsx, add "action" to delete the todo, add it in main.tsx */}
      <Form method="post" action="destroy">
        <button type="submit">Delete Todo</button>
      </Form>
    </div>
  );
};

export default Contact;
