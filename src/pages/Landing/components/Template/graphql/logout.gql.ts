import { gql } from '@apollo/client'

export const ADMIN_LOGOUT = gql`
  mutation {
    logoutAdmin
  }
`
