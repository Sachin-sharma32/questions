"use client"; // Error components    be Client Components

// it will handle error for all it's children as well 
// cannot handle error inside layout.tsx/template.tsx in same level
// to handle error inside root layout.tsx/template.tsx -> global-error.tsx 
// global-error.tsx should have html and body tag 


export default function Error({
  // accepts 2 props
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    // fallback UI
    <div>
      <h2>Something went wrong! - {error}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
