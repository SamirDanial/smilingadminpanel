import tw from 'twin.macro'

export const colors = {
  global: {
    primary: '#f43a7d',
    primaryLight: 'rgba(244, 58, 125, 0.7)',
    secondary: '',
    white: '#fff',
    black: '#222C3C',
    whiteAlt: '#FAFBFC',
    gradient: 'linear-gradient(90deg,#f43a7d 0,#f5795c)',
    grayLight: '#CFD8DC',
    grayExtraLight: '#f6f6f6',
    palette2022: {
      inputHover: {
        mauve: '#EBD7F8',
      },
    },
    pinkLight: '#f6ddea',
    purpleLight: '#ebd7f8',
  },
  text: {
    primary: '#222C3C',
    secondary: '#516173',
    disable: '#C2CAD4',
  },
  label: {
    primary: '#7F8FA4',
  },
  link: {
    primary: '#F43A7D',
  },
  input: {
    error: '#e53935',
    border: '#C2CAD4',
  },
  status: {
    success: '#45B854',
    successAlt: '#21b587',
  },
  border: {
    gray: '#d9d9d9',
  },
  badge: {
    greenLight: '#9aedd3',
    green: '#47ddaf',
    bluePurple: '#6262ff',
    blue: '#0000d8',
    blueDark: '#000076',
    blueExtraLight: '#ececff',
    gradient:
      'linear-gradient(to right top, #0000d8, #2925e2, #3f3bec, #514ff6, #6262ff)',
    facebookBlue: '#1b74e4',
  },
  external: {
    facebook: '#1778F2',
  },
}
export type DarkModeProps = {
  darkMode?: boolean
}

export const Input = tw.input`w-full p-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 text-xs`

export const ButtonBlock = tw.button`border h-9 w-full mt-3 rounded hover:border hover:border-smilingRed hover:bg-white hover:text-smilingRed transition-all duration-500 dark:border dark:border-smilingRed`

export const ButtonBlockSmall = tw.button`border h-9 rounded -mt-3 transition-all duration-500`

export const ButtonBlockWithoutHover = tw.button`border h-9 w-full h-auto rounded dark:border-none`

export const ButtonWrapper = tw.div`flex justify-center items-center`

export const Label = tw.label`text-smilingGray text-xs transition-all duration-500 dark:text-white`

export const Span = tw.span`w-5 h-5 bg-white absolute rounded-full left-1 top-1 transition-all duration-500 dark:bg-smilingRed dark:left-8`

export const BackgroundForLogin = tw.div`h-screen flex transition-all duration-500 dark:bg-smilingBackgroundDarkMode`

export const DivForDialog = tw.div`absolute left-1/2 top-3 w-96 text-center border-t border-b px-4 py-3 z-10`

export const FormContainer = tw.div`flex-col justify-center relative items-center px-36 py-14 m-auto bg-white rounded-lg border border-gray-300 z-10 transition-all duration-500 dark:border dark:border-smilingElementBackgroundDarkMode dark:bg-smilingElementBackgroundDarkMode`

export const H1 = tw.h1`text-[36px] text-smilingBackgroundDarkMode mt-4 transition-all duration-500 dark:text-white`

export const H1SemiBold = tw.h1`font-normal text-smilingBackgroundDarkMode text-[24px] transition-all duration-500 dark:text-white`

export const H2 = tw.h1`font-medium text-[24px] text-smilingBackgroundDarkMode transition-all duration-500 dark:text-white`

export const ToSpan = tw.span` transition-all duration-500 dark:text-white`

export const H1SecondVersion = tw.h1`mb-5 font-medium text-smilingRed text-3xl`

export const Relative = tw.div`relative`

export const ButtonsContainerHorizotally = tw.div`flex space-x-2 mr-20`

export const MT10 = tw.div`mt-10`

export const RequiredIndicator = tw.p`font-normal text-[14px] text-smilingGray transition-all duration-500 dark:text-white`

export const RadioBtn = tw.input`w-4 h-4`

export const RadioLabel = tw.label`ml-2 text-sm text-gray-900 dark:text-gray-300 font-normal`

export const TextBoxLabel = tw.p`font-medium text-[14px] text-smilingGray leading-[1.2] transition-all duration-500 dark:text-white`

export const TextBoxLabel2 = tw.p`font-medium text-[14px] text-smilingGroupButtonColor leading-[1.2]`

export const InputText = tw.input`bg-smilingElementContrastDarkMode overflow-visible rounded-[5px] pl-3 mt-[6px]`

export const InputTextError = tw.p`text-smilingError text-[14px]`

export const TextArea = tw.textarea`bg-smilingElementContrastDarkMode pl-[6px] pt-[6px] overflow-visible rounded-[5px] pl-3 mt-[6px]`

export const CollapsableFormContainer = tw.div`flex overflow-hidden transition-all duration-500`

export const JustifyBetweenFlex = tw.div`flex justify-between`

export const JustifyBetweenFlexTopDistance = tw.div`flex justify-between mt-20`

export const HorizontalDividerWrapper = tw.div`ml-5`

export const HorizontalDivider = tw.div`w-[2px] bg-gray-300`

export const BoxShadow = '0 0 0 1px rgba(0, 0, 0, 0.25)'

export const BoxShadowForUserIcon = '0px 1px 3px 0px rgba(0, 0, 0, 0.25)'

export const FocusShadow = '0 0 0 1px rgba(235, 215, 248, 1)'

export const GroupButtonContainer = tw.div`inline-flex rounded-md shadow-sm mt-3 w-[240px] h-[35px]`

export const GroupButtonMember = tw.button`text-sm font-medium text-smilingGroupButtonColor border border-smilingTextboxShadow w-[80px]`
