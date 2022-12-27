import { gql } from '@apollo/client'

export const DELETE_DOCUMENT = gql`
  mutation deleteDocument($jobId: String, $documentUrl: String) {
    deleteDocument(input: { jobId: $jobId, documentUrl: $documentUrl }) {
      jobDocument {
        name
        type
        url
      }
    }
  }
`

export const STEP_TWO = gql`
  mutation stepTwo(
    $jobId: String
    $documentName: String
    $documentType: String
    $documentUrl: String
    $jobCastingDate: String
    $jobCastingLocation: String
    $jobFilmingDate: String
    $jobFilmingLocation: String
  ) {
    stepTwo(
      input: {
        jobId: $jobId
        jobDocument: {
          name: $documentName
          type: $documentType
          url: $documentUrl
        }
        jobCastingMetaData: {
          date: $jobCastingDate
          location: $jobCastingLocation
        }
        jobFilmingMetaData: {
          date: $jobFilmingDate
          location: $jobFilmingLocation
        }
      }
    ) {
      _id
      jobDocument {
        name
        type
        url
      }
      jobCastingMetaData {
        date
        location
      }
      jobFilmingMetaData {
        date
        location
      }
    }
  }
`
