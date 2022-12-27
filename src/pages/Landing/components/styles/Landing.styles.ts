import tw from 'twin.macro'
import styled from '@emotion/styled'

import {
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  CogIcon,
  UserCircleIcon,
  BadgeCheckIcon,
  SearchIcon,
  ChevronDownIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import { DarkModeProps } from '../../../../styles/globals.styles'

export const TopMenuWrapper = tw.div`flex justify-end items-center h-14 bg-white w-full fixed z-10 transition-all duration-500 dark:bg-smilingElementBackgroundDarkMode z-50`

export const CostumizedUserCircleIcon = tw(
  UserCircleIcon,
)`w-9 h-9 mr-5 text-gray-400 dark:text-white cursor-pointer`

export const CustomizedHomeIcon = tw(
  HomeIcon,
)`w-6 mt-8 text-gray-400 dark:text-white cursor-pointer ml-[20px] p-0 m-0`
export const CustomizedUsersIcon = tw(
  UsersIcon,
)`w-6 mt-16 text-gray-400 dark:text-white cursor-pointer ml-[20px] p-0 m-0`
export const CustomizedBriefcaseIcon = tw(
  BriefcaseIcon,
)`w-6 mt-16 text-gray-400 dark:text-white cursor-pointer ml-[20px] p-0 m-0`
export const CustomizedCogIcon = tw(
  CogIcon,
)`w-6 mt-16 text-gray-400 dark:text-white cursor-pointer ml-[20px] p-0 m-0`

export const CustomizedChevronDoubleRightIcon = tw(
  ChevronDoubleRightIcon,
)`w-6 text-gray-400 dark:text-white absolute bottom-[110px] cursor-pointer ml-[20px] p-0 m-0`

export const CustomizedChevronDoubleLeftIcon = tw(
  ChevronDoubleLeftIcon,
)`w-6 text-gray-400 dark:text-white absolute bottom-[110px] cursor-pointer ml-[20px] p-0 m-0`

export const CustomizedBadgeCheckIcon = tw(BadgeCheckIcon)`
text-smilingSuccess ml-5 my-7 h-[55px] w-[55px] mt-[14px]
`
export const CustomizedXCircleIcon = tw(XCircleIcon)`
text-smilingError ml-5 my-7 h-[55px] w-[55px] mt-[14px]
`

export const CustomizedSearchIcon = tw(
  SearchIcon,
)`text-gray-400 absolute transition-all duration-500 dark:text-white`

export const CustomizedChevronDownIcon = tw(
  ChevronDownIcon,
)`text-red-400 absolute left-48 transition-all duration-500 dark:text-white`

export const Flex = tw.div`
flex
`

export const LeftSideMenu = tw.div`h-screen bg-white flex flex-col sticky fixed mt-14 dark:bg-smilingElementBackgroundDarkMode transition-colors duration-500 overflow-hidden z-50`

export const Content = tw.div`flex flex-col min-h-screen w-full bg-gray-100 pt-14 transition-all duration-500 dark:bg-smilingBackgroundDarkMode`

export const HeaderSection = tw.div`
h-28 flex justify-between ml-28
`

export const H1 = tw.h1`text-3xl font-normal ml-20 mt-8 transition-all duration-500 dark:text-white`

export const WelcomeContainer = tw.div`flex mt-10 h-20 bg-white text-center m-auto rounded box-border border border-gray-400 transition-all duration-500 dark:bg-smilingElementBackgroundDarkMode dark:border dark:border-black`

export const TuText = tw.p`transition-all duration-500 dark:text-white`

export const ContainerForWelcomInLoginPage = tw.div`
fixed z-10 w-[1520px] ml-[8px]
`

export const WelcomeIndicator = tw.div`
h-full -ml-px w-1.5 bg-smilingSuccess rounded-l-sm
`
export const WarningIndicator = tw.div`
h-full -ml-px w-1.5 bg-smilingError rounded-l-sm
`

export const WelcomeTextContainer = tw.div`
ml-2 flex flex-col items-start justify-center
`

export const HWelcomeText = tw.h1`
text-lg
`

export const FermeContainer = tw.div`
ml-auto text-gray-300 border-l-2 flex flex-col justify-center items-center
`

export const Ferme = tw.h1`
px-4 py-5 cursor-pointer
`

export const SearchButtonContainer = tw.div`
mr-5 mt-8
`

export const FilterContainer = tw.div`
flex mt-20 ml-48
`

export const Input = tw.input`text-center pb-3 appearance-none bg-transparent border-b border-gray-400 w-56 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none dark:text-white dark:placeholder-white`

export const Select = tw.select`appearance-none pb-3 bg-transparent border-b border-gray-400 w-56 text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none transition-all duration-500 dark:border-b dark:border-white dark:text-white`

export const Option = tw.option`text-black`

export const SearchButton = tw.button`ml-20 border font-medium py-1 px-4 rounded hover:border text-white bg-smilingBlack hover:border-smilingBlack hover:bg-white hover:text-smilingBlack transition-all duration-500 dark:border dark:border-smilingRed dark:bg-smilingRed dark:hover:border dark:hover:border-smilingRed`

export const JobContent = tw.div`
flex-1 pt-24 ml-16 px-16 pb-5
`

export const ListHeaderContainer = tw.div`
w-[89%] ml-16 flex justify-between  py-2
`

export const HeaderColumn = tw.div`
flex-1 flex justify-center
`

export const Header = tw.span`font-bold text-smilingBlack transition-all duration-500 dark:text-white`

export const LogoHeaderContainer = tw.div`w-full relative`

export const Logo = tw.span`absolute left-[25px] font-bold text-smilingBlack transition-all duration-500 dark:text-white`

export const DataListContainer = tw.div`
flex flex-col h-[400px] overflow-y-auto
`

export const DataRowContainer = tw.div`w-[90%] h-12 min-h-[40px] ml-20 mt-5 bg-white shadow-[0px 0px 0px 1px rgba(0, 0, 0, 0.25)] rounded-md flex justify-between items-center transition-all duration-500 dark:bg-smilingElementBackgroundDarkMode`

export const SpanData = tw.span`dark:text-white`

export const DataColumnContainer = tw.div`
flex justify-center flex-1 mr-6
`

export const DataColumnContainerForImage = tw.div`
flex justify-start ml-[5px] flex-1
`

export const DataActionColumnContainer = tw.div`
flex justify-around flex-1 pr-4
`

export const ListItemIndicator = tw.div`
h-full w-1 bg-purple-200 -ml-px border-l border-gray-400 rounded-bl-md rounded-tl-md box-content mt-px
`

export const LoadingContainer = tw.div`
flex flex-col items-center mt-28 ml-16
`
export const LoadingItem = tw.div`h-12 mt-7 w-[80%] bg-white rounded-sm transition-all duration-500 dark:bg-smilingElementBackgroundDarkMode`

export const LogoutButton = tw.button`
w-[90px] h-[35px] mr-[20px] bg-smilingGray text-smilingWhite rounded-[5px] text-[16px]
`

export const RightMenuItemContainer = tw.div`
flex flex-row items-center font-normal text-[18px] text-smilingGray space-x-3 mt-[50px] ml-4 relative
`

export const RightMenuItemName = tw.span`
  mt-[-5px] transition-all duration-500 dark:text-white
`
