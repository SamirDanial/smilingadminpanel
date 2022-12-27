import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'
import UserIcon from '../../../../components/UserIcon/UserIcon'

import { ADMIN_LOGOUT } from './graphql/logout.gql'
import { appWideActions } from '../../../../store/applicationWide.slice'

import { Landing, CreateJob } from '../../../index'
import ModeChanger from '../../../../components/ModeSwitcher/ModeSwitcher'

import {
  TopMenuWrapper,
  Flex,
  LeftSideMenu,
  CustomizedHomeIcon,
  CustomizedUsersIcon,
  CustomizedBriefcaseIcon,
  CustomizedCogIcon,
  CustomizedChevronDoubleRightIcon,
  CustomizedChevronDoubleLeftIcon,
  LogoutButton,
  RightMenuItemContainer,
  RightMenuItemName,
} from '../styles/Landing.styles'

import { BoxShadow } from '../../../../styles/globals.styles'

import {
  CustomizedSunIcon,
  CustomizedMoonIcon,
} from '../../../Login/components/styles/Login.styles'

const Template = () => {
  const dispatch = useDispatch()
  const [expand, setExpand] = useState(false)

  const [adminLogout] = useMutation(ADMIN_LOGOUT, {})
  const navigate = useNavigate()

  const logOut = () => {
    dispatch(
      appWideActions.showMessage({
        fromTop: 'mt-5',
        message: 'Success',
        textColor: 'text-smilingSuccess',
        secondaryMessage: 'Déconnecté avec succès',
        status: 'good',
      }),
    )
    localStorage.setItem('auth', '')
    adminLogout()
    navigate('/', { replace: true })
  }

  const themeChanger = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <>
      <div role="template">
        <TopMenuWrapper style={{ boxShadow: BoxShadow }}>
          <UserIcon />
          <LogoutButton onClick={logOut}>Log out</LogoutButton>
        </TopMenuWrapper>
        <Flex>
          <LeftSideMenu
            style={{ boxShadow: BoxShadow }}
            className={` ${expand ? 'w-60' : 'w-20'} `}
          >
            <RightMenuItemContainer
              onClick={() => navigate('/dashboard/landing', { replace: true })}
            >
              <CustomizedHomeIcon />
              {expand && <RightMenuItemName>Home</RightMenuItemName>}
            </RightMenuItemContainer>

            <RightMenuItemContainer>
              <CustomizedUsersIcon />
              {expand && <RightMenuItemName>Models</RightMenuItemName>}
            </RightMenuItemContainer>

            <RightMenuItemContainer>
              <CustomizedBriefcaseIcon />
              {expand && <RightMenuItemName>Jobs</RightMenuItemName>}
            </RightMenuItemContainer>

            <RightMenuItemContainer>
              <CustomizedCogIcon />
              {expand && <RightMenuItemName>Parameters</RightMenuItemName>}
            </RightMenuItemContainer>

            <RightMenuItemContainer className="flex-grow">
              {expand ? (
                <React.Fragment>
                  <CustomizedChevronDoubleLeftIcon
                    onClick={() => setExpand((preValue) => !preValue)}
                  />
                  <ModeChanger
                    themeChanger={themeChanger}
                    leftIcon={<CustomizedMoonIcon />}
                    rightIcon={<CustomizedSunIcon />}
                    leftColor="bg-black"
                    rightColor="bg-black"
                    distanseFromBottom=" bottom-[105px]"
                    distanseFromLeft="left-[100px]"
                  />
                </React.Fragment>
              ) : (
                <CustomizedChevronDoubleRightIcon
                  onClick={() => setExpand((preValue) => !preValue)}
                />
              )}
            </RightMenuItemContainer>
          </LeftSideMenu>
        </Flex>
      </div>
      <Routes>
        <Route path="landing" element={<Landing />} />
        <Route path="createjob" element={<CreateJob />} />
      </Routes>
    </>
  )
}

export default Template
