import React from "react";
import {createField, Textarea, Input} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {reduxForm } from "redux-form";
import s from './ProfileInfo.module.css';
import style from '../../common/FormsControls/FormsControl.module.css'
//placeholder, name, validators, component, props = {}, text = ""
const ProfileDataForm = ({isOwner, handleSubmit, profile, error}) => {
  const maxLength30 = maxLengthCreator(30);

  return (
    <form onSubmit={handleSubmit}>
      
        <div>
          <b>Full name:</b> {createField('fullname', 'fullName', [], Input)}
        </div>
        <div>
          <b>Looking for a job:</b> {createField('', 'lookingForAJob', [], Input, {type: "checkbox"} )}
        </div>
        <div>
          <b>My pprofessionals skills:</b> {createField('my professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
        
        <div>
          <b>About me:</b> {createField('about me', 'aboutMe', [], Textarea)}
        </div>
        <div>
          <b>Contacts:</b>
          { Object.entries(profile.contacts).map(contact => <div className={s.contactItem} key={contact[0]}>
                                                                <b>{contact[0]}</b>
                                                                {createField(contact[0], `contacts.${contact[0]}`, [], Input)}
                                                            </div>)}
        </div>
        {isOwner && 
        <button>Save changes</button>
        }
        {error ? <div className={style.formSummaryError}>
        {error}
      </div> : ''}
    </form>
  )
}

const ProfileDataFormReduxForm = reduxForm({
  form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm;