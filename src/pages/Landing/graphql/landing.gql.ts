import { gql } from '@apollo/client'

export const GET_JOBS = gql`
  mutation GetJobs {
    getJobs {
      _id
      jobName
      jobPicture
      models
      jobPodioId
      compagnie
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
        location
        date
      }
      deleted
      code
      pinned
      clients {
        clientID
        contactID
      }
      roles {
        _id
        type
        ageMin
        ageMax
        gender
        description
        renumeration
      }
      slots {
        _id
        type
        role
        date
        start
        end
        duration
      }
      jobStatus
      performances {
        _id
        jobId
        jobPodioId
        performancesPodioId
        performancesBrut
        performancesTax
        performancesNet
        country
        typeDifussion
        typeRole
        performanceMetaData {
          startDate
          endDate
          paymentRef
          typePayment
          invoiceNumber
          anticipatedPayment
          anticipatedPaymentDate
          paymentDate
          expectedPaymentDate
          statusPayment
        }
        models
      }
      rights {
        _id
        jobId
        jobPodioId
        rightsPodioId
        rightsBrut
        rightsTax
        rightsNet
        country
        typeDifussion
        typeRole
        rightsMetaData {
          startDate
          endDate
          typePayment
          paymentRef
          invoiceNumber
          anticipatedPayment
          anticipatedPaymentDate
          paymentDate
          expectedPaymentDate
          statusPayment
        }
        models
      }
      costs {
        _id
        jobId
        jobPodioId
        costsPodioId
        constBrut
        typeCosts {
          type
          label
        }
        costsMetaData {
          startDate
          endDate
          typePayment
          paymentRef
          invoiceNumber
          anticipatedPayment
          anticipatedPaymentDate
          paymentDate
          expectedPaymentDate
          statusPayment
        }
        models
      }
      jobType
      jobNumber
      budget
      jobDescription
      peoplePodioId
      vedioLink
      jobRef
      wage
      shootingDate
      castingDate
      files {
        type
        url
      }
      compose {
        model
        pictures
      }
      locations {
        street
        number
        zipcode
        city
        country
        type
      }
      public
      publicbasic
      facturePresta
      factureDroits
    }
  }
`
