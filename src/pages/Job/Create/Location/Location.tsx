import React, { useState, useRef, useEffect } from 'react'

import { useFormik } from 'formik'
import { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker'
import { useMutation } from '@apollo/client'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { CloudUploadIcon } from '@heroicons/react/outline'

import InputField from '../../../../components/InputField2/InputField'
import Collapse from '../../../../components/Collapse/Collapse'
import ButtonSmall from '../../../../components/Button/ButtonSmall'
import DocumentItem from '../../../../components/DocumentItem/DocumentItem'

import styles from './style/Location.module.css'
import {
  ListWrapper,
  RightFormHeader,
  RightFormSubtitle,
  RightFormWrapper,
} from './style/Location.style'

import {
  TextBoxLabel,
  CollapsableFormContainer,
  JustifyBetweenFlex,
  JustifyBetweenFlexTopDistance,
  HorizontalDividerWrapper,
  HorizontalDivider,
  MT10,
} from '../../../../styles/globals.styles'
import { PhotoContainer } from '../../style/Job.styles'
import { appWideActions } from '../../../../store/applicationWide.slice'

import { STEP_TWO } from './graphql/Location.gql'

type LocationProp = {
  jobId: string
}

const Location = (props: LocationProp) => {
  const [collapse, setCollapse] = useState(false)
  const [uploadedText, setUploadedText] = useState('')
  const [focus, setFocus] = useState('')
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [hasFile, setHasFile] = useState<boolean>(false)
  const [documents, setDocuments] = useState<any[]>([])
  const [imagePath, setImagePath] = useState(null)
  const [shouldUploadDocument, setShouldUploadDocument] = useState(false)
  const dispatch = useDispatch()
  const [Step_Two] = useMutation(STEP_TWO)
  const inputFile = useRef<any>(null)

  const formik = useFormik({
    initialValues: {
      castingDate: '',
      castingLocation: '',
      jobFilmingDate: '',
      filmingLocation: '',
    },
    onSubmit: async (values) => {
      Step_Two({
        variables: {
          jobId: props.jobId,
          jobCastingDate: values.castingDate,
          jobCastingLocation: values.castingLocation,
          jobFilmingDate: values.jobFilmingDate,
          jobFilmingLocation: values.filmingLocation,
        },
      })
        .then(() => {
          dispatch(
            appWideActions.showMessage({
              fromTop: 'mt-16',
              message: 'Success',
              textColor: 'text-smilingSuccess',
              secondaryMessage: 'Les données ont été envoyées avec succès',
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
    },
  })

  const openBrowserPicker = () => {
    inputFile.current.click()
  }

  const selectImage = (e: any) => {
    setHasFile(true)
    setSelectedFile(e.target.files[0])
    setUploadedText(e.target.files[0].name + ' file has been selected')
  }

  const uploadDocument = async () => {
    setShouldUploadDocument(true)
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
    setHasFile(false)
  }

  const onFocus = (e: any) => {
    setFocus(e.target.name)
  }

  useEffect(() => {
    if (imagePath && shouldUploadDocument) {
      Step_Two({
        variables: {
          jobId: props.jobId,
          documentName: selectedFile.name,
          documentType: selectedFile.type,
          documentUrl: imagePath,
        },
      })
        .then((res) => {
          setDocuments(res.data.stepTwo.jobDocument)
          dispatch(
            appWideActions.showMessage({
              fromTop: 'mt-16',
              message: 'Success',
              textColor: 'text-smilingSuccess',
              secondaryMessage: 'Le document a été téléchargé avec succès',
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
                'Échec du téléchargement du document, veuillez contacter les ingénieurs techniques',
              status: 'bad',
            }),
          )
        })
    }
    setShouldUploadDocument(false)
  }, [imagePath])

  const pickDate = (date: string) => {
    formik.values.castingDate = date
  }

  const jobFilmingPickDate = (date: string) => {
    formik.values.jobFilmingDate = date
  }

  return (
    <React.Fragment>
      <Collapse
        text="Dates et locations"
        collapse={collapse}
        toogler={() => setCollapse((prevState) => !prevState)}
        mt="mt-5"
      />
      <CollapsableFormContainer
        className={`${collapse ? 'h-[635px]' : 'h-[0px]'} mt-10`}
      >
        <form onSubmit={formik.handleSubmit} className="flex-col w-[52%] ml-1">
          <JustifyBetweenFlex className="pr-7">
            <InputField
              labelText="Date du Casting"
              type="date"
              name="castingDate"
              id="castingDate"
              alt="CastingDate"
              value={formik.values.castingDate}
              onChange={formik.handleChange}
              width="w-[250px]"
              height="h-[35px]"
              minDate={`${new Date().getFullYear()}-${
                new Date().getMonth() + 1 < 10
                  ? '0' + (new Date().getMonth() + 1)
                  : new Date().getMonth() + 1
              }-${new Date().getDate()}`}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              onFocus={onFocus}
              focusValue={focus}
              pickDate={pickDate}
            />
            <InputField
              labelText="Location"
              placeholder="Casting Location"
              name="castingLocation"
              id="castingLocation"
              value={formik.values.castingLocation}
              onChange={formik.handleChange}
              touch={formik.touched.castingLocation}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              onFocus={onFocus}
              focusValue={focus}
              width="w-[250px]"
              height="h-[35px]"
            />
          </JustifyBetweenFlex>
          <JustifyBetweenFlexTopDistance className="pr-7">
            <div>
              <InputField
                labelText="Date du tourange"
                type="date"
                name="jobFilmingDate"
                id="jobFilmingDate"
                alt="jobFilmingDate"
                value={formik.values.jobFilmingDate}
                onChange={formik.handleChange}
                width="w-[250px]"
                height="h-[35px]"
                minDate={`${new Date().getFullYear()}-${
                  new Date().getMonth() + 1 < 10
                    ? '0' + (new Date().getMonth() + 1)
                    : new Date().getMonth() + 1
                }-${new Date().getDate()}`}
                onBlur={(e) => {
                  formik.handleBlur(e)
                  setFocus('')
                }}
                onFocus={onFocus}
                focusValue={focus}
                pickDate={jobFilmingPickDate}
              />
            </div>
            <div className="flex flex-col justify-between">
              <InputField
                labelText="Location"
                placeholder="Filming Location"
                name="filmingLocation"
                id="filmingLocation"
                value={formik.values.filmingLocation}
                onChange={formik.handleChange}
                touch={formik.touched.filmingLocation}
                onBlur={(e) => {
                  formik.handleBlur(e)
                  setFocus('')
                }}
                onFocus={onFocus}
                focusValue={focus}
                width="w-[250px]"
                height="h-[35px]"
              />
            </div>
          </JustifyBetweenFlexTopDistance>
          <MT10>
            <div className="w-[240px] mt-[250px]">
              {formik.values.castingDate &&
                formik.values.castingLocation &&
                formik.values.filmingLocation &&
                formik.values.jobFilmingDate &&
                props.jobId && (
                  <ButtonSmall
                    id="CreateJob"
                    btnText="Add"
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
            </div>
          </MT10>
        </form>

        <HorizontalDividerWrapper>
          <HorizontalDivider className="h-[515px]" />
        </HorizontalDividerWrapper>

        <RightFormWrapper>
          <div>
            <RightFormHeader>Documents</RightFormHeader>
            <RightFormSubtitle>
              Ajoute des fichiers a ce job ou des autres documents
            </RightFormSubtitle>
            <PhotoContainer
              onClick={openBrowserPicker}
              className="ml-auto mr-auto mt-5"
            >
              {!selectedFile || !hasFile ? (
                <CloudUploadIcon
                  width="48px"
                  height="48px"
                  className="text-smilingGrayWeak"
                />
              ) : (
                <p>{uploadedText}</p>
              )}
              <input
                type="file"
                id="file"
                ref={inputFile}
                className="hidden"
                onChange={selectImage}
              />
            </PhotoContainer>
            {selectedFile && hasFile && props.jobId && (
              <ButtonSmall
                id="CreateJob"
                btnText="Upload Document"
                type="button"
                click={uploadDocument}
                textColor="text-white"
                bgColor="bg-smilingRed"
                borderColor="hover:border-smilingRed"
                hoverTextColor="hover:text-smilingRed"
                hoverBorder="hover-border"
                hoverBg="hover:bg-white"
                borderInDarkMode="dark:border dark:border-smilingRed"
                wrapperMt="mt-6"
                width="w-[172px]"
                height="h-[36px]"
              />
            )}
          </div>
          <ListWrapper className="mt-20 h-[400px]">
            {documents.map((document) => (
              <DocumentItem
                key={document.url}
                documents={documents}
                setDocuments={setDocuments}
                text={document.name}
                jobId={props.jobId}
                documentUrl={document.url}
              />
            ))}
          </ListWrapper>
        </RightFormWrapper>
      </CollapsableFormContainer>
    </React.Fragment>
  )
}

export default Location
