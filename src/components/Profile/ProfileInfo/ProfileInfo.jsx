import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.css';
import defaultAvatar from '../../../../src/assets/images/defaultAvatar.png';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHoocks from "./ProfileStatusWithHoocks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }
  return (
  <div>
    <div>
      {/* <img  className={s.profileImg} src={props.profile.photos.large} /> */}
    </div>
    <div className={s.descriptionBlock}>
      <div>
        <img className={s.avatar} src={props.profile.photos.small ? props.profile.photos.small : defaultAvatar}/>
        <ProfileStatusWithHoocks status={props.status} updateStatus={props.updateStatus}/>
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