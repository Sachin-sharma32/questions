// to make a client component
'use client'

// all other components imported inside it will be client components
// cannot use useState, useEffect, useRef etc. in server components
// don't need to define "use client" on child if importing Component inside this
// on initial render the no-reactive part of client components is also rendered on the server (SSR)
// on subsequent visit or reload - entirely rendered on client
const Client = () => {
  return (
    <div>Client</div>
  )
}

export default Client