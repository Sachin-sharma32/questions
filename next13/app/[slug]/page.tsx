import React from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  // route name
  const slug = params.slug;

  return <div>Page</div>;
};

export default Page;

// dynamic routes segments follow dynamic rendering
// to statically render - generateStaticParams()
export async function generateStaticParams() {
  const posts = await fetch("https://.../posts").then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
