import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
//3
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root.tsx";
import Error from "./error-page.tsx";
import Contact, {
  action as contactAction,
  loader as contactLoader,
} from "./routes/contact.tsx";

import Edit, { action as editAction } from "./routes/edit.tsx";
import Index from "./routes/index.tsx";

//50 -> instead of createBrowserRouter which uses "object" to create route we can also use "createRoutesFromElements" to create routes using "JSX"

//4
const router = createBrowserRouter([
  {
    path: "/",
    //7
    element: <Root />,
    //11
    errorElement: <Error />,
    //17
    loader: rootLoader,
    //13 -> render contact page inside root page
    children: [ 
      //32
      // {
      //   index: true,
      //   element: <Index />,
      // },
      // {
      //   path: "/contact/:contactId",
      //   element: <Contact />,
      //   loader: contactLoader,
      // },

      //49 -> pathless route - route handlers can be used without path
      // to render the error component in the root layout
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "/contact/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
        ],
      },

      //24
      {
        path: "/contact/:contactId/edit",
        element: <Edit />,
        action: editAction,
      },
    ],
  },
  {
    //12 -> :contactId - turn it into a dynamic route
    path: "/contact/:contactId",
    element: <Contact />,
    errorElement: <Error />,
    //22
    action: contactAction,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* //5 */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
