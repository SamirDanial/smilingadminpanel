import { IInitalStateApplicationWide } from '../../interfaces/applicationWide.slice.interface'
import { useDispatch, useSelector } from 'react-redux'
import { appWideActions } from '../../store/applicationWide.slice'
import {
  ContainerForWelcomInLoginPage,
  Ferme,
  FermeContainer,
  HWelcomeText,
  TuText,
  WelcomeContainer,
  WelcomeTextContainer,
} from '../../pages/Landing/components/styles/Landing.styles'

import {
  CustomizedBadgeCheckIcon,
  CustomizedXCircleIcon,
  WarningIndicator,
  WelcomeIndicator,
} from '../../pages/Landing/components/styles/Landing.styles'

const ApplicationWideMessage = (props: IInitalStateApplicationWide) => {
  const dispatch = useDispatch()

  return (
    <ContainerForWelcomInLoginPage
      className={props.fromTop}
      role="applicationNotification"
    >
      <WelcomeContainer style={{ width: '35%' }}>
        {props.status === 'good' ? <WelcomeIndicator /> : <WarningIndicator />}
        {props.status === 'good' ? (
          <CustomizedBadgeCheckIcon />
        ) : (
          <CustomizedXCircleIcon />
        )}
        <WelcomeTextContainer>
          <HWelcomeText className={props.textColor}>
            {props.message}
          </HWelcomeText>
          <TuText>{props.secondaryMessage}</TuText>
        </WelcomeTextContainer>
        <FermeContainer onClick={() => dispatch(appWideActions.hideMessage())}>
          <Ferme>FERME</Ferme>
        </FermeContainer>
      </WelcomeContainer>
    </ContainerForWelcomInLoginPage>
  )
}

export default ApplicationWideMessage
