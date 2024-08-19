
import { gql, useQuery } from "@apollo/client";

export const getBooks = gql`
    query GetBooks {
        books {
            title
            author
        }
    }
`;