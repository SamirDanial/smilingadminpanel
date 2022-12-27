import tw from 'twin.macro'
import styled from '@emotion/styled'
import {
  MailIcon,
  LockClosedIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/outline'

export const TopLeftPurpleDiv = styled.div`
  position: absolute;
  top: -13%;
  left: -10%;
`

export const UpperLeftPurpleDiv = styled.div`
  position: absolute;
  top: 33%;
  left: 20%;
`

export const LeftPinkDiv = styled.div`
  position: absolute;
  top: 53%;
  left: 25%;
`

export const LeftBottomPinkDiv = styled.div`
  position: absolute;
  top: 78%;
  left: 20%;
`

export const MiddleHalfTopRightPinkDiv = styled.div`
  position: absolute;
  top: 14%;
  right: 29.3%;
`

export const MiddleRightPurpleDiv = styled.div`
  position: absolute;
  top: 53%;
  right: 26%;
`

export const BottomRightPurpleDiv = styled.div`
  position: absolute;
  bottom: -8%;
  right: -5%;
`

export const FormAndBlobsWrapper = tw.div`
bg-smilingWhite relative w-full h-full overflow-hidden
`

export const CustomizedMailIcon = tw(MailIcon)`
w-5 h-5 absolute right-3 bottom-2 text-gray-300
`

export const CustomizedLockClosedIcon = tw(LockClosedIcon)`
w-5 h-5 absolute right-3 bottom-2 text-gray-300
`

export const CustomizedSunIcon = tw(SunIcon)`
h-5 w-5 text-white absolute left-8 top-1
`
export const CustomizedMoonIcon = tw(MoonIcon)`
h-5 w-5 text-yellow-400 absolute left-1 top-1
`
