/* eslint-disable no-console */
import React, { useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ADMIN_LOGIN, FETCH_ADMIN } from '../../graphql/login.gql'
import ModeChanger from '../../../../components/ModeSwitcher/ModeSwitcher'
import InputField from '../../../../components/InputField2/InputField'
import SignInBtn from '../../../../components/Button/Button'
import {
  CustomizedMailIcon,
  CustomizedLockClosedIcon,
  CustomizedSunIcon,
  CustomizedMoonIcon,
} from '../styles/Login.styles'

import {
  BackgroundForLogin,
  FormContainer,
  H1,
  ToSpan,
  H1SecondVersion,
  Relative,
} from '../../../../styles/globals.styles'

import { appWideActions } from '../../../../store/applicationWide.slice'
import { authActions } from '../../../../store/auth.slice'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [focus, setFocus] = useState('')

  const [adminLogin] = useMutation(ADMIN_LOGIN)

  const onFocus = (e: any) => {
    setFocus(e.target.name)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Email is not valid'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      adminLogin({
        variables: {
          email: values.email,
          password: values.password,
        },
      })
        .then((res) => {
          if (res.data && res.data?.loginAdmin) {
            localStorage.setItem('auth', 'authenticated')
            dispatch(authActions.login())
            dispatch(
              appWideActions.showMessage({
                fromTop: 'mt-16',
                message: 'Success',
                textColor: 'text-smilingSuccess',
                secondaryMessage: 'Tu as logge correctement',
                status: 'good',
              }),
            )
            navigate('/dashboard/landing', { replace: true })
            fetchAdmin()
          }
        })
        .catch((err) => {
          dispatch(
            appWideActions.showMessage({
              fromTop: 'mt-8',
              message: "L'autorisation à échouée",
              textColor: 'text-smilingError',
              secondaryMessage: 'E-mail et mot de passe incorrects',
              status: 'bad',
            }),
          )
        })
    },
  })

  const [fetchAdmin] = useLazyQuery(FETCH_ADMIN)

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
    <BackgroundForLogin role="GeneralBackground">
      <FormContainer>
        <ModeChanger
          themeChanger={themeChanger}
          leftIcon={<CustomizedMoonIcon />}
          rightIcon={<CustomizedSunIcon />}
          leftColor="bg-black"
          rightColor="bg-black"
          distanceFromRight="right-5"
          distanseFromTop="top-5"
        />
        <H1>Welcome</H1>
        <H1SecondVersion>
          <ToSpan>to</ToSpan> Smiling Admin
        </H1SecondVersion>
        <form onSubmit={formik.handleSubmit}>
          <Relative>
            <InputField
              labelText="Email"
              placeholder="Email"
              name="email"
              id="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e)
                setFocus('')
              }}
              error={formik.errors.email}
              touch={formik.touched.email}
              width="w-[250px]"
              height="h-[35px]"
              required={true}
              onFocus={onFocus}
              focusValue={focus}
              icon={<CustomizedMailIcon />}
            />
          </Relative>
          <div className="mt-5">
            <Relative>
              <InputField
                labelText="Password"
                placeholder="Password"
                name="password"
                id="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e)
                  setFocus('')
                }}
                error={formik.errors.password}
                touch={formik.touched.password}
                width="w-[250px]"
                height="h-[35px]"
                required={true}
                onFocus={onFocus}
                focusValue={focus}
                icon={<CustomizedLockClosedIcon />}
              />
            </Relative>
          </div>
          <div className="mt-5">
            <SignInBtn
              btnText="Sign In"
              textColor="text-white"
              type="submit"
              bgColor="bg-smilingRed"
            />
          </div>
        </form>
      </FormContainer>
    </BackgroundForLogin>
  )
}

export default LoginForm
