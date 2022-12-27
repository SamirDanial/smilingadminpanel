import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { useDispatch } from 'react-redux'

import ButtonSmall from '../../../../components/Button/ButtonSmall'
import Collapse from '../../../../components/Collapse/Collapse'
import InputField from '../../../../components/InputField2/InputField'
import ListHeadLine from '../../../../components/ListHeadLine/ListHeadLine'
import Select from '../../../../components/Select/Select'
import SlotItem from '../../../../components/SlotItem/SlotItem'
import { appWideActions } from '../../../../store/applicationWide.slice'

import {
  CollapsableFormContainer,
  HorizontalDivider,
  HorizontalDividerWrapper,
  JustifyBetweenFlex,
  MT10,
  TextBoxLabel,
  TextBoxLabel2,
} from '../../../../styles/globals.styles'

import {
  ListWrapper,
  RightFormHeader,
  RightFormSubtitle,
  RightFormWrapper,
} from '../Location/style/Location.style'

import { STEP_FOUR, EDIT_SLOT } from './graphql/Slot.gql'

type SlotProp = {
  jobId: string
}

const Slot = (props: SlotProp) => {
  const [collapse, setCollapse] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [disableDelete, setDisableDelete] = useState(false)
  const [mode, setMode] = useState('')
  const [newDate, setNewDate] = useState<any>('')
  const [focus, setFocus] = useState('')
  const [slotId, setSlotId] = useState('')
  const [slots, setSlots] = useState<any[]>([])
  const [Stepfour] = useMutation(STEP_FOUR)
  const [editSlot] = useMutation(EDIT_SLOT)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      type: 'CASTING',
      role: 'PERE',
      date: '',
      startH: 0,
      startM: 0,
      endH: 0,
      endM: 0,
      duration: '20',
    },
    validationSchema: Yup.object({
      date: Yup.string().required('Date is required'),
    }),
    onSubmit: (values) => {
      const sTime = values.startH + ':' + values.startM
      const startTime = moment(values.date + ' ' + sTime)

      const eTime = values.endH + ':' + values.endM
      const endTime = moment(values.date + ' ' + eTime)
      setMode('restart')

      Stepfour({
        variables: {
          jobId: props.jobId,
          slotType: values.type,
          slotRole: values.role,
          date: values.date,
          start: startTime,
          end: endTime,
          duration: parseInt(values.duration),
        },
      })
        .then((res) => {
          setSlots(res.data.stepFour.slots)
          formik.resetForm()
          setMode('')
          dispatch(
            appWideActions.showMessage({
              fromTop: 'mt-16',
              message: 'Success',
              textColor: 'text-smilingSuccess',
              secondaryMessage: "L'emplacement a été ajouté avec succès",
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
                "Échec de l'ajout de l'emplacement, veuillez contacter les ingénieurs techniques",
              status: 'bad',
            }),
          )
        })
    },
  })

  const takeToEdit = (preValue: any) => {
    formik.values.type = preValue.type.toUpperCase()
    formik.values.role = preValue.role.toUpperCase()
    setNewDate({
      year: new Date(preValue.date).getFullYear(),
      month: new Date(preValue.date).getMonth() + 1,
      day: new Date(preValue.date).getDate(),
    })
    formik.values.date =
      new Date(preValue.date).getFullYear() +
      '-' +
      (new Date(preValue.date).getMonth() + 1 > 10
        ? (new Date(preValue.date).getMonth() + 1).toString()
        : '0' + (new Date(preValue.date).getMonth() + 1).toString()) +
      '-' +
      new Date(preValue.date).getDate()
    formik.values.startH = preValue.start.toString().split(':')[0]
    formik.values.startM = preValue.start.toString().split(':')[1]
    formik.values.endH = preValue.end.toString().split(':')[0]
    formik.values.endM = preValue.end.toString().split(':')[1]
    formik.values.duration = preValue.duration
    setSlotId(preValue.slotId)
    setMode('edit')
    setEditMode(true)
  }

  const onFocus = (e: any) => {
    setFocus(e.target.name)
  }

  const editSlotHandler = () => {
    const sTime = formik.values.startH + ':' + formik.values.startM
    const startTime = moment(formik.values.date + ' ' + sTime)

    const eTime = formik.values.endH + ':' + formik.values.endM
    const endTime = moment(formik.values.date + ' ' + eTime)
    editSlot({
      variables: {
        jobId: props.jobId,
        slotId: slotId,
        slotType: formik.values.type,
        slotRole: formik.values.role,
        date: formik.values.date,
        start: startTime,
        end: endTime,
        duration: parseInt(formik.values.duration),
      },
    })
      .then((res) => {
        setSlots(res.data.editJobSlot.slots)
        dispatch(
          appWideActions.showMessage({
            fromTop: 'mt-16',
            message: 'Success',
            textColor: 'text-smilingSuccess',
            secondaryMessage: "L'emplacement a été mis à jour avec succès",
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
              "Échec de la mise à jour de l'emplacement, veuillez contacter les ingénieurs techniques",
            status: 'bad',
          }),
        )
      })
  }

  const pickDate = (date: string) => {
    formik.values.date = date
  }

  return (
    <React.Fragment>
      <Collapse
        text="Creation des slots"
        collapse={collapse}
        toogler={() => setCollapse((prevState) => !prevState)}
        mt="mt-10"
      ></Collapse>
      <CollapsableFormContainer
        className={`${collapse ? 'h-[470px]' : 'h-[0px]'} mt-10`}
      >
        <form className="flex-col w-[52%] ml-1" onSubmit={formik.handleSubmit}>
          <div className="w-[270px]">
            <JustifyBetweenFlex>
              <Select
                required={true}
                labelText="Type"
                id="type"
                name="type"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e)
                  setFocus('')
                }}
                onFocus={onFocus}
                focusValue={focus}
                value={formik.values.type}
                width="w-[119px]"
                height="h-[35px]"
                activeValue="CASTING"
                options={[
                  { value: 'CASTING', name: 'Casting' },
                  { value: 'RECALL', name: 'Recall' },
                  { value: 'FITTING', name: 'Fitting' },
                ]}
              />
              <Select
                required={true}
                labelText="Role"
                id="role"
                name="role"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e)
                  setFocus('')
                }}
                onFocus={onFocus}
                focusValue={focus}
                value={formik.values.role}
                width="w-[119px]"
                height="h-[35px]"
                activeValue="PERE"
                options={[
                  { value: 'PERE', name: 'Pere' },
                  { value: 'TOUS', name: 'Tous' },
                  { value: 'FILLE', name: 'Fille' },
                ]}
              />
            </JustifyBetweenFlex>
          </div>
          <MT10>
            <JustifyBetweenFlex>
              <InputField
                required={true}
                labelText="Date"
                type="date"
                name="date"
                id="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e)
                  setFocus('')
                }}
                onFocus={onFocus}
                focusValue={focus}
                alt="SlotDate"
                width="w-[250px]"
                height="h-[35px]"
                minDate={`${new Date().getFullYear()}-${
                  new Date().getMonth() + 1 < 10
                    ? '0' + (new Date().getMonth() + 1)
                    : new Date().getMonth() + 1
                }-${new Date().getDate()}`}
                pickDate={pickDate}
                dateNewValue={newDate}
                mode={mode}
              />
              <div className="flex flex-col w-[266px] mr-44">
                <TextBoxLabel>Debut et Fin de journee</TextBoxLabel>
                <JustifyBetweenFlex>
                  <InputField
                    name="startH"
                    id="startH"
                    value={formik.values.startH}
                    onChange={formik.handleChange}
                    touch={formik.touched.startH}
                    onBlur={(e) => {
                      formik.handleBlur(e)
                      setFocus('')
                    }}
                    onFocus={onFocus}
                    focusValue={focus}
                    minDate="0"
                    maxDate="23"
                    type="number"
                    width="w-[43px]"
                    height="h-[35px]"
                  />
                  <TextBoxLabel className="mt-[15px]">:</TextBoxLabel>
                  <InputField
                    name="startM"
                    id="startM"
                    value={formik.values.startM}
                    touch={formik.touched.startM}
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e)
                      setFocus('')
                    }}
                    onFocus={onFocus}
                    focusValue={focus}
                    minDate="0"
                    maxDate="59"
                    type="number"
                    width="w-[43px]"
                    height="h-[35px]"
                  />
                  <TextBoxLabel className="mt-[15px]">to</TextBoxLabel>
                  <InputField
                    name="endH"
                    id="endH"
                    value={formik.values.endH}
                    onChange={formik.handleChange}
                    touch={formik.touched.endH}
                    onBlur={(e) => {
                      formik.handleBlur(e)
                      setFocus('')
                    }}
                    onFocus={onFocus}
                    focusValue={focus}
                    minDate="0"
                    maxDate="23"
                    type="number"
                    width="w-[43px]"
                    height="h-[35px]"
                  />
                  <TextBoxLabel className="mt-[15px]">:</TextBoxLabel>
                  <InputField
                    name="endM"
                    id="endM"
                    value={formik.values.endM}
                    onChange={formik.handleChange}
                    touch={formik.touched.endM}
                    onBlur={(e) => {
                      formik.handleBlur(e)
                      setFocus('')
                    }}
                    onFocus={onFocus}
                    focusValue={focus}
                    minDate="0"
                    maxDate="59"
                    type="number"
                    width="w-[43px]"
                    height="h-[35px]"
                  />
                </JustifyBetweenFlex>
              </div>
            </JustifyBetweenFlex>
          </MT10>
          <MT10>
            <div className="w-[190px]">
              <JustifyBetweenFlex>
                <Select
                  required={true}
                  labelText="Timeslot"
                  id="duration"
                  name="duration"
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e)
                    setFocus('')
                  }}
                  onFocus={onFocus}
                  focusValue={focus}
                  value={formik.values.duration}
                  width="w-[69px]"
                  height="h-[35px]"
                  activeValue="20"
                  options={[
                    { value: '30', name: '30' },
                    { value: '25', name: '25' },
                    { value: '20', name: '20' },
                    { value: '15', name: '15' },
                    { value: '10', name: '10' },
                  ]}
                />
                <TextBoxLabel2 className="mt-10">
                  Minutes/timeslot
                </TextBoxLabel2>
              </JustifyBetweenFlex>
            </div>
          </MT10>
          <MT10>
            <div
              className={`flex flex-row ${
                editMode ? 'w-[400px]' : 'w-[173px]'
              } space-x-5`}
            >
              {props.jobId &&
                formik.values.startH > 0 &&
                formik.values.endH > 0 &&
                formik.values.startH <= formik.values.endH && (
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
                        editSlotHandler()
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
                    setMode('restart')
                    formik.resetForm({
                      values: {
                        type: 'CASTING',
                        role: 'PERE',
                        date: '',
                        duration: '20',
                        startH: 0,
                        startM: 0,
                        endH: 0,
                        endM: 0,
                      },
                    })
                    setEditMode(false)
                    formik.resetForm()
                  }}
                  wrapperMt="mt-6"
                  width="w-[173px]"
                  height="h-[36px]"
                />
              )}
            </div>
          </MT10>
        </form>

        <HorizontalDividerWrapper>
          <HorizontalDivider className="h-[420px]" />
        </HorizontalDividerWrapper>

        <RightFormWrapper>
          <div>
            <RightFormHeader>Slots</RightFormHeader>
            <RightFormSubtitle>
              Liste de slots ajoute pour ce job.
            </RightFormSubtitle>
          </div>
          <ListWrapper className="mt-10 h-[370px]">
            <div>
              {slots.length > 0 && (
                <ListHeadLine
                  dividerClasses="mt-4 pl-12 pr-0"
                  width="w-[580px]"
                  ml="ml-[20px]"
                  headers={[
                    'Date',
                    'Type',
                    'Role',
                    'Start',
                    'End',
                    'Timeslot',
                    '',
                  ]}
                />
              )}
              {slots.map((slot) => (
                <SlotItem
                  jobId={props.jobId}
                  disableDelete={disableDelete}
                  key={slot._id}
                  slotId={slot._id}
                  setSlots={setSlots}
                  tabelData={{
                    headers: [
                      'Date',
                      'Role',
                      'Type',
                      'Start',
                      'End',
                      'Duration',
                      'Timeslot',
                    ],
                    rowDatas: [
                      new Date(slot.date).getFullYear() +
                        '-' +
                        (new Date(slot.date).getMonth() + 1) +
                        '-' +
                        new Date(slot.date).getDate(),
                      slot.role.toString().charAt(0).toUpperCase() +
                        slot.role.toString().slice(1),
                      slot.type.toString().charAt(0).toUpperCase() +
                        slot.type.toString().slice(1),
                      new Date(slot.start).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
                      new Date(slot.end).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
                      slot.duration,
                      Math.floor(
                        ((new Date(slot.end).getHours() -
                          new Date(slot.start).getHours()) *
                          60 +
                          (new Date(slot.end).getMinutes() -
                            new Date(slot.start).getMinutes())) /
                          parseInt(slot.duration),
                      ).toString(),
                    ],
                  }}
                  date={
                    new Date(slot.date).getFullYear() +
                    '-' +
                    (new Date(slot.date).getMonth() + 1) +
                    '-' +
                    new Date(slot.date).getDate()
                  }
                  role={
                    slot.role.toString().charAt(0).toUpperCase() +
                    slot.role.toString().slice(1)
                  }
                  type={
                    slot.type.toString().charAt(0).toUpperCase() +
                    slot.type.toString().slice(1)
                  }
                  start={new Date(slot.start).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  end={new Date(slot.end).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  timeslot={Math.floor(
                    ((new Date(slot.end).getHours() -
                      new Date(slot.start).getHours()) *
                      60 +
                      (new Date(slot.end).getMinutes() -
                        new Date(slot.start).getMinutes())) /
                      parseInt(slot.duration),
                  ).toString()}
                  editMode={() => {
                    setDisableDelete(true)
                    takeToEdit({
                      type: slot.type,
                      date: slot.date,
                      role: slot.role,
                      start: new Date(slot.start).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
                      end: new Date(slot.end).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
                      duration: slot.duration,
                      slotId: slot._id,
                    })
                  }}
                />
              ))}
            </div>
          </ListWrapper>
        </RightFormWrapper>
      </CollapsableFormContainer>
    </React.Fragment>
  )
}

export default Slot
