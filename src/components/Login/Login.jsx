import React from "react";
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Input } from "../common/Preloader/FormsControls/FormsControls";
import { login } from "../../redux/authReducer"
import { connect } from "react-redux";
import { Redirect } from "react-router";
import style from '../common/Preloader/FormsControls/FormsControl.module.css'

const maxLength30 = maxLengthCreator(30)

const LoginForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Login"} component={Input} name={'email'}
          validate={[required, maxLength30]}
        />
      </div>
      <div>
        <Field placeholder={"Password"} component={Input} name={'password'}
          validate={[required, maxLength30]}
        />
      </div>
      {/* <div>
        {props.errorMessage ? props.errorMessage : ''}
      </div> */}
      {props.error ? <div className={style.formSummaryError}>
        {props.error}
      </div> : ''}
      <div>
        <Field type="checkbox" component={Input} name={'rememberMe'}/> remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  // a unique name for the form
  form: 'login'
})(LoginForm)


const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
    props.login(formData.email, formData.password, formData.rememberMe)
  }

  if (props.isAuth) return <Redirect to={"/profile"}/>

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} errorMessage={props.errorMessage}/>
    
  </div>
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    // errorMessage: state.auth.errorMessage
  }
}
export default connect(mapStateToProps, { login })(Login);