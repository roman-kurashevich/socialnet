import React, { useEffect, useState } from "react";

const ProfileStatusWithHoocks = (props) => {

  // let stateWithSetState =  useState(false);
  // let editMode = stateWithSetState[0];
  // let setEditMode = stateWithSetState[1];

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect( () => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    if (props.isOwner) {
      setEditMode(true);
    }
  }
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode &&
        <div>
          <span onDoubleClick={activateEditMode}>{props.status || '--------'}</span>
        </div>
      }
      {editMode && 
        <div>
          <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
        </div>
      }
    </div>
  )
  
} 

export default ProfileStatusWithHoocks;