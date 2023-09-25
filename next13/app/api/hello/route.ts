import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

// route handlers uses "Request" and "Response" APIs
// route handlers are cached by default when using "GET"
// when using headers, cookies(), or headers(), or any other HTTP method other than "GET" - dynamic rendering (at request time i.e. no caching)
// or when using "request" obejct
export async function GET(
  request: Request, // no caching
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY,
    },
  });
  const product = await res.json();

  // reading cookies (no caching)
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // setting cookies
  /** return new Response("Hello, Next.js!", {
    status: 200,
    headers: { "Set-Cookie": `token=${token.value}` },
  }); */

  // reading headers (no caching)
  const headersList = headers();
  const referer = headersList.get("referer");

  // setting headers
  /** return new Response("Hello, Next.js!", {
    status: 200,
    headers: { referer: referer },
  }); */

  // redirecting
  //* redirect("https://nextjs.org/");

  // dynamic route segment
  const slug = params.slug; // /app/[slug]/route.ts

  // request body
  const req = await request.json();

  // request body (formdata)
  const data = await request.formData();
  const name = data.get("name");

  // setting cors
  return new Response("Hello, Next.js!", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });

  //* return Response.json({ product });
}
