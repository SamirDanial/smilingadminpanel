import React from 'react'
import {
  Divider,
  DividerWrapper,
  ItemPHeader,
} from '../../pages/Job/style/Job.styles'

type ListHeadLineProp = {
  headers: string[]
  width?: string
  ml?: string
  dividerClasses?: string
}
const ListHeadLine = (props: ListHeadLineProp) => {
  return (
    <React.Fragment>
      <div
        className={`flex flex-row  ${
          props.ml ? props.ml : 'ml-[100px]'
        } ml-[100px] justify-between ${
          props.width ? props.width : 'w-[300px]'
        } `}
      >
        {props.headers.map((head) => (
          <ItemPHeader key={head} className="w-full">
            {head}
          </ItemPHeader>
        ))}
      </div>
      <DividerWrapper
        className={`${
          props.dividerClasses ? props.dividerClasses : 'mt-4 ml-auto mr-auto'
        } `}
      >
        <Divider />
      </DividerWrapper>
    </React.Fragment>
  )
}

export default ListHeadLine
