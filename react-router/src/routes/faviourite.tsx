import React from "react";
//44 -> allow us to communicate with loader and action without causing navigation (to update the UI)
import { useFetcher } from "react-router-dom";

const Faviourite = ({ contact }) => {
  //45
  const fetcher = useFetcher();
  let favorite = contact.favourite;

  //47 -> optimistic UI - to update the favorite before the update request to the backend is completed (to make it instantaneous)
  // if the request from the server fails of any other error then favorites will revert back to it's original state
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <div>
      {/* //46 -> this will trigger the action/loader where the "contact" is coming from where we can update the todo to add remove favorite field */}
      <fetcher.Form method="post">
        <button type="submit" value={favorite ? "false" : "true"} name="favorite">
          {favorite ? "⭐" : "💀"}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default Faviourite;
