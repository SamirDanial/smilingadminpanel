import { useState, useEffect } from 'react'

import { TrashIcon, PlayIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { JobHeaderList } from '../../constants/listConstant'
import { useMutation } from '@apollo/client'

import {
  Content,
  HeaderSection,
  SearchButtonContainer,
  FilterContainer,
  CustomizedSearchIcon,
  Input,
  CustomizedChevronDownIcon,
  Select,
  SearchButton,
  JobContent,
  ListHeaderContainer,
  HeaderColumn,
  Header,
  DataListContainer,
  DataRowContainer,
  DataColumnContainer,
  DataActionColumnContainer,
  ListItemIndicator,
  LoadingContainer,
  LoadingItem,
  DataColumnContainerForImage,
  SpanData,
  H1,
  LogoHeaderContainer,
  Logo,
  Option,
} from './components/styles/Landing.styles'

import ButtonSmall from '../../components/Button/ButtonSmall'
import ButtonWithoutHover from '../../components/Button/ButtonWithoutHoverEffect'
import EditIcon from '../../components/SVG/EditIcon'
import { Relative } from '../../styles/globals.styles'
import { GET_JOBS } from './graphql/landing.gql'

const DUMMYDATA: any[] = [
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rIyIfGb_YOARQjVZlFdlIFqvacjKq-_xe75FKGk&usqp=CAE&s',
    Numero: 6224,
    Compagnie: 'Carrefour',
    Date: '03.03.2022',
    Slots: '24',
    Roles: 'Garcon,Fille,Enf...',
    Type: 'Enfant 8ans',
    Models: 0,
    Status: { Text: 'En Cours', type: 'Success' },
    Type2: { Text: 'Photo', type: 'Warning' },
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rIyIfGb_YOARQjVZlFdlIFqvacjKq-_xe75FKGk&usqp=CAE&s',
    Numero: 6225,
    Compagnie: 'Hema',
    Date: '23.03.2022',
    Slots: '12',
    Roles: 'Garcon, Fille',
    Type: 'Maman',
    Models: 12,
    Status: { Text: 'Draft', type: 'Default' },
    Type2: { Text: 'Job', type: 'Secondary' },
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rIyIfGb_YOARQjVZlFdlIFqvacjKq-_xe75FKGk&usqp=CAE&s',
    Numero: 7992,
    Compagnie: 'RTF',
    Date: '02.02.2022',
    Slots: '10',
    Roles: 'Enfant',
    Type: 'Pere',
    Models: 18,
    Status: { Text: 'Cloture', type: 'Danger' },
    Type2: { Text: 'Job', type: 'Secondary' },
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rIyIfGb_YOARQjVZlFdlIFqvacjKq-_xe75FKGk&usqp=CAE&s',
    Numero: 7993,
    Compagnie: 'EMK',
    Date: '03.02.2022',
    Slots: '10',
    Roles: 'Fille Sport',
    Type: 'Etudiant',
    Models: 13,
    Status: { Text: 'Cloture', type: 'Danger' },
    Type2: { Text: 'Job', type: 'Secondary' },
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rIyIfGb_YOARQjVZlFdlIFqvacjKq-_xe75FKGk&usqp=CAE&s',
    Numero: 6224,
    Compagnie: 'Carrefour',
    Date: '03.03.2022',
    Slots: '24',
    Roles: 'Garcon,Fille,Enf...',
    Type: 'Bebe',
    Models: 27,
    Status: { Text: 'En Cours', type: 'Success' },
    Type2: { Text: 'Photo', type: 'Warning' },
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rIyIfGb_YOARQjVZlFdlIFqvacjKq-_xe75FKGk&usqp=CAE&s',
    Numero: 6224,
    Compagnie: 'Carrefour',
    Date: '03.03.2022',
    Slots: '24',
    Roles: 'Garcon,Fille,Enf...',
    Type: 'Bebe',
    Models: 2,
    Status: { Text: 'En Cours', type: 'Success' },
    Type2: { Text: 'Photo', type: 'Warning' },
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rIyIfGb_YOARQjVZlFdlIFqvacjKq-_xe75FKGk&usqp=CAE&s',
    Numero: 6224,
    Compagnie: 'Carrefour',
    Date: '03.03.2022',
    Slots: '24',
    Roles: 'Garcon,Fille,Enf...',
    Type: 'Bebe',
    Models: 20,
    Status: { Text: 'En Cours', type: 'Success' },
    Type2: { Text: 'Photo', type: 'Warning' },
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rIyIfGb_YOARQjVZlFdlIFqvacjKq-_xe75FKGk&usqp=CAE&s',
    Numero: 6224,
    Compagnie: 'Carrefour',
    Date: '03.03.2022',
    Slots: '24',
    Roles: 'Garcon,Fille,Enf...',
    Type: 'Bebe',
    Models: 13,
    Status: { Text: 'En Cours', type: 'Success' },
    Type2: { Text: 'Photo', type: 'Warning' },
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rIyIfGb_YOARQjVZlFdlIFqvacjKq-_xe75FKGk&usqp=CAE&s',
    Numero: 6224,
    Compagnie: 'Carrefour',
    Date: '03.03.2022',
    Slots: '24',
    Roles: 'Garcon,Fille,Enf...',
    Type: 'Bebe',
    Models: 73,
    Status: { Text: 'En Cours', type: 'Success' },
    Type2: { Text: 'Photo', type: 'Warning' },
  },
]

const Landing = () => {
  const [loading, setLoading] = useState(true)
  const [searchItems, setSearchItems] = useState<any>([])
  const [itemsToShow, setItemsToShow] = useState<any>([])
  const [status, setStatus] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')
  const [getJobs] = useMutation(GET_JOBS)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchItems.length === 0 && !status && !searchText) {
      setItemsToShow(DUMMYDATA)
    } else {
      setItemsToShow(searchItems)
    }
  }, [searchItems])

  useEffect(() => {
    getJobs().then((res) => {
      if (res.data?.getJobs.length > 0) {
        res.data?.getJobs.forEach((job: any) => {
          const newJob = {
            imagePath: job.jobPicture,
            Numero: job.jobNumber,
            Compagnie: job.compagnie,
            Date: 'N/A',
            Slots: job.slots.length,
            Roles: job.roles.length,
            Type: 'N/A',
            Models: job.models.length,
            Status: { Text: 'En Cours', type: 'Success' },
            Type2: { Text: job.jobType, type: 'Warning' },
          }
          const checkIfExist = DUMMYDATA.find(
            (dummy) => dummy.Numero === newJob.Numero,
          )
          if (!checkIfExist) {
            DUMMYDATA.unshift(newJob)
          }
        })
      }
    })
  }, [])

  const filterBySearchText = () => {
    if (!status && !searchText) {
      setSearchItems(DUMMYDATA)
    }
    if (status) {
      setSearchItems(
        DUMMYDATA.filter((dummy: any) => dummy.Status.Text === status),
      )
    }
    if (searchText) {
      setSearchItems(
        DUMMYDATA.filter(
          (dummy: any) =>
            dummy.Compagnie === searchText ||
            dummy.Roles === searchText ||
            dummy.Numero.toString() === searchText ||
            dummy.Type === searchText,
        ),
      )
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])
  return (
    <div role="landing">
      <Content>
        <HeaderSection>
          <H1>Jobs</H1>
          <SearchButtonContainer>
            <ButtonSmall
              click={() => navigate('/dashboard/createjob')}
              btnText="Create"
              textColor="text-white"
              bgColor="bg-smilingRed"
              borderColor="hover:border-smilingRed"
              hoverTextColor="hover:text-smilingRed"
              hoverBorder="hover-border"
              hoverBg="hover:bg-white"
              borderInDarkMode="dark:border dark:border-smilingRed"
              wrapperMt="mt-6"
              px="px-4"
              py="py-1"
            />
          </SearchButtonContainer>
        </HeaderSection>
        <FilterContainer>
          <Relative>
            <CustomizedSearchIcon width="20" height="20" />
            <Input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Relative>
          <Relative className="ml-20">
            <CustomizedChevronDownIcon width="20" height="20" />
            <Select onChange={(e) => setStatus(e.target.value)}>
              <Option value="">Select Status</Option>
              <Option value="En Cours">En Cours</Option>
              <Option value="Draft">Draft</Option>
              <Option value="Cloture">Cloture</Option>
            </Select>
          </Relative>
          <SearchButton onClick={filterBySearchText}>Search</SearchButton>
        </FilterContainer>
        {loading ? (
          <LoadingContainer>
            {[1, 2, 3, 4, 5, 6].map((item) => {
              return <LoadingItem key={item} />
            })}
          </LoadingContainer>
        ) : (
          <JobContent>
            <ListHeaderContainer>
              {JobHeaderList.map((jobHeader, index) => {
                return (
                  <HeaderColumn key={index}>
                    {index === 0 ? (
                      <LogoHeaderContainer>
                        <Logo>Logo</Logo>
                      </LogoHeaderContainer>
                    ) : (
                      <Header>{jobHeader}</Header>
                    )}
                  </HeaderColumn>
                )
              })}
            </ListHeaderContainer>
            <DataListContainer>
              {itemsToShow.map((row: any, index: any) => {
                let statusButton
                let typeButton

                switch (row.Type2.type) {
                  case 'Warning':
                    typeButton = (
                      <ButtonWithoutHover
                        btnText="Photo"
                        textColor="text-white"
                        bgColor="bg-smilingYellow"
                        px="px-4"
                      />
                    )
                    break
                  case 'Secondary':
                    typeButton = (
                      <ButtonWithoutHover
                        btnText="Job"
                        textColor="text-white"
                        bgColor="bg-purple-200"
                        px="px-6"
                      />
                    )
                    break
                }
                switch (row.Status.type) {
                  case 'Success':
                    statusButton = (
                      <ButtonWithoutHover
                        btnText="En Cours"
                        textColor="text-white"
                        bgColor="bg-smilingSuccess"
                        px="px-2"
                      />
                    )
                    break
                  case 'Default':
                    statusButton = (
                      <ButtonWithoutHover
                        btnText="Draft"
                        textColor="text-white"
                        bgColor="bg-gray-400"
                        px="px-5"
                      />
                    )
                    break
                  case 'Danger':
                    statusButton = (
                      <ButtonWithoutHover
                        btnText="Cloture"
                        textColor="text-white"
                        bgColor="bg-smilingOrange"
                        px="px-3"
                      />
                    )
                    break
                }
                return (
                  <DataRowContainer key={index}>
                    <ListItemIndicator />
                    <DataColumnContainerForImage>
                      <img
                        className="rounded"
                        width="40"
                        height="40"
                        style={{ minHeight: '40px' }}
                        src={`${
                          row.logo
                            ? row.logo
                            : process.env.REACT_APP_BACKEND +
                              '/' +
                              row.imagePath
                        }`}
                        alt=""
                      />
                    </DataColumnContainerForImage>
                    <DataColumnContainer>
                      <SpanData>{row.Numero}</SpanData>
                    </DataColumnContainer>
                    <DataColumnContainer>
                      <SpanData className="w-20">{row.Compagnie}</SpanData>
                    </DataColumnContainer>
                    <DataColumnContainer>
                      <SpanData>{row.Date}</SpanData>
                    </DataColumnContainer>
                    <DataColumnContainer>
                      <SpanData>{row.Slots}</SpanData>
                    </DataColumnContainer>
                    <DataColumnContainer>
                      <SpanData className="text-sm w-24">{row.Roles}</SpanData>
                    </DataColumnContainer>
                    <DataColumnContainer>
                      <SpanData>{row.Type}</SpanData>
                    </DataColumnContainer>
                    <DataColumnContainer>
                      <SpanData>{row.Models}</SpanData>
                    </DataColumnContainer>
                    <DataColumnContainer>{statusButton}</DataColumnContainer>
                    <DataColumnContainer>{typeButton}</DataColumnContainer>
                    <DataActionColumnContainer>
                      <PlayIcon
                        width="24"
                        height="24"
                        className="dark:text-white cursor-pointer text-smilingSuccess"
                      />
                      <EditIcon />
                      <TrashIcon
                        width="24"
                        height="24"
                        className="text-smilingOrange cursor-pointer"
                      />
                    </DataActionColumnContainer>
                  </DataRowContainer>
                )
              })}
            </DataListContainer>
          </JobContent>
        )}
      </Content>
    </div>
  )
}

export default Landing
