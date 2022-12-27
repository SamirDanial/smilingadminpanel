import React from 'react'
import { EyeIcon, TrashIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'
import {
  Divider,
  DividerWrapper,
  ItemP,
} from '../../pages/Job/style/Job.styles'
import EditIcon from '../SVG/EditIcon'
import { appWideDetailActions } from '../../store/applicationWideDetail.slice'
import { appWideActions } from '../../store/applicationWide.slice'
import { DELETE_SLOT } from '../../pages/Job/Create/Slot/graphql/Slot.gql'

type tableData = {
  headers?: string[]
  rowDatas?: string[]
}

type slotItemProp = {
  jobId?: string
  slotId?: string
  date: string
  type: string
  role: string
  start: string
  end: string
  timeslot: string
  tabelData?: tableData
  setSlots?: any
  editMode?: any
  disableDelete?: boolean
}

const SlotItem = (props: slotItemProp) => {
  const dispatch = useDispatch()
  const [deleteSlot] = useMutation(DELETE_SLOT)
  const deleteSlotHandler = () => {
    deleteSlot({
      variables: {
        jobId: props.jobId,
        slotId: props.slotId,
      },
    })
      .then((res) => {
        props.setSlots && props.setSlots(res.data.deleteJobSlot.slots)
        dispatch(
          appWideActions.showMessage({
            fromTop: 'mt-16',
            message: 'Success',
            textColor: 'text-smilingSuccess',
            secondaryMessage: "L'emplacement a été supprimé avec succès",
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
              "Échec de la suppression de l'emplacement, veuillez contacter les ingénieurs techniques",
            status: 'bad',
          }),
        )
      })
  }
  const showDetail = () => {
    dispatch(appWideDetailActions.showDetail({ tableData: props.tabelData }))
  }
  return (
    <div>
      <div className="flex flex-row ml-[40px] justify-between w-[590px]">
        <ItemP>{props.date}</ItemP>
        <ItemP>{props.type}</ItemP>
        <ItemP>{props.role}</ItemP>
        <ItemP>{props.start}</ItemP>
        <ItemP>{props.end}</ItemP>
        <ItemP>{props.timeslot}</ItemP>
        <div className="flex flex-row mr-3">
          <EyeIcon
            onClick={showDetail}
            width="24px"
            height="24px"
            className="text-smilingSuccess cursor-pointer stroke-1"
          />
          <div className="pl-4" onClick={props.editMode}>
            <EditIcon textColor="text-smilingGray" />
          </div>
          <TrashIcon
            onClick={props.disableDelete ? () => null : deleteSlotHandler}
            width="24px"
            height="24px"
            className={`ml-5 text-smilingError ${
              props.disableDelete ? 'cursor-no-drop' : 'cursor-pointer'
            }  stroke-1`}
          />
        </div>
      </div>
      <DividerWrapper className="mt-4 pl-12 pr-0">
        <Divider />
      </DividerWrapper>
    </div>
  )
}

export default SlotItem
