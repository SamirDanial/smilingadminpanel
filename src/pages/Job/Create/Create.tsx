import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import ButtonSmall from '../../../components/Button/ButtonSmall'
import { Content } from '../../Landing/components/styles/Landing.styles'
import { appWideActions } from '../../../store/applicationWide.slice'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import {
  Divider,
  DividerWrapper,
  JobCreationContainer,
  Part1Section1,
  Part1Section2,
  Part1Section3,
  Part1Section4,
  PhotoContainer,
  Plus,
  RadioButtonsWrapper,
  RadioButtonWrapper,
} from '../style/Job.styles'
import {
  H1,
  ButtonsContainerHorizotally,
  MT10,
  RequiredIndicator,
  H1SemiBold,
} from '../../../styles/globals.styles'

import RadioButton from '../../../components/RadioButton/RadioButton'
import InputField from '../../../components/InputField2/InputField'
import TextArea from '../../../components/TextArea/TextArea'
import Select from '../../../components/Select/Select'
import Location from './Location/Location'

import { STEP_ONE } from './graphql/create.gql'
import Role from './Role/Role'
import Slot from './Slot/Slot'

const Create = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [file, setFile] = useState<any>(null)
  const [randomCodeNum, setRandomCodeNum] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [focus, setFocus] = useState('')
  const [imagePath, setImagePath] = useState(null)
  const [jobId, setJobId] = useState('')
  const inputFile = useRef<any>(null)
  const [stepOne] = useMutation(STEP_ONE)

  useEffect(() => {
    const randNum = (Math.floor(Math.random() * 90000) + 10000).toString()
    formik.values.code = randNum
    setRandomCodeNum(randNum)
  }, [])
  const formik = useFormik({
    initialValues: {
      jobType: 'photo',
      imageUrl: '',
      code: '',
      compagnie: '',
      jobTitre: '',
      status: 'ACTIVE',
      description: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Code is required'),
      compagnie: Yup.string()
        .required('Compagnie is required')
        .min(3, 'Should be at least 3 chars'),
      jobTitre: Yup.string()
        .required('Job Titre is require')
        .min(3, 'Should be at least 3 chars'),
      status: Yup.string().required('Status is required'),
    }),
    onSubmit: async () => {
      const formData = new FormData()
      formData.append('photo', selectedFile)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          withCredentials: 'include',
        },
      }
      const url = `${process.env.REACT_APP_BACKEND}/job-image`
      await axios.post(url, formData, config).then((res) => {
        setImagePath(res.data.filePath)
      })
    },
  })

  const onFocus = (e: any) => {
    setFocus(e.target.name)
  }

  useEffect(() => {
    if (imagePath) {
      stepOne({
        variables: {
          jobPicture: imagePath || 'N/A',
          jobName: formik.values.jobTitre,
          compagnie: formik.values.compagnie,
          jobStatus: formik.values.status,
          jobNumber: parseInt(randomCodeNum),
          jobDescription: formik.values.description,
          jobType: formik.values.jobType,
        },
      })
        .then((res) => {
          setJobId && setJobId(res.data.stepOne._id)
          dispatch(
            appWideActions.showMessage({
              fromTop: 'mt-16',
              message: 'Success',
              textColor: 'text-smilingSuccess',
              secondaryMessage: 'Une nouvelle tâche a été ajoutée avec succès',
              status: 'good',
            }),
          )
        })
        .catch(() => {
          dispatch(
            appWideActions.showMessage({
              fromTop: 'mt-16',
              message: 'Faild!',
              textColor: 'text-smilingError',
              secondaryMessage:
                "Échec de l'envoi des données, veuillez contacter les ingénieurs techniques",
              status: 'bad',
            }),
          )
        })
    }
  }, [
    dispatch,
    formik.values.compagnie,
    formik.values.description,
    formik.values.jobTitre,
    formik.values.jobType,
    formik.values.status,
    imagePath,
    randomCodeNum,
    stepOne,
  ])

  const openBrowserPicker = () => {
    inputFile.current.click()
  }

  const selectImage = (e: any) => {
    setSelectedFile(e.target.files[0])
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <Content>
      <JobCreationContainer>
        <form onSubmit={formik.handleSubmit}>
          <Part1Section1>
            <H1>Job Information</H1>
            <ButtonsContainerHorizotally>
              <ButtonSmall
                id="SupprimerJob"
                btnText="Cancel"
                type="button"
                textColor="text-white"
                bgColor="bg-smilingGrayWeak"
                borderInDarkMode="dark:border dark:border-smilingGrayWeak"
                click={() => navigate('/dashboard/landing', { replace: true })}
                wrapperMt="mt-6"
                width="w-[100px]"
                height="h-[36px]"
              />
            </ButtonsContainerHorizotally>
          </Part1Section1>
          <Part1Section2>
            <H1SemiBold>Type Job</H1SemiBold>
            <RadioButtonsWrapper>
              <RadioButtonWrapper>
                <RadioButton
                  id="photo"
                  name="jobType"
                  checked={formik.values.jobType === 'photo'}
                  onChange={formik.handleChange}
                  value="photo"
                  label="Photo"
                />
              </RadioButtonWrapper>
              <RadioButtonWrapper>
                <RadioButton
                  id="job"
                  name="jobType"
                  checked={formik.values.jobType === 'job'}
                  onChange={formik.handleChange}
                  value="job"
                  label="Job"
                />
              </RadioButtonWrapper>
            </RadioButtonsWrapper>
          </Part1Section2>
          <MT10>
            <H1SemiBold>Informations des bases</H1SemiBold>
            <RequiredIndicator>* required fields</RequiredIndicator>
          </MT10>
          <PhotoContainer onClick={openBrowserPicker} className="mt-10">
            {!file ? (
              <Plus>+</Plus>
            ) : (
              <img
                src={file}
                alt=""
                className="w-[100%] h-[100%] object-cover"
              />
            )}
            <input
              type="file"
              id="file"
              accept="image/png, image/gif, image/jpeg"
              ref={inputFile}
              className="hidden"
              onChange={selectImage}
            />
          </PhotoContainer>
          <Part1Section3>
            <InputField
              labelText="Code"
              placeholder="6525"
              name="code"
              id="code"
              value={randomCodeNum}
              onChange={() => null}
              width="w-[119px]"
              height="h-[35px]"
              required={true}
              onFocus={onFocus}
              focusValue={focus}
            />

            <InputField
              labelText="Compagnie"
              placeholder="Carrefour"
              name="compagnie"
              id="compagnie"
              value={formik.values.compagnie}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              error={formik.errors.compagnie}
              touch={formik.touched.compagnie}
              width="w-[250px]"
              height="h-[35px]"
              required={true}
              onFocus={onFocus}
              focusValue={focus}
            />
          </Part1Section3>
          <Part1Section3>
            <InputField
              labelText="Job Titre"
              placeholder="Carrefour Kids"
              name="jobTitre"
              id="jobTitre"
              value={formik.values.jobTitre}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              error={formik.errors.jobTitre}
              touch={formik.touched.jobTitre}
              width="w-[250px]"
              height="h-[35px]"
              required={true}
              onFocus={onFocus}
              focusValue={focus}
            />

            <Select
              required={true}
              labelText="Status"
              id="status"
              name="status"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              value={formik.values.status}
              width="w-[119px]"
              height="h-[35px] -ml-[20px]"
              activeValue="ACTIVE"
              options={[
                { value: 'ACTIVE', name: 'Active' },
                { value: 'CLOSE', name: 'Close' },
              ]}
              onFocus={onFocus}
              focusValue={focus}
            />
          </Part1Section3>
          <Part1Section4>
            <TextArea
              labelText="Description"
              placeholder="Description"
              width="w-[373px]"
              height="h-[139px]"
              name="description"
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              onFocus={onFocus}
              focusValue={focus}
            />
          </Part1Section4>
          <Part1Section4 className="flex justify-start">
            {formik.values.code &&
              selectedFile &&
              !formik.errors.compagnie &&
              !formik.errors.jobTitre && (
                <ButtonSmall
                  id="CreateJob"
                  btnText="Save"
                  type="submit"
                  textColor="text-white"
                  bgColor="bg-smilingRed"
                  borderColor="hover:border-smilingRed"
                  hoverTextColor="hover:text-smilingRed"
                  hoverBorder="hover-border"
                  hoverBg="hover:bg-white"
                  borderInDarkMode="dark:border dark:border-smilingRed"
                  wrapperMt="mt-6"
                  width="w-[240px]"
                  height="h-[36px]"
                />
              )}
          </Part1Section4>
        </form>
        <DividerWrapper>
          <Divider />
        </DividerWrapper>

        <Location jobId={jobId} />

        <DividerWrapper>
          <Divider />
        </DividerWrapper>

        <Role jobId={jobId} />

        <DividerWrapper>
          <Divider />
        </DividerWrapper>

        <Slot jobId={jobId} />

        <DividerWrapper>
          <Divider />
        </DividerWrapper>

        <div className="flex justify-end mb-20">
          <ButtonsContainerHorizotally>
            <ButtonSmall
              id="CreateJob"
              btnText="Create"
              type="submit"
              textColor="text-white"
              bgColor="bg-smilingRed"
              borderColor="hover:border-smilingRed"
              hoverTextColor="hover:text-smilingRed"
              hoverBorder="hover-border"
              hoverBg="hover:bg-white"
              borderInDarkMode="dark:border dark:border-smilingRed"
              click={() => navigate('/dashboard/landing', { replace: true })}
              wrapperMt="mt-6"
              width="w-[100px]"
              height="h-[36px]"
            />
            <ButtonSmall
              id="SupprimerJob"
              btnText="Cancel"
              type="button"
              textColor="text-white"
              bgColor="bg-smilingGrayWeak"
              borderInDarkMode="dark:border dark:border-smilingGrayWeak"
              click={() => navigate('/dashboard/landing', { replace: true })}
              wrapperMt="mt-6"
              width="w-[100px]"
              height="h-[36px]"
            />
          </ButtonsContainerHorizotally>
        </div>
      </JobCreationContainer>
    </Content>
  )
}

export default Create
