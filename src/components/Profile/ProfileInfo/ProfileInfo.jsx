import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.css';
import defaultAvatar from '../../../../src/assets/images/defaultAvatar.png';
import ProfileStatusWithHoocks from "./ProfileStatusWithHoocks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  }

  return (
  <div>
    <div>
      {/* <img  className={s.profileImg} src={props.profile.photos.large} /> */}
    </div>
    <div className={s.descriptionBlock}>
      <div>
        <img className={s.avatar} src={props.profile.photos.large ? props.profile.photos.large : defaultAvatar}/>
        {props.isOwner && <div>
                            <input type="file" onChange={onMainPhotoSelected}/>
                          </div>}
        <ProfileStatusWithHoocks isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
      </div>
      <div>
        {props.profile.fullName}
      </div>
      <div>
        <span>Contacts</span>
        { Object.entries(props.profile.contacts).map(contact => <div>
          <span>{contact[0] + ':'}</span>
          <span>{contact[1]}</span>
        </div> 
        )
        }
      </div>
    </div>
  </div>
)
}

export default ProfileInfo;