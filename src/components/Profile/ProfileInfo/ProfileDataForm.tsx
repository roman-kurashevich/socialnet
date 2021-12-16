import React from "react";
import {
  createField,
  Textarea,
  Input,
  GetStringKeys,
} from "../../common/FormsControls/FormsControls";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { InjectedFormProps, reduxForm } from "redux-form";
import s from "./ProfileInfo.module.css";
import style from "../../common/FormsControls/FormsControl.module.css";
import { ContactsType, ProfileType } from "../../../types/types";

type PropsType = {
  isOwner: boolean
  profile: ProfileType
  // handleSubmit: any 
  // error: any
};

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ isOwner, handleSubmit, profile, error }) => {
  const maxLength30 = maxLengthCreator(30);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <b>Full name:</b> {createField<ProfileTypeKeys>("fullname", "fullName", [], Input)}
      </div>
      <div>
        <b>Looking for a job:</b>{" "}
        {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>
      <div>
        <b>My pprofessionals skills:</b>{" "}
        {createField<ProfileTypeKeys>(
          "my professional skills",
          "lookingForAJobDescription",
          [],
          Textarea
        )}
      </div>

      <div>
        <b>About me:</b> {createField("about me", "aboutMe", [], Textarea)}
      </div>
      <div>
        <b>Contacts:</b>
        {Object.entries(profile.contacts).map((contact) => (
          <div className={s.contactItem} key={contact[0]}>
            <b>{contact[0]}</b>
            {createField(contact[0], `contacts.${contact[0]}`, [], Input)}
            {/* todo: fix createField */}
          </div>
        ))}
      </div>
      {isOwner && <button>Save changes</button>}
      {error ? <div className={style.formSummaryError}>{error}</div> : ""}
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
