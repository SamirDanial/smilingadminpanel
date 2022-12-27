export const typeDefs = `
    type Mutation {
        stepOne(input: StepOneInput): Job
    }

    input StepOneInput {
        jobPicture: string
        jobPerformance: string
        jobName: string
        jobStatus: Status
        jobRight: string
        jobCost: string
        jobNumber: number
        jobDescription: string
        jobType: string
        model: string
    }

    enum Status {
        ACTIVE = 'active',
        CLOSE = 'close',
      }

    type Job {
        jobPicture: string
        jobPerformance: string
        jobName: string
        jobStatus: Status
        jobRight: string
        jobCost: string
        jobNumber: number
        jobDescription: string
        jobType: string
        model: string
    }
`
