import React from "react";
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {login, getCaptchaUrl} from "../../redux/authReducer"
import {connect} from "react-redux";
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


type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}
type MapDispatchPropsType = {
  login: ( 
    email: string,
    password: string,
    rememberMe: boolean,
    captchaUrl: string | null) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

export type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captchaUrl: string | null
}

export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

const Login: React.FC<PropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    console.log(formData);
    props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl)
  }

  if (props.isAuth) return <Redirect to={"/profile"}/>

  return <div>
    <h1>Login</h1>
    <LoginReduxForm 
      captchaUrl={props.captchaUrl} 
      onSubmit={onSubmit} 
    />
    
  </div>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
  }
}

export default connect(mapStateToProps, { login })(Login);