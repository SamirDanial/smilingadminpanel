import { gql } from '@apollo/client'

export const STEP_FOUR = gql`
  mutation stepFour(
    $jobId: String!
    $slotId: String
    $slotType: SlotType
    $slotRole: SlotRole
    $date: DateTime
    $start: DateTime
    $end: DateTime
    $duration: Float
  ) {
    stepFour(
      input: {
        jobId: $jobId
        slotId: $slotId
        slotType: $slotType
        slotRole: $slotRole
        date: $date
        start: $start
        end: $end
        duration: $duration
      }
    ) {
      _id
      slots {
        _id
        type
        role
        date
        start
        end
        duration
      }
    }
  }
`

export const DELETE_SLOT = gql`
  mutation deleteJobSlot($jobId: String!, $slotId: String) {
    deleteJobSlot(input: { jobId: $jobId, slotId: $slotId }) {
      _id
      slots {
        _id
        type
        role
        date
        start
        end
        duration
      }
    }
  }
`

export const EDIT_SLOT = gql`
  mutation editJobSlot(
    $jobId: String!
    $slotId: String
    $slotType: SlotType
    $slotRole: SlotRole
    $date: DateTime
    $start: DateTime
    $end: DateTime
    $duration: Float
  ) {
    editJobSlot(
      input: {
        jobId: $jobId
        slotId: $slotId
        slotType: $slotType
        slotRole: $slotRole
        date: $date
        start: $start
        end: $end
        duration: $duration
      }
    ) {
      _id
      slots {
        _id
        type
        role
        date
        start
        end
        duration
      }
    }
  }
`
