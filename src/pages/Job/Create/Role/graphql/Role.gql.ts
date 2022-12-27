import { gql } from '@apollo/client'

export const STEP_Three = gql`
  mutation stepThree(
    $jobId: String!
    $roleId: String
    $roleType: String
    $ageMin: Float
    $ageMax: Float
    $gender: Gender
    $description: String
    $renumeration: String
  ) {
    stepThree(
      input: {
        jobId: $jobId
        roleId: $roleId
        roleType: $roleType
        ageMin: $ageMin
        ageMax: $ageMax
        gender: $gender
        description: $description
        renumeration: $renumeration
      }
    ) {
      _id
      roles {
        _id
        type
        ageMin
        gender
        ageMax
        description
        renumeration
      }
    }
  }
`

export const DELETE_ROLE = gql`
  mutation deleteJobRole($jobId: String!, $roleId: String) {
    deleteJobRole(input: { jobId: $jobId, roleId: $roleId }) {
      _id
      roles {
        _id
        type
        ageMin
        gender
        ageMax
        description
        renumeration
      }
    }
  }
`

export const EDIT_ROLE = gql`
  mutation editJobRole(
    $jobId: String!
    $roleId: String
    $roleType: String
    $ageMin: Float
    $ageMax: Float
    $gender: Gender
    $description: String
    $renumeration: String
  ) {
    editJobRole(
      input: {
        jobId: $jobId
        roleId: $roleId
        roleType: $roleType
        ageMin: $ageMin
        ageMax: $ageMax
        gender: $gender
        description: $description
        renumeration: $renumeration
      }
    ) {
      _id
      roles {
        _id
        type
        ageMin
        gender
        ageMax
        description
        renumeration
      }
    }
  }
`
