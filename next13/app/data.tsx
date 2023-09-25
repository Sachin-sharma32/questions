// this package will warn the developer if he uses this getData() function inside client component
import 'server-only'
// can also use 'client-only' package if using client features inside server component


// we can use this fn inside client component but:
//-> procss.env.API_KEY will not be available on client (use NEXT_PUBLIC_API_KEY)
//->  if using NEXT_PUBLIC_API_KEY then it will be exposed to the browser (security risk)
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })
 
  return res.json()
}