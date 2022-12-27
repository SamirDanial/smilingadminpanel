import React from 'react'
import EyeIcon from '@heroicons/react/outline/EyeIcon'
import TrashIcon from '@heroicons/react/outline/TrashIcon'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { DELETE_ROLE } from '../../pages/Job/Create/Role/graphql/Role.gql'
import {
  Divider,
  DividerWrapper,
  ItemP,
} from '../../pages/Job/style/Job.styles'
import EditIcon from '../SVG/EditIcon'
import { appWideDetailActions } from '../../store/applicationWideDetail.slice'
import { appWideActions } from '../../store/applicationWide.slice'

type tableData = {
  headers?: string[]
  rowDatas?: string[]
}

type RoleItemProp = {
  jobId?: string
  roleId?: string
  gender: string
  type: string
  age: string
  tabelData?: tableData
  setRoles?: any
  editMode?: any
  disableDelete?: boolean
}

const RoleItem = (props: RoleItemProp) => {
  const dispatch = useDispatch()
  const [delete_Role] = useMutation(DELETE_ROLE)

  const showDetail = () => {
    dispatch(appWideDetailActions.showDetail({ tableData: props.tabelData }))
  }

  const deleteRole = () => {
    delete_Role({
      variables: {
        jobId: props.jobId,
        roleId: props.roleId,
      },
    })
      .then((res) => {
        props.setRoles(res.data.deleteJobRole.roles)
        dispatch(
          appWideActions.showMessage({
            fromTop: 'mt-16',
            message: 'Success',
            textColor: 'text-smilingSuccess',
            secondaryMessage: 'Le rôle a été supprimé avec succès',
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
              'Échec de la suppression de la règle, veuillez contacter les ingénieurs techniques',
            status: 'bad',
          }),
        )
      })
  }
  return (
    <div>
      <div className="flex flex-row ml-[97px] justify-between w-[395px] h-[40]">
        <div className="flex w-[250px]">
          <ItemP>
            {props.gender.toString().charAt(0).toUpperCase() +
              props.gender.toString().slice(1)}
          </ItemP>
          <ItemP>{props.type}</ItemP>
          <ItemP>{props.age}</ItemP>
        </div>
        <div className="flex flex-row">
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
            onClick={props.disableDelete ? () => null : deleteRole}
            width="24px"
            height="24px"
            className={`ml-5 text-smilingError ${
              props.disableDelete ? 'cursor-no-drop' : 'cursor-pointer'
            }  stroke-1`}
          />
        </div>
      </div>
      <DividerWrapper className="mt-4 w-[395px] ml-auto mr-auto">
        <Divider />
      </DividerWrapper>
    </div>
  )
}

export default RoleItem
