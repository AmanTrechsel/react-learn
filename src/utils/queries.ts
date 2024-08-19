
import { gql } from "@apollo/client";

export const getUsers = gql`
    query GetUsers {
        users {
            firstname
            lastname
            email
            password
            picture
            tasks
        }
    }
`;

export const getTasks = gql`
    query GetTasks {
        tasks {
            id
            title
            category
            priority
            progress
            startDate
            goalDate
        }
    }
`;