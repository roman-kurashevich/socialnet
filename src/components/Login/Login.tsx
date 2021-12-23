import React from "react";
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {login, getCaptchaUrl} from "../../redux/authReducer"
import {connect, useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import style from '../common/FormsControls/FormsControl.module.css'
import { AppStateType } from "../../redux/reduxStore";

const maxLength30 = maxLengthCreator(30)

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {

  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>("Email", "email", [required, maxLength30], Input)}
      {createField<LoginFormValuesTypeKeys>("Password", "password", [required, maxLength30], Input, {type: "password"})}
      {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

      {error && <div className={style.formSummaryError}>{error}</div>}

      {captchaUrl && <div><img src={captchaUrl}/></div>}
      {captchaUrl && createField<LoginFormValuesTypeKeys>("enter letters", "captchaUrl", [required], Input, {})}

      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  // a unique name for the form
  form: 'login'
})(LoginForm)

export type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captchaUrl: string | null

}

export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

export const LoginPage: React.FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  const dispatch = useDispatch()

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl))
  }

  if (isAuth) return <Redirect to={"/profile"}/>

  return <div>
    <h1>Login</h1>
    <LoginReduxForm 
      captchaUrl={captchaUrl} 
      onSubmit={onSubmit} 
    />
    
  </div>
}