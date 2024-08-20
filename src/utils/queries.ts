
import { gql } from "@apollo/client";

export const getUsers = gql`
    query GetUsers {
        users {
            id
            firstname
            lastname
            email
            password
            picture
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
            users
        }
    }
`;

export const insertUser = gql`
    mutation InsertUser(
        $id: Int!
        $firstname: String!
        $lastname: String!
        $email: String!
        $password: String!
        $picture: String!
    ) {
        createUser(
            id: $id
            firstname: $firstname
            lastname: $lastname
            email: $email
            password: $password
            picture: $picture
        ) {
            id  
        }
    }
`;

export const updateUser = gql`
    mutation InsertUser(
        $id: Int!
        $firstname: String
        $lastname: String
        $email: String
        $password: String
        $picture: String
    ) {
        updateUser(
            id: $id
            firstname: $firstname
            lastname: $lastname
            email: $email
            password: $password
            picture: $picture
        ) {
            id
        }
    }
`;

export const removeUser = gql`
    mutation RemoveUser(
        $id: Int!
    ) {
        removeUser(
            id: $id
        )
    }
`;

export const insertTask = gql`
    mutation InsertTask(
        $id: Int!
        $title: String!
        $category: TaskCategory!
        $priority: TaskPriority!
        $progress: Int!
        $startDate: Int!
        $goalDate: Int!
        $users: [Int]!
    ) {
        createTask(
            id: $id
            title: $title
            category: $category
            priority: $priority
            progress: $progress
            startDate: $startDate
            goalDate: $goalDate
            users: $users
        ) {
            id
        }
    }
`;

export const updateTask = gql`
    mutation UpdateTask(
        $id: Int!
        $title: String
        $category: TaskCategory
        $priority: TaskPriority
        $progress: Int
        $startDate: Int
        $goalDate: Int
        $users: [Int]
    ) {
        updateTask(
            id: $id
            title: $title
            category: $category
            priority: $priority
            progress: $progress
            startDate: $startDate
            goalDate: $goalDate
            users: $users
        ) {
            id
        }
    }
`;

export const removeTask = gql`
    mutation RemoveTask(
        $id: Int!
    ) {
        removeTask(
            id: $id
        )
    }
`;