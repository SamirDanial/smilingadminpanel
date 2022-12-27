import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React from 'react'
import { H1SemiBold } from '../../styles/globals.styles'

type CollapseProps = {
  toogler: React.MouseEventHandler<HTMLDivElement> | undefined
  collapse: boolean
  text: string
  mt?: string
}

const Collapse = (props: CollapseProps) => {
  return (
    <div className={`flex cursor-pointer ${props.mt}`} onClick={props.toogler}>
      {props.collapse ? (
        <ChevronDownIcon
          width="24px"
          height="24px"
          className="mt-2 text-smilingRed"
        />
      ) : (
        <ChevronRightIcon
          width="24px"
          height="24px"
          className="mt-2 text-smilingRed"
        />
      )}
      <H1SemiBold>{props.text}</H1SemiBold>
    </div>
  )
}

export default Collapse
