import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.css';
import defaultAvatar from '../../../../src/assets/images/defaultAvatar.png';
import ProfileStatusWithHoocks from "./ProfileStatusWithHoocks";
import ProfileDataFormReduxForm from "./ProfileDataForm";
import { ProfileType } from "../../../types/types";

type PropsType = {
  isOwner: boolean
  profile: ProfileType | null
  // handleSubmit: any 
  // error: any
  status: string
  updateStatus: (newStatus: string) => void
  savePhoto: (file: File) => void
  saveProfile: (data: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {

  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0]);
    }
  }

  const goToEditMode = () => {
    setEditMode(true);
  }

  const onSubmit = (formData: ProfileType): void => {
    //todo: remove then
    props.saveProfile(formData)
    .then(() => {
      setEditMode(false)
    })
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <div>
          <img className={s.avatar} src={props.profile.photos.large ? props.profile.photos.large : defaultAvatar}/>
          {props.isOwner && <div>
                              <input type="file" onChange={onMainPhotoSelected}/>
                            </div>}
          <ProfileStatusWithHoocks isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
        </div>
        {editMode 
          ? <ProfileDataFormReduxForm isOwner={props.isOwner}
                                      profile={props.profile}
                                      onSubmit={onSubmit}
                                    /> 
          : <ProfileData  profile={props.profile} 
                          isOwner={props.isOwner} 
                          goToEditMode={goToEditMode}
                        />}
        
      </div>
    </div>
  )
}


type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
  return (
    <div className={s.profileDataContainer}>
          {isOwner && 
        <button onClick={goToEditMode}>Edit profile information</button>
        }

        <div>
          <b>Full name:</b> {profile.fullName}
        </div>
        <div>
          <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
          <b>My pprofessionals skills:</b> {profile.lookingForAJobDescription}
        </div>
        }
        <div>
          <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
          <b>Contacts:</b>
          { Object.entries(profile.contacts).map(contact => <Contact 
                                                                    contactTitle={contact[0]} 
                                                                    contactValue={contact[1]}
                                                                    key={contact[0]}
                                                                  />)}
        </div>
      </div>
  )
}

type ContactType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
  return (
    <div className={s.contactItem}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  )
}

export default ProfileInfo;