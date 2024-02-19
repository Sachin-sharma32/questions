import React from "react";
import dynamic from "next/dynamic";

// removing caching for all fetch request in this route segment
export const dynamic = "no-cache";

// fetching data on server with fetch
async function getData() {
  const res = await fetch("https://someapi/products", {
    // time based revalidation
    //* next: { revalidate: 3600 },
    // on-demand revalidation (tag based - if any fetcher function containing this tag is triggered then it will revalidate)
    //* next:{tags:['collections']},
    // to avoid caching in fetch
    //* cache: 'no-store'
  });
  return res.json();
}

// metadata object
import { Metadata } from "next";
export const metadata = {
  title: "Next.js",
};

// dynamic imports
const ComponentB = dynamic(() => import('../components/B'))  // pre-render (SSR) and lazy load
const ComponentC = dynamic(() => import('../components/C'), { ssr: false })  // no SSR

const page = async () => {
  const data = await getData();
  return <div>page</div>;
};

export default page;
