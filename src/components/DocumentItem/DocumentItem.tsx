import React from 'react'
import { EyeIcon, TrashIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'
import {
  Item,
  ItemName,
  ItemWrapper,
} from '../../pages/Job/Create/Location/style/Location.style'

import { DELETE_DOCUMENT } from '../../pages/Job/Create/Location/graphql/Location.gql'
import { appWideActions } from '../../store/applicationWide.slice'
import { Divider, DividerWrapper } from '../../pages/Job/style/Job.styles'

type DocumentItemProps = {
  text?: string
  jobId?: string
  documentUrl?: string
  documents?: any
  setDocuments?: any
}

const DocumentItem = (props: DocumentItemProps) => {
  const dispatch = useDispatch()
  const [Delete_Document] = useMutation(DELETE_DOCUMENT)

  const viewDocument = () => {
    window.open(
      `${process.env.REACT_APP_BACKEND}/${props.documentUrl}`,
      '_blank',
    )
  }

  const deleteDocument = () => {
    Delete_Document({
      variables: {
        jobId: props.jobId,
        documentUrl: props.documentUrl,
      },
    })
      .then(() => {
        const remainingDocs = props.documents.filter(
          (d: any) => d.url !== props.documentUrl,
        )
        props.setDocuments(remainingDocs)
        dispatch(
          appWideActions.showMessage({
            fromTop: 'mt-16',
            message: 'Success',
            textColor: 'text-smilingSuccess',
            secondaryMessage: 'le document a été supprimé avec succès',
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
              'Échec de la suppression du document, veuillez contacter les ingénieurs techniques',
            status: 'bad',
          }),
        )
      })
  }
  return (
    <ItemWrapper className="w-[371px] h-[46px]">
      <Item>
        <ItemName>{props.text}</ItemName>
        <EyeIcon
          onClick={viewDocument}
          width="24px"
          height="24px"
          className="text-smilingSuccess cursor-pointer stroke-1"
        />
        <TrashIcon
          onClick={deleteDocument}
          width="24px"
          height="24px"
          className="ml-5 text-smilingError cursor-pointer stroke-1"
        />
      </Item>
      <DividerWrapper className="mt-4">
        <Divider />
      </DividerWrapper>
    </ItemWrapper>
  )
}

export default DocumentItem
