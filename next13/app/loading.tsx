import React from "react";

// this component lives inside <Layout>
// it wraps <Page>
// this component will be trigged as a suspense boundary around the route segment
// to stream individual components inside this route segment we can manually add <Suspense> to those components
export default function Loading() {
  return <SomeLoadingIndicator />;
}


