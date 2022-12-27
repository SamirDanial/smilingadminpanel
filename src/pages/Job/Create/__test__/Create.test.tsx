import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Create from '../Create'
import { MockedProvider } from '@apollo/client/testing'
import { STEP_ONE } from '../graphql/create.gql'
import { STEP_TWO, DELETE_DOCUMENT } from '../Location/graphql/Location.gql'
import { STEP_Three, DELETE_ROLE } from '../Role/graphql/Role.gql'
import { STEP_FOUR, DELETE_SLOT } from '../Slot/graphql/Slot.gql'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}))

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.REACT_APP_BACKEND}/graphql`,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
})

describe('Create Screen Component', () => {
  it('rendering main screen', async () => {
    render(
      <ApolloProvider client={client}>
        <Create />
      </ApolloProvider>,
    )

    const createJobBtn = screen.getByText('Save')

    const title = screen.getByText('Job Information')
    expect(title).toBeInTheDocument()
    expect(createJobBtn).toBeInTheDocument()
  })
})

describe('graphql test for First Step', () => {
  it('graphql testing', async () => {
    const STEPOne = { jobName: 'Test Job' }

    const mocks: any = [
      {
        request: {
          query: STEP_ONE,
          variables: {
            jobPicture: 'N/A',
            jobPerformance: 'N/A',
            jobName: 'Job Titre',
            jobStatus: 'ACTIVE',
            jobRight: 'N/A',
            jobCost: 'N/A',
            jobNumber: '1212',
            jobDescription: 'good job',
            jobType: 'photo',
            model: 'N/A',
          },
        },
        result: {
          data: {
            STEP_ONE: STEPOne,
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Create />
      </MockedProvider>,
    )

    const code = await screen.findByPlaceholderText('6525')
    fireEvent.change(code, { target: { value: '2525' } })
    const Compagnie = await screen.findByPlaceholderText('Carrefour')
    fireEvent.change(Compagnie, { target: { value: 'Smiling' } })
    const jobTitre = await screen.findByPlaceholderText('Carrefour Kids')
    fireEvent.change(jobTitre, { target: { value: 'Supper Man' } })

    const button = await screen.findByText(/create/i)

    fireEvent.click(button)

    const sucessMessage = waitFor(async () => {
      await screen.findByRole(/applicationNotification/i)
    }).then((res) => {
      return res
    })
    expect(sucessMessage).toBeTruthy()
  })
})

describe('graphql test for Second Step', () => {
  it('graphql test stepTwo', async () => {
    const STEPTwo = {
      jobId: '62da35e42e9ec674d1e9f3cb',
      jobCastingDate: '2022/02/22',
      jobCastingLocation: 'USA',
      jobFilmingDate: '2022/02/22',
      jobFilmingLocation: 'UAE',
    }

    const mocks: any = [
      {
        request: {
          query: STEP_TWO,
          variables: {
            jobId: '62da35e42e9ec674d1e9f3cb',
            jobCastingDate: '2022/02/22',
            jobCastingLocation: 'USA',
            jobFilmingDate: '2022/02/22',
            jobFilmingLocation: 'UAE',
          },
        },
        result: {
          data: {
            STEP_TWO: STEPTwo,
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Create />
      </MockedProvider>,
    )

    const stepTwoSection = screen.getByText(/Dates et locations/i)
    fireEvent.click(stepTwoSection)

    const castingDate = await screen.findByAltText('CastingDate')
    fireEvent.change(castingDate, { target: { value: '05-12-2022' } })

    const castingLocation = await screen.findByPlaceholderText(
      'Casting Location',
    )
    fireEvent.change(castingLocation, { target: { value: 'USA' } })

    const filmingLocation = await screen.findByPlaceholderText(
      'Filming Location',
    )
    fireEvent.change(filmingLocation, { target: { value: 'USA' } })

    const sucessMessage = waitFor(async () => {
      await screen.findByRole(/applicationNotification/i)
    }).then((res) => {
      return res
    })
    expect(sucessMessage).toBeTruthy()
  })

  it('graphql test delete document', async () => {
    const mocks: any = [
      {
        request: {
          query: DELETE_DOCUMENT,
          variables: {
            documentUrl: 'http://path/document',
          },
        },
        result: {
          data: {
            STEP_TWO,
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Create />
      </MockedProvider>,
    )

    const sucessMessage = waitFor(async () => {
      await screen.findByRole(/applicationNotification/i)
    }).then((res) => {
      return res
    })
    expect(sucessMessage).toBeTruthy()
  })
})

describe('graphql test for Third Step (Job Role)', () => {
  it('graphql test stepThree', async () => {
    const STEPThree = {
      jobId: '62da35e42e9ec674d1e9f3cb',
      roleType: 'ABCD',
      ageMin: 22,
      ageMax: 33,
      gender: 'MALE',
      description: 'Nice Job',
      renumeration: '5000 USD/Month',
    }

    const mocks: any = [
      {
        request: {
          query: STEP_Three,
          variables: {
            jobId: '62da35e42e9ec674d1e9f3cb',
            roleType: 'ABCD',
            ageMin: 22,
            ageMax: 33,
            gender: 'MALE',
            description: 'Nice Job',
            renumeration: '5000 USD/Month',
          },
        },
        result: {
          data: {
            STEP_Three: STEPThree,
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Create />
      </MockedProvider>,
    )

    const stepThreeSection = screen.getByText(/Creation des roles/i)
    fireEvent.click(stepThreeSection)

    const typeRole = await screen.findByPlaceholderText('Type Role')
    fireEvent.change(typeRole, { target: { value: 'ABCD' } })

    const minAge = await screen.findByPlaceholderText('Age Min')
    fireEvent.change(minAge, { target: { value: 22 } })

    const maxAge = await screen.findByPlaceholderText('Age Max')
    fireEvent.change(maxAge, { target: { value: 33 } })

    const sucessMessage = waitFor(async () => {
      await screen.findByRole(/applicationNotification/i)
    }).then((res) => {
      return res
    })
    expect(sucessMessage).toBeTruthy()
  })

  it('graphql test delete Role', async () => {
    const mocks: any = [
      {
        request: {
          query: DELETE_ROLE,
          variables: {
            jobId: '62da35e42e9ec674d1e9f3cb',
            roleId: '62da35e42e9ec674d1e9e558',
          },
        },
        result: {
          data: {
            STEP_Three,
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Create />
      </MockedProvider>,
    )

    const sucessMessage = waitFor(async () => {
      await screen.findByRole(/applicationNotification/i)
    }).then((res) => {
      return res
    })
    expect(sucessMessage).toBeTruthy()
  })
})

describe('graphql test for Fourth Step (Job Slot)', () => {
  it('graphql test stepFour', async () => {
    const STEPFour = {
      jobId: '62da35e42e9ec674d1e9f3cb',
      slotType: 'FILLE',
      slotRole: 'PERE',
      date: '02-02-2022',
      start: '10:40',
      end: '14:40',
      duration: 20,
    }

    const mocks: any = [
      {
        request: {
          query: STEP_FOUR,
          variables: {
            jobId: '62da35e42e9ec674d1e9f3cb',
            slotType: 'FILLE',
            slotRole: 'PERE',
            date: '02-02-2022',
            start: '10:40',
            end: '14:40',
            duration: 20,
          },
        },
        result: {
          data: {
            STEP_FOUR: STEPFour,
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Create />
      </MockedProvider>,
    )

    const stepFourSection = screen.getByText(/Creation des slots/i)
    fireEvent.click(stepFourSection)

    const type = await screen.findByText(/Fille/i)
    fireEvent.change(type, { target: { value: 'FILLE' } })

    const role = await screen.findByText(/Pere/i)
    fireEvent.change(role, { target: { value: 'PERE' } })

    const date = await screen.findByAltText('SlotDate')
    fireEvent.change(date, { target: { value: '02-02-2022' } })

    const sucessMessage = waitFor(async () => {
      await screen.findByRole(/applicationNotification/i)
    }).then((res) => {
      return res
    })
    expect(sucessMessage).toBeTruthy()
  })

  it('graphql test delete Slot', async () => {
    const mocks: any = [
      {
        request: {
          query: DELETE_SLOT,
          variables: {
            jobId: '62da35e42e9ec674d1e9f3cb',
            slotId: '62da35e42e9ec674d1e9e558',
          },
        },
        result: {
          data: {
            STEP_FOUR,
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Create />
      </MockedProvider>,
    )

    const sucessMessage = waitFor(async () => {
      await screen.findByRole(/applicationNotification/i)
    }).then((res) => {
      return res
    })
    expect(sucessMessage).toBeTruthy()
  })
})
