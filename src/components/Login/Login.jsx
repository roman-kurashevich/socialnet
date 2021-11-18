import React from "react";
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { login } from "../../redux/authReducer"
import { connect } from "react-redux";
import { Redirect } from "react-router";
import style from '../common/FormsControls/FormsControl.module.css'

const maxLength30 = maxLengthCreator(30)

const LoginForm = ({handleSubmit, error}) => {

  return (
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", [required, maxLength30], Input)}
      {createField("Password", "password", [required, maxLength30], Input, {type: "password"})}
      {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
      {error ? <div className={style.formSummaryError}>
        {error}
      </div> : ''}
      <div>
        <button>Login</button>
      </div>
      {/* <div>
        <Field placeholder={"Email"} component={Input} name={'email'}
          validate={[required, maxLength30]}
        />
      </div> */}
      {/* <div>
        <Field placeholder={"Password"} component={Input} name={'password'}
          validate={[required, maxLength30]}
        />
      </div> */}
      {/* <div>
        <Field type="checkbox" component={Input} name={'rememberMe'}/> remember me
      </div> */}
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