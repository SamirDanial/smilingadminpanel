import React from 'react'
import UserIc from '../../assets/icons/icons8-user-32.png'
import { BoxShadowForUserIcon } from '../../styles/globals.styles'

const UserIcon = () => {
  return (
    <div
      style={{ boxShadow: BoxShadowForUserIcon }}
      className="flex justify-center items-center rounded-[50%] bg-white mr-2 h-[35px] w-[35px]"
    >
      <img src={UserIc} height="18px" width="18px" alt="User Icon" />
    </div>
  )
}

export default UserIcon
