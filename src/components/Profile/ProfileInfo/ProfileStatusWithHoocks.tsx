import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
isOwner: boolean
status: string
updateStatus: (newStatus: string) => void
}

const ProfileStatusWithHoocks: React.FC<PropsType> = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect( (): void => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = (): void => {
    if (props.isOwner) {
      setEditMode(true);
    }
  }
  const deactivateEditMode = (): void => {
    setEditMode(false);
    props.updateStatus(status);
  }
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode &&
        <div>
          <b>Status: </b><span onDoubleClick={activateEditMode}>{props.status || '--------'}</span>
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