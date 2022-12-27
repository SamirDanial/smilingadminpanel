import { gql } from '@apollo/client'

export const STEP_ONE = gql`
  mutation stepOne(
    $jobPicture: String!
    $jobName: String!
    $compagnie: String!
    $jobStatus: Status!
    $jobNumber: Float!
    $jobDescription: String!
    $jobType: String!
  ) {
    stepOne(
      input: {
        jobPicture: $jobPicture
        jobName: $jobName
        compagnie: $compagnie
        jobStatus: $jobStatus
        jobNumber: $jobNumber
        jobDescription: $jobDescription
        jobType: $jobType
      }
    ) {
      _id
      jobName
    }
  }
`
