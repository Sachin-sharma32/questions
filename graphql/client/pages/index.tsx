//29
import { gql, useQuery } from "@apollo/client";

//30
const query = gql`
  query GetData {
    getTodos {
      title
      user {
        name
      }
    }
  }
`;

export default function Home() {
  //31
  const { data, loading } = useQuery(query);

  // create a function to reverse string

  if (loading) return <h1>Loading...</h1>;
  if (!loading) return <div>{JSON.stringify(data)}</div>;
}
