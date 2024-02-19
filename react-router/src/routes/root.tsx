import React, { useEffect } from "react";
import {
  Outlet,
  Link,
  useLoaderData,
  NavLink,
  useNavigation,
  useSubmit,
  Form
} from "react-router-dom";
import { getTodos } from "../contacts.js";

//6 -> create routes folder .
const Root = () => {
  //29  provide UI feedback when navigating between routes
  const navigation = useNavigation();

  //41 -> searching - can be used to show loading spinner when the data is loading
  // navigation.loading -> when navigation to new URL and loading data for that URL
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).get("q");

  //18
  const { contacts, q } = useLoaderData();

  //39
  const submit = useSubmit();

  //36 -> add defaultValue={q} - to the search input coz:
  // after refreshing page the input value will stay

  //37 -> to remove the input value after clicking browser back
  useEffect(() => {
    document.getElementById("id-of-input")!.value = q;
  }, [q]);

  console.log(contacts);
  return (
    <div style={{ display: "flex" }}>
      {/* //14 -> Outlet - where to render the nested route */}
      {/*  nested route can be used to create documentation like page */}
      {/* //31 -> /routes/index.js - default nested route when non of the route is clicked*/}
      <div>
        <div className={navigation.state === "loading" ? "loading" : ""} />
        <Outlet />
      </div>
      <h1>hello world</h1>
      {/* //15 -> Link - client side routing */}
      {/* // in client side routing the browser don't send a new request to server to request for resources */}
      {/* // instead the UI is rendered immediately */}
      <Link to={`/contact/1`}>Contact 1</Link>

      {/* //28 -> "active" link styling */}
      {/* isPending -> link is clicked but data is loading */}
      {contacts.map((contact) => (
        <NavLink
          to={`/contacts/${contact.id}`}
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : ""
          }
        >
          {contact.name}
        </NavLink>
      ))}

      {/* //38 */}
      <Form>
        <input
          type="text"
          id="q"
          defaultValue={q}
          name="q"
          //40 -> submit the form when input value changes
          // currentTarget.form -> input's parent <Form>
          onChange={(e) => {
            //42 -> when we see the browser history then every search in search field will add in history coz it behaves like a link
            // so we have to remove it from history
            const isFirstSearch = q == null;
            submit(e.currentTarget.form, {
              //43
              replace: !isFirstSearch,
            });
          }}
        />
      </Form>
    </div>
  );
};

//16 -> loader function (load dynamic data)
//34 -> request object
export async function loader({ request }) {
  //   const contacts = await getTodos();

  //35 -> the default behavior of react-router <Form> is "get"
  // when we type in <input> in "get" request then that data is added in url as query params /?q=hello
  // "get" requests are not caught by "action" so we need to catch it here
  // with "get" request the behavior is same as when clicking on a link
  const url = new URL(request.url);
  // q -> "name" attribute of the input field
  const q = url.searchParams.get("q");
  const contacts = await getTodos(q);

  return { contacts, q };
}

export default Root;
