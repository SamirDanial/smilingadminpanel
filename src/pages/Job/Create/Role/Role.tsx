import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { STEP_Three, EDIT_ROLE } from './graphql/Role.gql'
import { useDispatch } from 'react-redux'
import Collapse from '../../../../components/Collapse/Collapse'
import InputField from '../../../../components/InputField2/InputField'
import {
  CollapsableFormContainer,
  GroupButtonContainer,
  GroupButtonMember,
  HorizontalDivider,
  HorizontalDividerWrapper,
  JustifyBetweenFlex,
  MT10,
  TextBoxLabel,
} from '../../../../styles/globals.styles'
import TextArea from '../../../../components/TextArea/TextArea'
import {
  ListWrapper,
  RightFormHeader,
  RightFormSubtitle,
  RightFormWrapper,
} from '../Location/style/Location.style'
import ListHeadLine from '../../../../components/ListHeadLine/ListHeadLine'
import RoleItem from '../../../../components/RoleItem/RoleItem'
import ButtonSmall from '../../../../components/Button/ButtonSmall'
import { appWideActions } from '../../../../store/applicationWide.slice'

type RoleProp = {
  jobId: string
}

const Role = (props: RoleProp) => {
  const [collapse, setCollapse] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [disableDelete, setDisableDelete] = useState(false)
  const [min, setMin] = useState(0)
  const [roleId, setRoleId] = useState('')
  const [focus, setFocus] = useState('')
  const [roles, setRoles] = useState<any[]>([])
  const [gender, setGender] = useState('MALE')
  const [stepThree] = useMutation(STEP_Three)
  const [editRole] = useMutation(EDIT_ROLE)
  const dispatch = useDispatch()

  const takeToEdit = (preValue: any) => {
    formik.values.roleType = preValue.type
    formik.values.ageMin = preValue.ageMin
    formik.values.ageMax = preValue.ageMax
    formik.values.description = preValue.description
    formik.values.remuneration = preValue.remuneration
    setRoleId(preValue.roleId)
    setGender(preValue.gender.toUpperCase())
    setEditMode(true)
  }

  const editRoleHandler = () => {
    editRole({
      variables: {
        jobId: props.jobId,
        roleId: roleId,
        roleType: formik.values.roleType,
        ageMin: formik.values.ageMin,
        ageMax: formik.values.ageMax,
        gender: gender,
        description: formik.values.description,
        renumeration: formik.values.remuneration,
      },
    })
      .then((res) => {
        setRoles(res.data.editJobRole.roles)
        dispatch(
          appWideActions.showMessage({
            fromTop: 'mt-16',
            message: 'Success',
            textColor: 'text-smilingSuccess',
            secondaryMessage: 'Le rôle a été mis à jour avec succès',
            status: 'good',
          }),
        )
      })
      .catch((error) => {
        dispatch(
          appWideActions.showMessage({
            fromTop: 'mt-16',
            message: 'Faild!',
            textColor: 'text-smilingError',
            secondaryMessage:
              'Échec de la mise à jour du rôle, veuillez contacter les ingénieurs techniques',
            status: 'bad',
          }),
        )
      })
  }

  const onFocus = (e: any) => {
    setFocus(e.target.name)
  }

  const formik = useFormik({
    initialValues: {
      roleType: '',
      ageMin: '',
      ageMax: '',
      description: '',
      remuneration: '',
    },
    validationSchema: Yup.object({
      roleType: Yup.string().required('Type Role is required'),
      ageMin: Yup.number().required('Min Age is required').min(1, 'At least 1'),
      ageMax: Yup.number()
        .required('Max Age is required')
        .min(min, `At least ${min}`),
    }),
    onSubmit: async (values) => {
      stepThree({
        variables: {
          jobId: props.jobId,
          roleType: values.roleType,
          ageMin: values.ageMin,
          ageMax: values.ageMax,
          gender: gender,
          description: values.description,
          renumeration: values.remuneration,
        },
      })
        .then((res) => {
          setRoles(res.data.stepThree.roles)
          formik.resetForm()
          setGender('MALE')
          dispatch(
            appWideActions.showMessage({
              fromTop: 'mt-16',
              message: 'Success',
              textColor: 'text-smilingSuccess',
              secondaryMessage: 'Le nouveau rôle a été ajouté avec succès',
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
                "Échec de l'ajout du rôle, veuillez contacter les ingénieurs techniques",
              status: 'bad',
            }),
          )
        })
    },
  })
  return (
    <React.Fragment>
      <Collapse
        text="Creation des roles"
        collapse={collapse}
        toogler={() => setCollapse((prevState) => !prevState)}
        mt="mt-10"
      />
      <CollapsableFormContainer
        className={`${collapse ? 'h-[690px]' : 'h-[0px]'} mt-10`}
      >
        <form onSubmit={formik.handleSubmit} className="flex-col w-[52%] ml-1">
          <JustifyBetweenFlex className="w-[480px]">
            <InputField
              labelText="Type Role"
              placeholder="Type Role"
              name="roleType"
              id="typeRole"
              value={formik.values.roleType}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              onFocus={onFocus}
              focusValue={focus}
              error={formik.errors.roleType}
              touch={formik.touched.roleType}
              width="w-[190px]"
              height="h-[35px]"
              required={true}
            />
            <InputField
              labelText="Age Min"
              placeholder="Age Min"
              name="ageMin"
              type="number"
              id="ageMin"
              value={formik.values.ageMin}
              onChange={(e) => {
                formik.handleChange(e)
                setMin(parseInt(e.target.value))
              }}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              onFocus={onFocus}
              focusValue={focus}
              error={formik.errors.ageMin}
              touch={formik.touched.ageMin}
              width="w-[119px]"
              height="h-[35px]"
              required={true}
            />
            <InputField
              labelText="Age Max"
              placeholder="Age Max"
              name="ageMax"
              id="ageMax"
              type="number"
              value={formik.values.ageMax}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              onFocus={onFocus}
              focusValue={focus}
              error={formik.errors.ageMax}
              touch={formik.touched.ageMax}
              width="w-[119px]"
              height="h-[35px]"
              required={true}
            />
          </JustifyBetweenFlex>
          <MT10>
            <TextBoxLabel>Gender *</TextBoxLabel>
            <GroupButtonContainer role="group">
              <GroupButtonMember
                type="button"
                onClick={() => {
                  setGender('MALE')
                }}
                className={`rounded-l-md ${
                  gender === 'MALE' && 'bg-smilingRed !text-white'
                } `}
              >
                Male
              </GroupButtonMember>
              <GroupButtonMember
                type="button"
                onClick={() => {
                  setGender('FEMALE')
                }}
                className={`${
                  gender === 'FEMALE' && 'bg-smilingRed !text-white'
                } `}
              >
                Female
              </GroupButtonMember>
              <GroupButtonMember
                type="button"
                onClick={() => {
                  setGender('N/A')
                }}
                className={`rounded-r-md ${
                  gender === 'N/A' && 'bg-smilingRed !text-white'
                } `}
              >
                Both
              </GroupButtonMember>
            </GroupButtonContainer>
          </MT10>
          <MT10>
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
          </MT10>
          <MT10>
            <TextArea
              labelText="Remuneration"
              placeholder="Remuneration"
              width="w-[373px]"
              height="h-[139px]"
              name="remuneration"
              id="remuneration"
              value={formik.values.remuneration}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              onFocus={onFocus}
              focusValue={focus}
            />
          </MT10>
          <div
            className={`flex flex-row ${
              editMode ? 'w-[400px]' : 'w-[173px]'
            } space-x-5`}
          >
            {props.jobId &&
              formik.values.ageMax &&
              formik.values.ageMin &&
              formik.values.roleType && (
                <ButtonSmall
                  id="CreateRole"
                  btnText={`${editMode ? 'Save' : 'Add'}`}
                  type={`${editMode ? 'button' : 'submit'}`}
                  textColor="text-white"
                  bgColor="bg-smilingRed"
                  borderColor="hover:border-smilingRed"
                  hoverTextColor="hover:text-smilingRed"
                  hoverBorder="hover-border"
                  hoverBg="hover:bg-white"
                  borderInDarkMode="dark:border dark:border-smilingRed"
                  click={() => {
                    if (editMode) {
                      editRoleHandler()
                    }
                  }}
                  wrapperMt="mt-6"
                  width="w-[173px]"
                  height="h-[36px]"
                />
              )}
            {editMode && (
              <ButtonSmall
                id="cancelEditMode"
                btnText="Cancel"
                type="button"
                textColor="text-white"
                bgColor="bg-smilingGrayWeak"
                borderInDarkMode="dark:border dark:border-smilingGrayWeak"
                click={() => {
                  setDisableDelete(false)
                  formik.resetForm({
                    values: {
                      ageMax: '',
                      ageMin: '',
                      description: '',
                      remuneration: '',
                      roleType: '',
                    },
                  })
                  setGender('MALE')
                  setEditMode(false)
                  formik.resetForm()
                }}
                wrapperMt="mt-6"
                width="w-[173px]"
                height="h-[36px]"
              />
            )}
          </div>
        </form>

        <HorizontalDividerWrapper className="mt-20">
          <HorizontalDivider className="h-[510px]" />
        </HorizontalDividerWrapper>

        <RightFormWrapper>
          <div>
            <RightFormHeader>Roles</RightFormHeader>
            <RightFormSubtitle>
              Liste de roles ajoute pour ce job.
            </RightFormSubtitle>
          </div>
          <ListWrapper className="mt-20 h-[370px] w-[635px]">
            {roles.length > 0 && (
              <ListHeadLine
                dividerClasses="w-[395px] ml-auto mr-auto mt-4"
                ml="ml-[105px]"
                headers={['Gender', 'Type', 'Age', '']}
              />
            )}
            {roles.map((role) => (
              <RoleItem
                key={role._id}
                disableDelete={disableDelete}
                jobId={props.jobId}
                roleId={role._id}
                gender={role.gender}
                setRoles={setRoles}
                type={role.type}
                editMode={() => {
                  setDisableDelete(true)
                  takeToEdit({
                    type: role.type,
                    ageMax: role.ageMax,
                    ageMin: role.ageMin,
                    gender: role.gender,
                    description: role.description,
                    remuneration: role.renumeration,
                    roleId: role._id,
                  })
                }}
                age={role.ageMin}
                tabelData={{
                  headers: [
                    'Type',
                    'Min Age',
                    'Max Age',
                    'Gender',
                    'Description',
                    'Renumeration',
                  ],
                  rowDatas: [
                    role.type,
                    role.ageMax,
                    role.ageMin,
                    role.gender,
                    role.description,
                    role.renumeration,
                  ],
                }}
              />
            ))}
          </ListWrapper>
        </RightFormWrapper>
      </CollapsableFormContainer>
    </React.Fragment>
  )
}

export default Role
