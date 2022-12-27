import { gql } from '@apollo/client'

export const ADMIN_LOGIN = gql`
  mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(input: { email: $email, password: $password })
  }
`

export const FETCH_ADMIN = gql`
  query Query {
    meAdmin {
      _id
      firstname
      email
      gender
      language
      messages
    }
  }
`
