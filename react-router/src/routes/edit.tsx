import React from "react";
//26 -> redirect
import { redirect, useNavigation } from "react-router-dom";

import { updateTodos } from "../contacts.js";

export async function action({ request, params }) {
  //25 -> accessing formData with request.formData() (it is not a part of react-router-dom, it is a part of web api)
  const formData = await request.formData();
  //26 -> "first" - name attribute of the input field
  const firstName = formData.get("first");

  const updates = Object.entries(formData);
  await updateTodos(updates);

  //27 -> after this action run the todos will be revalidated as loaders will re-run
  return redirect(`/contact/${params.contactId}`);
}

const Edit = () => {
  const navigation = useNavigation();

  return (
    <div>
      <Form method="post">
        {/* some form stuff */}

        {/* //33 -> browser back button */}
        <button onClick={navigation(-1)}>Cancel</button>
      </Form>
    </div>
  );
};

export default Edit;
